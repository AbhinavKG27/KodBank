import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ uid: "", username: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sign up with Supabase Auth (password is hashed automatically via bcrypt)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { username: form.username } },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Registration failed");

      // Insert into kod_users profile table
      const { error: profileError } = await supabase.from("kod_users").insert({
        id: authData.user.id,
        uid: form.uid,
        username: form.username,
        email: form.email,
        phone: form.phone,
        role: "Customer",
        balance: 100000,
      });

      if (profileError) throw profileError;

      // Sign out so they go to login
      await supabase.auth.signOut();
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
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
          <p className="text-muted-foreground mt-2">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="uid" placeholder="User ID" value={form.uid} onChange={handleChange} required className="input-dark" />
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="input-dark" />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="input-dark" />
          <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required minLength={6} className="input-dark" />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="input-dark" />

          <div className="text-sm text-muted-foreground px-1">
            Role: <span className="text-primary font-medium">Customer</span> · Starting Balance: <span className="text-primary font-medium">₹1,00,000</span>
          </div>

          {error && <p className="text-destructive text-sm text-center">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold w-full">
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
