import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface MinimalLayoutProps {
  data: ResumeData;
}

export const MinimalLayout = ({ data }: MinimalLayoutProps) => {
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
    <div className="bg-white text-gray-900 p-12 resume-container" style={{ width: '210mm', minHeight: '297mm', backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-900 pb-6 mb-8">
        <h1 className="text-4xl font-bold mb-4">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
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

      <div className="space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-lg font-bold mb-3 uppercase tracking-wider">Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify text-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Experience</h2>
            <div className="space-y-5">
              {experience.map(exp => exp.company && (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-base">{exp.position}</h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{exp.company}, {exp.location}</p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-justify text-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Education</h2>
            <div className="space-y-3">
              {education.map(edu => edu.institution && (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.institution}</p>
                    </div>
                    <span className="text-sm text-gray-600">{formatDate(edu.endDate)}</span>
                  </div>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Skills</h2>
            <p className="text-gray-700">{skills.map(s => s.name).join(' • ')}</p>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-bold">{proj.name}</h3>
                  <p className="text-gray-700 mb-1 text-justify text-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {proj.technologies.join(', ')}
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
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider">Certifications</h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-gray-700 text-sm">{cert.issuer}</p>
                  </div>
                  <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
