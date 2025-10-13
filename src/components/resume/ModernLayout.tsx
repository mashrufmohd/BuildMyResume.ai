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
    <div className="bg-white text-gray-900 shadow-xl resume-container" style={{ width: '210mm', minHeight: '297mm' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold mb-3">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && experience[0].company && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Experience</h2>
            <div className="space-y-4">
              {experience.map(exp => exp.company && (
                <div key={exp.id}>
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <p className="text-gray-600 font-medium">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-justify">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {education.map(edu => edu.institution && (
                <div key={edu.id}>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  <p className="text-sm text-gray-500">
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
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Projects</h2>
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="font-bold">{proj.name}</h3>
                  <p className="text-gray-700 text-justify">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {proj.technologies.join(', ')}
                    </p>
                  )}
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-sm hover:underline">
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
            <h2 className="text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide">Certifications</h2>
            <div className="space-y-2">
              {certifications.map(cert => (
                <div key={cert.id}>
                  <h3 className="font-bold">{cert.name}</h3>
                  <p className="text-gray-700 text-sm">
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
