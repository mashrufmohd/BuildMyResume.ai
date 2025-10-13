import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Eye, 
  Download,
  Users,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github
} from "lucide-react";

const Templates = () => {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Two-column layout with bold headings and accent colors",
      features: ["Sidebar layout", "Color accents", "Icon support", "Modern typography"],
      category: "Creative & Tech",
      rating: 4.9,
      downloads: "12.5K",
      preview: (
        <div className="w-full h-full bg-white p-6 text-xs">
          {/* Modern Template Preview */}
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/3 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-lg">Sarah Johnson</h3>
                <p className="text-sm opacity-90">Software Engineer</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Mail className="h-3 w-3 mr-2" />
                    Contact
                  </h4>
                  <p className="text-xs opacity-90">sarah.johnson@email.com</p>
                  <p className="text-xs opacity-90">(555) 123-4567</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Briefcase className="h-3 w-3 mr-2" />
                    Experience
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-xs">Senior Developer</p>
                      <p className="text-xs opacity-90">Google • 2021-Present</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-2/3 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Professional Summary</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Experienced software engineer with 5+ years developing scalable applications...
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {['React', 'Node.js', 'Python', 'AWS'].map(skill => (
                      <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Education</h4>
                  <div>
                    <p className="font-medium text-xs">B.S. Computer Science</p>
                    <p className="text-xs text-gray-600">Stanford University • 2018</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean single-column design with simple borders",
      features: ["Single column", "Clean typography", "Subtle borders", "Black & white"],
      category: "Corporate & Finance",
      rating: 4.8,
      downloads: "8.2K",
      preview: (
        <div className="w-full h-full bg-white p-6 text-xs">
          {/* Minimal Template Preview */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">SARAH JOHNSON</h2>
            <p className="text-sm text-gray-600">Software Engineer</p>
            <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
              <span>sarah.johnson@email.com</span>
              <span>|</span>
              <span>(555) 123-4567</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="border-l-2 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">PROFESSIONAL SUMMARY</h3>
              <p className="text-gray-600 leading-relaxed">
                Experienced software engineer with 5+ years developing scalable applications...
              </p>
            </div>
            
            <div className="border-l-2 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">EXPERIENCE</h3>
              <div className="space-y-2">
                <div>
                  <p className="font-medium">Senior Software Engineer</p>
                  <p className="text-gray-600">Google • 2021 - Present</p>
                  <p className="text-gray-600 mt-1">• Led development of microservices architecture</p>
                </div>
              </div>
            </div>
            
            <div className="border-l-2 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">EDUCATION</h3>
              <p className="font-medium">B.S. Computer Science</p>
              <p className="text-gray-600">Stanford University • 2018</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "professional",
      name: "Professional",
      description: "Structured corporate style with classic formatting",
      features: ["Corporate style", "Section dividers", "Classic fonts", "Structured layout"],
      category: "Corporate & Executive",
      rating: 4.7,
      downloads: "15.3K",
      preview: (
        <div className="w-full h-full bg-white p-6 text-xs">
          {/* Professional Template Preview */}
          <div className="border-b-2 border-gray-300 pb-4 mb-4">
            <h1 className="text-lg font-bold text-gray-900 mb-1">SARAH JOHNSON</h1>
            <p className="text-sm text-gray-600 mb-2">Senior Software Engineer</p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span>sarah.johnson@email.com</span>
              <span>•</span>
              <span>(555) 123-4567</span>
              <span>•</span>
              <span>San Francisco, CA</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Results-driven software engineer with 5+ years of experience in developing 
                scalable applications and leading technical teams...
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                PROFESSIONAL EXPERIENCE
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">Senior Software Engineer</p>
                      <p className="text-gray-600">Google, Mountain View, CA</p>
                    </div>
                    <p className="text-gray-500">2021 - Present</p>
                  </div>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    <li>• Led development of microservices architecture serving 1M+ users</li>
                    <li>• Mentored junior developers and conducted code reviews</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-2">
                EDUCATION
              </h3>
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">Bachelor of Science in Computer Science</p>
                  <p className="text-gray-600">Stanford University, Stanford, CA</p>
                </div>
                <p className="text-gray-500">2018</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const templateCategories = [
    { name: "All", count: 3 },
    { name: "Creative & Tech", count: 1 },
    { name: "Corporate & Finance", count: 1 },
    { name: "Corporate & Executive", count: 1 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              50K+ Resumes Created
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Resume{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our carefully designed templates, each optimized for ATS systems 
              and recruiter preferences. See exactly how your resume will look.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {templateCategories.map((category) => (
                <Badge 
                  key={category.name} 
                  variant={category.name === "All" ? "default" : "outline"}
                  className="px-4 py-2 text-sm"
                >
                  {category.name} ({category.count})
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  {/* Template Preview */}
                  <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden border-b">
                    <div className="absolute inset-0 transform scale-75 origin-top">
                      {template.preview}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Preview Overlay */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-700">
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Badge>
                    </div>
                    
                    {/* Template Name Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{template.name}</h3>
                      <p className="text-sm text-white/90">{template.category}</p>
                    </div>
                  </div>

                  {/* Template Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.floor(template.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{template.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Download className="h-4 w-4" />
                        <span>{template.downloads}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {template.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link to={`/builder?template=${template.id}`} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Use This Template
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="px-4">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Template Comparison */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Which Template is Right for You?
                </h2>
                <p className="text-xl text-gray-600">
                  Each template is designed for specific industries and career levels
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 border-0 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Modern Template</h3>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Creative & Tech
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">Best for:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Software developers</li>
                        <li>• Designers</li>
                        <li>• Marketing professionals</li>
                        <li>• Startup roles</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Why choose this:</h4>
                      <p className="text-sm text-gray-600">
                        Eye-catching design that showcases creativity while maintaining professionalism.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/builder?template=modern">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      Choose Modern
                    </Button>
                  </Link>
                </Card>

                <Card className="p-8 border-0 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="h-8 w-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Minimal Template</h3>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      Corporate & Finance
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">Best for:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Finance professionals</li>
                        <li>• Legal careers</li>
                        <li>• Academia</li>
                        <li>• Conservative industries</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Why choose this:</h4>
                      <p className="text-sm text-gray-600">
                        Clean, distraction-free design that focuses attention on your qualifications.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/builder?template=minimal">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      Choose Minimal
                    </Button>
                  </Link>
                </Card>

                <Card className="p-8 border-0 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Professional Template</h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Corporate & Executive
                    </Badge>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">Best for:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Senior executives</li>
                        <li>• Management roles</li>
                        <li>• Corporate positions</li>
                        <li>• Consulting</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Why choose this:</h4>
                      <p className="text-sm text-gray-600">
                        Structured layout that presents complex experience clearly and professionally.
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/builder?template=professional">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                      Choose Professional
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Perfect Resume?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Choose your template and start building a resume that gets you noticed by recruiters
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/builder">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold">
                View All Templates
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;