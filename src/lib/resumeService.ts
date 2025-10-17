import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface ResumeData {
  id?: string;
  title: string;
  template_layout: string;
  personal_info: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary?: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    location?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate?: string;
    endDate?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
  }>;
}

export class ResumeService {
  // Create a new resume
  static async createResume(resumeData: any): Promise<{ data: any; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        title: resumeData.title || 'Untitled Resume',
        template_layout: resumeData.templateLayout,
        resume_data: resumeData,
        status: 'draft'
      })
      .select()
      .single();

    return { data, error };
  }

  // Update an existing resume
  static async updateResume(resumeId: string, resumeData: any): Promise<{ data: any; error: any }> {
    const updatePayload: any = {};
    
    if (resumeData.title) updatePayload.title = resumeData.title;
    if (resumeData.templateLayout) updatePayload.template_layout = resumeData.templateLayout;
    if (resumeData.status) updatePayload.status = resumeData.status;
    
    // Always update the full resume_data
    updatePayload.resume_data = resumeData;
    
    const { data, error } = await supabase
      .from('resumes')
      .update(updatePayload)
      .eq('id', resumeId)
      .select()
      .single();

    return { data, error };
  }

  // Get all resumes for current user
  static async getUserResumes(): Promise<{ data: any[]; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: [], error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    return { data: data || [], error };
  }

  // Get a specific resume
  static async getResume(resumeId: string): Promise<{ data: any; error: any }> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', resumeId)
      .single();

    return { data, error };
  }

  // Delete a resume
  static async deleteResume(resumeId: string): Promise<{ error: any }> {
    // First delete PDF file if it exists
    const { data: resume } = await this.getResume(resumeId);
    if (resume?.pdf_file_name) {
      await this.deletePDF(resume.pdf_file_name);
    }

    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId);

    return { error };
  }

  // Generate PDF from HTML element
  static async generatePDF(elementId: string, fileName: string): Promise<Blob> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    console.log('Element found:', element);
    console.log('Element content:', element.innerHTML.substring(0, 200));
    console.log('Element dimensions:', element.offsetWidth, 'x', element.offsetHeight);
    
    // Store original styles to restore later
    const originalStyles = {
      transform: element.style.transform,
      transformOrigin: element.style.transformOrigin,
      width: element.style.width,
      overflow: element.style.overflow,
      maxWidth: element.style.maxWidth,
      position: element.style.position,
      zIndex: element.style.zIndex
    };
    
    // Prepare element for capture - make it visible and properly sized
    element.style.transform = 'scale(1)';
    element.style.transformOrigin = 'top left';
    element.style.width = 'auto';
    element.style.maxWidth = 'none';
    element.style.overflow = 'visible';
    element.style.position = 'relative';
    element.style.zIndex = '9999';
    
    // Wait longer for the DOM to update and styles to apply
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Element after style changes:', element.offsetWidth, 'x', element.offsetHeight);
    
    // Use better html2canvas options for high-quality PDF
    const canvas = await html2canvas(element, {
      scale: 3, // Higher scale for crisp PDF output
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      removeContainer: true,
      logging: false, // Disable logging for production
      onclone: function(clonedDoc) {
        console.log('Cloned document created');
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          console.log('Cloned element found');
          // Ensure the cloned element is visible
          clonedElement.style.transform = 'none';
          clonedElement.style.opacity = '1';
          clonedElement.style.visibility = 'visible';
          
          // Fix icon alignment in the cloned document
          const iconContainers = clonedElement.querySelectorAll('span[style*="alignItems"]');
          iconContainers.forEach((container: any) => {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '6px';
            
            // Fix individual icons
            const icon = container.querySelector('svg');
            if (icon) {
              icon.style.verticalAlign = 'middle';
              icon.style.flexShrink = '0';
              icon.style.marginTop = '0';
              icon.style.marginBottom = '0';
            }
            
            // Fix text spans
            const textSpan = container.querySelector('span');
            if (textSpan) {
              textSpan.style.lineHeight = '1';
              textSpan.style.display = 'inline-block';
            }
          });
        }
      }
    });
    
    // Restore original styles
    Object.assign(element.style, originalStyles);
    
    console.log('Canvas created with dimensions:', canvas.width, 'x', canvas.height);
    
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas has zero dimensions - element may be hidden or empty');
    }
    
    // Create high-quality PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.98); // Use JPEG with high quality
    console.log('Image data length:', imgData.length);
    
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: false // Disable compression for better quality
    });
    
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate scaling to fit A4 page
    const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
    const scaledWidth = (imgWidth * 0.264583) * ratio;
    const scaledHeight = (imgHeight * 0.264583) * ratio;
    
    console.log('PDF dimensions:', scaledWidth, 'x', scaledHeight);
    
    // Add image to PDF centered
    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = Math.max(0, (pdfHeight - scaledHeight) / 2);
    
    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, scaledWidth, scaledHeight, undefined, 'FAST');
    
    console.log('PDF generated successfully');
    return pdf.output('blob');
  }

  // Upload PDF to Supabase Storage
  static async uploadPDF(resumeId: string, pdfBlob: Blob, fileName: string): Promise<{ data: any; error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const filePath = `${user.id}/${resumeId}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('resume-pdfs')
      .upload(filePath, pdfBlob, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) {
      return { data: null, error };
    }

    // Update resume record with PDF info (store file path instead of public URL)
    await supabase
      .from('resumes')
      .update({
        pdf_url: filePath, // Store the file path instead of public URL
        pdf_file_name: fileName,
        pdf_file_size: pdfBlob.size,
        status: 'completed'
      })
      .eq('id', resumeId);

    return { 
      data: { 
        path: filePath,
        pdf_file_name: fileName,
        file_size: pdfBlob.size,
        upload_result: data
      }, 
      error: null 
    };
  }

  // Download PDF using signed URL (more secure)
  static async downloadPDF(resumeId: string, fileName: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const filePath = `${user.id}/${resumeId}/${fileName}`;
    
    console.log('Attempting to download PDF from path:', filePath);
    
    try {
      // First try to get a signed URL for download
      const { data: signedData, error: signedError } = await supabase.storage
        .from('resume-pdfs')
        .createSignedUrl(filePath, 60); // 60 seconds expiry
      
      if (!signedError && signedData?.signedUrl) {
        console.log('Using signed URL for download');
        
        // Create download link using signed URL
        const a = document.createElement('a');
        a.href = signedData.signedUrl;
        a.download = fileName;
        a.target = '_blank';
        a.style.display = 'none';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
    } catch (signedError) {
      console.log('Signed URL failed, trying direct download:', signedError);
    }
    
    // Fallback: direct blob download
    const { data, error } = await supabase.storage
      .from('resume-pdfs')
      .download(filePath);

    if (error) {
      console.error('Storage download error:', error);
      throw new Error('Failed to download PDF: ' + error.message);
    }

    if (!data) {
      throw new Error('No data received from storage');
    }

    console.log('PDF data received, size:', data.size);

    // Create download link with better browser compatibility
    const url = URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // Delete PDF from storage
  static async deletePDF(fileName: string): Promise<{ error: any }> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: { message: 'User not authenticated' } };
    }

    const { error } = await supabase.storage
      .from('resume-pdfs')
      .remove([fileName]);

    return { error };
  }

  // Generate and save PDF for a resume
  static async generateAndSavePDF(resumeId: string, elementId: string, title: string): Promise<{ data: any; error: any }> {
    try {
      console.log('Starting PDF generation for:', { resumeId, elementId, title });
      
      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.pdf`;
      console.log('Generated filename:', fileName);
      
      const pdfBlob = await this.generatePDF(elementId, fileName);
      console.log('PDF blob generated, size:', pdfBlob.size);
      
      const result = await this.uploadPDF(resumeId, pdfBlob, fileName);
      console.log('Upload result:', result);
      
      if (result.error) {
        throw new Error(result.error.message || 'Upload failed');
      }
      
      if (!result.data?.pdf_file_name) {
        console.error('Upload succeeded but no pdf_file_name in result:', result);
        throw new Error('Upload succeeded but no file name returned');
      }
      
      return result;
    } catch (error) {
      console.error('PDF generation error:', error);
      return { data: null, error: { message: (error as Error).message } };
    }
  }
}