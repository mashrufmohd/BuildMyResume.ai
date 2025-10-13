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
    <div className="bg-white text-gray-900 shadow-xl p-10 resume-container" style={{ width: '210mm', minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-700">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-7">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm text-justify">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {experience.map(exp => exp.company && (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-sm">{exp.position}</h3>
                    <span className="text-xs text-gray-600">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm italic text-gray-600 mb-2">{exp.company}, {exp.location}</p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed text-justify">{exp.description}</p>
                  )}
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
          <div>
            <h2 className="text-base font-bold mb-3 text-gray-800 border-b border-gray-300 pb-1">
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="text-sm text-gray-700">
                  {skill.name}
                  {skill !== skills[skills.length - 1] && ' •'}
                </span>
              ))}
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
                  <p className="text-sm text-gray-700 text-justify">{proj.description}</p>
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
