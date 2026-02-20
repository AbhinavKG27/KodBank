import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Look up email by username
      const { data: user, error: lookupError } = await supabase
        .from("kod_users")
        .select("email, id")
        .eq("username", username)
        .maybeSingle();

      if (lookupError || !user) {
        throw new Error("Invalid username or password");
      }

      // Sign in with Supabase Auth (verifies bcrypt hash)
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password,
      });

      if (authError) throw new Error("Invalid username or password");

      // Store token record in user_tokens table
      const session = authData.session;
      if (session) {
        await supabase.from("user_tokens").insert({
          token: session.access_token,
          uid: user.id,
          expiry: new Date(session.expires_at! * 1000).toISOString(),
        });
      }

      navigate("/userdashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="animated-bg" />
      <div className="glass-card p-8 w-full max-w-md z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary gold-glow">Kodbank</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input-dark"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-dark"
          />

          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
