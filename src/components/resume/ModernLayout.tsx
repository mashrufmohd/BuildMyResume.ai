import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ModernLayoutProps {
  data: ResumeData;
}

export const ModernLayout = ({ data }: ModernLayoutProps) => {
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
    <div className="bg-white text-gray-900 resume-container" style={{ 
      width: '210mm', 
      minHeight: '297mm', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#ffffff',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-3 break-words tracking-tight" style={{ fontWeight: '700' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm opacity-95">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Mail className="w-3 h-3 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span className="break-all" style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.email}</span>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Phone className="w-3 h-3 flex-shrink-0" style={{ 
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
              <MapPin className="w-3 h-3 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Linkedin className="w-3 h-3 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span className="break-all" style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.linkedin}</span>
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              lineHeight: '1'
            }}>
              <Globe className="w-3 h-3 flex-shrink-0" style={{ 
                verticalAlign: 'middle',
                flexShrink: 0,
                marginTop: 0,
                marginBottom: 0
              }} />
              <span className="break-all" style={{ lineHeight: '1', display: 'inline-block' }}>{personalInfo.website}</span>
            </span>
          )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8 bg-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div className="relative">
            <div className="flex items-center mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Summary</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600">
              <p className="text-gray-700 leading-relaxed text-base" style={{ 
                wordWrap: 'break-word', 
                hyphens: 'auto',
                lineHeight: '1.6'
              }}>
                {personalInfo.summary}
              </p>
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map(exp => exp.company && (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200 hover:border-blue-300 transition-colors duration-300">
                  <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1"></div>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{exp.position}</h3>
                      <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium text-base mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {exp.company} • {exp.location}
                    </p>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed text-base" style={{ 
                        wordWrap: 'break-word', 
                        hyphens: 'auto',
                        lineHeight: '1.6'
                      }}>
                        {exp.description}
                      </p>
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
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {education.map(edu => edu.institution && (
                <div key={edu.id}>
                  <h3 className="font-bold text-sm">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700 text-sm">{edu.institution}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="relative">
            <div className="flex items-center mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Skills</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skills.map(skill => (
                <div
                  key={skill.id}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-4 py-3 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                  style={{ wordBreak: 'keep-all' }}
                >
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-bold text-sm">{proj.name}</h3>
                  <p className="text-gray-700 text-sm" style={{ wordWrap: 'break-word', hyphens: 'auto' }}>
                    {proj.description}
                  </p>
                  {proj.technologies.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {proj.technologies.join(', ')}
                    </p>
                  )}
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-xs hover:underline break-all">
                      {proj.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-600 mb-2 uppercase tracking-wide">Certifications</h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <h3 className="font-bold text-sm">{cert.name}</h3>
                  <p className="text-gray-700 text-xs">
                    {cert.issuer} • {formatDate(cert.date)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
