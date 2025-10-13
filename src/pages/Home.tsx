import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  FileText, 
  Sparkles, 
  Download, 
  LayoutTemplate, 
  ArrowRight, 
  CheckCircle2,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  Shield,
  Users,
  Star,
  Play,
  Mail,
  Briefcase
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles className="h-4 w-4" />
                    AI-Powered Resume Builder
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Create a Compelling CV with{" "}
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      AI assistance
                    </span>{" "}
                    in minutes
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Online resume builder with AI assistance
                  </p>
                  
                  <p className="text-lg text-gray-500">
                    Seamlessly create an exceptional resume/CV with AI-powered features, 
                    fine-tuning expert content to match your individuality.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/builder">
                      <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        GET STARTED
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-purple-300 px-8 py-4 text-lg font-semibold rounded-xl">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-8 pt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">50K+</div>
                      <div className="text-sm text-gray-500">Resumes Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">4.9★</div>
                      <div className="text-sm text-gray-500">User Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-gray-500">Success Rate</div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Device Mockups */}
                <div className="relative">
                  {/* Laptop Mockup */}
                  <div className="relative z-10 bg-gray-900 rounded-t-lg p-4 shadow-2xl">
                    <div className="bg-white rounded-lg p-6 min-h-[400px]">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <FileText className="h-6 w-6 text-purple-600" />
                          <span className="font-bold text-lg">ResumeBuilder</span>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                          <div className="text-sm font-medium">New Resume</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <LayoutTemplate className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                          <div className="text-sm font-medium">Templates</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <Download className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-sm font-medium">Download</div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-2">Recent Resumes</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Software Engineer Resume</span>
                            <span className="text-xs text-green-600">Completed</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Marketing Manager CV</span>
                            <span className="text-xs text-blue-600">In Progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Mockup */}
                  <div className="absolute -bottom-8 -left-8 bg-gray-800 rounded-2xl p-2 shadow-xl z-20">
                    <div className="bg-white rounded-xl p-4 w-48 h-80">
                      <div className="text-center mb-4">
                        <div className="w-8 h-1 bg-gray-300 rounded mx-auto mb-3"></div>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <span className="font-semibold text-sm">ResumeBuilder</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <FileText className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                          <div className="text-xs font-medium">Resume</div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <LayoutTemplate className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                          <div className="text-xs font-medium">Templates</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <Download className="h-6 w-6 text-green-600 mx-auto mb-1" />
                          <div className="text-xs font-medium">Download</div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                          <Users className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                          <div className="text-xs font-medium">Profile</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-xs text-gray-600 mb-2">Quick Actions</div>
                        <div className="space-y-1">
                          <div className="text-xs">Create New Resume</div>
                          <div className="text-xs">View Templates</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tablet Mockup */}
                  <div className="absolute -top-4 -right-4 bg-gray-700 rounded-lg p-2 shadow-xl z-10">
                    <div className="bg-white rounded-md p-3 w-32 h-20">
                      <div className="flex items-center gap-1 mb-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span className="text-xs font-semibold">CV Builder</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="bg-purple-50 p-1 rounded text-center">
                          <FileText className="h-3 w-3 text-purple-600 mx-auto" />
                        </div>
                        <div className="bg-blue-50 p-1 rounded text-center">
                          <LayoutTemplate className="h-3 w-3 text-blue-600 mx-auto" />
                        </div>
                        <div className="bg-green-50 p-1 rounded text-center">
                          <Download className="h-3 w-3 text-green-600 mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Perfect Template
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                See exactly how your resume will look with our professional templates
              </p>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50">
                  View All Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {/* Modern Template Preview */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 transform scale-75 origin-top">
                    <div className="w-full h-full bg-white p-4 text-xs">
                      <div className="flex h-full">
                        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-blue-600 text-white p-3">
                          <div className="text-center mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-sm">Sarah Johnson</h3>
                            <p className="text-xs opacity-90">Software Engineer</p>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold mb-1 flex items-center text-xs">
                                <Mail className="h-3 w-3 mr-1" />
                                Contact
                              </h4>
                              <p className="text-xs opacity-90">sarah@email.com</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1 flex items-center text-xs">
                                <Briefcase className="h-3 w-3 mr-1" />
                                Experience
                              </h4>
                              <div>
                                <p className="font-medium text-xs">Senior Developer</p>
                                <p className="text-xs opacity-90">Google • 2021-Present</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-2/3 p-3">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-1">Professional Summary</h4>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                Experienced software engineer with 5+ years developing scalable applications...
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-1">Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {['React', 'Node.js', 'Python'].map(skill => (
                                  <span key={skill} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold mb-1">Modern</h3>
                  <p className="text-sm text-gray-600">Creative & Tech</p>
                </div>
              </Card>

              {/* Minimal Template Preview */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 transform scale-75 origin-top">
                    <div className="w-full h-full bg-white p-4 text-xs">
                      <div className="text-center mb-4">
                        <h2 className="text-sm font-bold text-gray-900 mb-1">SARAH JOHNSON</h2>
                        <p className="text-xs text-gray-600">Software Engineer</p>
                        <div className="flex justify-center gap-2 mt-1 text-xs text-gray-500">
                          <span>sarah@email.com</span>
                          <span>|</span>
                          <span>(555) 123-4567</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="border-l-2 border-gray-300 pl-3">
                          <h3 className="font-semibold text-gray-900 mb-1">PROFESSIONAL SUMMARY</h3>
                          <p className="text-gray-600 leading-relaxed">
                            Experienced software engineer with 5+ years developing scalable applications...
                          </p>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-3">
                          <h3 className="font-semibold text-gray-900 mb-1">EXPERIENCE</h3>
                          <div>
                            <p className="font-medium">Senior Software Engineer</p>
                            <p className="text-gray-600">Google • 2021 - Present</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold mb-1">Minimal</h3>
                  <p className="text-sm text-gray-600">Corporate & Finance</p>
                </div>
              </Card>

              {/* Professional Template Preview */}
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="aspect-[8.5/11] bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 transform scale-75 origin-top">
                    <div className="w-full h-full bg-white p-4 text-xs">
                      <div className="border-b-2 border-gray-300 pb-3 mb-3">
                        <h1 className="text-sm font-bold text-gray-900 mb-1">SARAH JOHNSON</h1>
                        <p className="text-xs text-gray-600 mb-1">Senior Software Engineer</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                          <span>sarah@email.com</span>
                          <span>•</span>
                          <span>(555) 123-4567</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-1">
                            PROFESSIONAL SUMMARY
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            Results-driven software engineer with 5+ years of experience...
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 border-b border-gray-200 pb-1 mb-1">
                            EXPERIENCE
                          </h3>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">Senior Software Engineer</p>
                              <p className="text-gray-600">Google, Mountain View, CA</p>
                            </div>
                            <p className="text-gray-500">2021 - Present</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold mb-1">Professional</h3>
                  <p className="text-sm text-gray-600">Corporate & Executive</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our AI Resume Builder?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of resume creation with our cutting-edge AI technology
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our advanced AI analyzes your experience and generates compelling, 
                  industry-specific content that gets you noticed.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">ATS-Optimized</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every resume is crafted to pass Applicant Tracking Systems 
                  and reach human recruiters with maximum impact.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="bg-gradient-to-r from-green-100 to-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutTemplate className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Professional Templates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose from dozens of professionally designed templates 
                  that work across all industries and experience levels.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Create Your Perfect Resume in 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From blank page to professional resume in minutes, not hours
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    step: 1, 
                    title: "Choose Your Template", 
                    desc: "Select from our collection of professionally designed templates that match your industry and style preferences.",
                    icon: LayoutTemplate,
                    color: "purple"
                  },
                  { 
                    step: 2, 
                    title: "AI-Powered Content Creation", 
                    desc: "Our AI analyzes your experience and generates compelling content tailored to your target role and industry.",
                    icon: Sparkles,
                    color: "blue"
                  },
                  { 
                    step: 3, 
                    title: "Download & Apply", 
                    desc: "Export your resume as a PDF and start applying to jobs with confidence. Get hired faster with professional presentation.",
                    icon: Download,
                    color: "green"
                  }
                ].map((item, index) => (
                  <div key={item.step} className="relative">
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-2xl bg-${item.color}-100 flex items-center justify-center mx-auto mb-6`}>
                        <item.icon className={`h-8 w-8 text-${item.color}-600`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{item.step}</div>
                      <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent transform translate-x-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Loved by Job Seekers Worldwide
              </h2>
              <p className="text-xl text-gray-600">
                See what our users are saying about their success
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Software Engineer",
                  company: "Google",
                  content: "The AI suggestions were incredibly helpful. I got 3 interview calls within a week of using my new resume!",
                  rating: 5
                },
                {
                  name: "Michael Chen",
                  role: "Marketing Manager",
                  company: "Microsoft",
                  content: "Finally, a resume builder that understands what recruiters want to see. The templates are professional and modern.",
                  rating: 5
                },
                {
                  name: "Emily Rodriguez",
                  role: "Data Scientist",
                  company: "Amazon",
                  content: "The ATS optimization feature is a game-changer. My resume now passes through every system without issues.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join over 50,000 professionals who have successfully created winning resumes with our AI-powered builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/builder">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg">
                  Start Building Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold rounded-xl">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;