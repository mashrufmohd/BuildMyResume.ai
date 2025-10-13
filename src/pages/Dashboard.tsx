import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Plus, Trash2, Edit, Download, Calendar } from "lucide-react";
import { User } from "@supabase/supabase-js";

interface Resume {
  id: string;
  title: string;
  template_layout: string;
  created_at: string;
  updated_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/auth");
      return;
    }

    setUser(session.user);
    fetchResumes(session.user.id);
  };

  const fetchResumes = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setResumes(resumes.filter(r => r.id !== id));
      toast.success("Resume deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete resume");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
              <p className="text-muted-foreground">
                Manage and edit your professional resumes
              </p>
            </div>
            <Button onClick={() => navigate("/builder")} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Create New Resume
            </Button>
          </div>

          {resumes.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No resumes yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first professional resume with AI assistance
              </p>
              <Button onClick={() => navigate("/builder")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Resume
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {resume.template_layout} Template
                      </p>
                    </div>
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {formatDate(resume.updated_at)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/builder?id=${resume.id}`)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this resume?")) {
                          deleteResume(resume.id);
                        }
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
