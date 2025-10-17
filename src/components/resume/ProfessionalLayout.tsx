import { Mail, Phone, MapPin } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ProfessionalLayoutProps {
  data: ResumeData;
}

export const ProfessionalLayout = ({ data }: ProfessionalLayoutProps) => {
  const { personalInfo, education, skills, experience, projects, certifications } = data;

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white text-gray-900 p-12 resume-container" style={{ 
      width: '210mm', 
      minHeight: '297mm', 
      fontFamily: 'Georgia, "Times New Roman", serif', 
      backgroundColor: '#ffffff',
      lineHeight: '1.6'
    }}>
      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-8 mb-10 relative">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gray-400 via-gray-800 to-gray-400"></div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800 tracking-wide" style={{ 
          fontFamily: 'Georgia, serif',
          letterSpacing: '1px'
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-6 text-base text-gray-600 font-medium">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.location}</span>
            </span>
          )}
        </div>
      </div>

      <div className="space-y-10">
        {/* Summary */}
        {personalInfo.summary && (
          <div className="relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-gray-800 pb-2 inline-block uppercase tracking-wider">
              Professional Summary
            </h2>
            <div className="mt-6 pl-6 border-l-4 border-gray-300 bg-gray-50 p-6 rounded-r-lg">
              <p className="text-gray-700 leading-relaxed text-base font-medium" style={{ 
                wordWrap: 'break-word', 
                hyphens: 'auto',
                lineHeight: '1.7',
                fontStyle: 'italic'
              }}>
                "{personalInfo.summary}"
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div className="relative">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gray-800 pb-2 inline-block uppercase tracking-wider">
              Professional Experience
            </h2>
            <div className="space-y-8 mt-6">
              {experience.map(exp => exp.company && (
                <div key={exp.id} className="relative">
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{exp.position}</h3>
                        <p className="text-base italic text-gray-600 font-medium">{exp.company}, {exp.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    {exp.description && (
                      <div className="pl-4 border-l-2 border-gray-200">
                        <p className="text-gray-700 leading-relaxed text-base" style={{ 
                          wordWrap: 'break-word', 
                          hyphens: 'auto',
                          lineHeight: '1.6'
                        }}>
                          {exp.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-3">
              {education.map(edu => edu.institution && (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-bold text-sm">{edu.degree}, {edu.field}</h3>
                      <p className="text-sm text-gray-700">{edu.institution}</p>
                    </div>
                    <span className="text-xs text-gray-600">{formatDate(edu.endDate)}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="relative">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-gray-800 pb-2 inline-block uppercase tracking-wider">
              Core Competencies
            </h2>
            <div className="mt-6 bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
              <div className="text-base text-gray-700 leading-relaxed font-medium">
                {skills.map((skill, index) => (
                  <span key={skill.id} className="inline-block">
                    <span className="font-semibold">{skill.name}</span>
                    {index < skills.length - 1 && <span className="text-gray-500 mx-2">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-bold text-sm">{proj.name}</h3>
                  <p className="text-sm text-gray-700 text-justify" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      Technologies: {proj.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              CERTIFICATIONS
            </h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-bold text-sm">{cert.name}</h3>
                    <p className="text-sm text-gray-700">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-gray-600">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
