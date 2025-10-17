import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { FileText, Mail, Lock, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Debug environment variables
  useEffect(() => {
    console.log('Environment check:');
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_PUBLISHABLE_KEY exists:', !!import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Handle email confirmation
    const handleAuthCallback = async () => {
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (token_hash && type === 'signup') {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'signup',
        });

        if (error) {
          toast.error('Email verification failed: ' + error.message);
        } else {
          toast.success('Email verified successfully! You can now sign in.');
          navigate('/signin');
        }
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  useEffect(() => {
    // Reset verification state when email changes
    setVerificationSent(false);
  }, [email]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/signup`,
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.");
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("CORS")) {
          toast.error("Connection error. Please check your Supabase configuration and ensure your current domain is added to allowed origins.");
        } else if (error.message.includes("Invalid API key")) {
          toast.error("Invalid API key. Please check your Supabase configuration.");
        } else {
          toast.error(`Sign up failed: ${error.message}`);
        }
      } else {
        if (data.user && !data.user.email_confirmed_at) {
          // Email confirmation required
          setVerificationSent(true);
          toast.success("Account created! Please check your email and click the verification link.");
        } else {
          // Email already confirmed (shouldn't happen with default settings)
          toast.success("Account created successfully! You can now sign in.");
          setEmail("");
          setPassword("");
        }
      }
    } catch (error: any) {
      console.error('Sign up exception:', error);
      if (error.message?.includes("Failed to fetch") || error.name === "TypeError" || error.message?.includes("CORS")) {
        toast.error("Connection failed. Please ensure your Supabase project allows requests from your current domain.");
      } else {
        toast.error(error.message || "An error occurred during sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Sign up to start building your resume</p>
          </div>

          {verificationSent ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Mail className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Check your email</h3>
                    <p className="text-sm">We've sent a verification link to {email}. Click the link to activate your account.</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setVerificationSent(false)}
              >
                Back to sign up
              </Button>
              <Button
                variant="link"
                className="w-full"
                onClick={() => navigate('/signin')}
              >
                Already have an account? Sign in
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    required
                    minLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 6 characters
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => navigate('/signin')}
                  className="text-sm"
                >
                  Already have an account? Sign in
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SignUp;