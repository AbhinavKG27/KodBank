import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState<number | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/profile`, {
          credentials: "include",
        });
        if (!res.ok) {
          navigate("/login");
          return;
        }
        const data = await res.json();
        setUsername(data.username);
      } catch {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#F5A623", "#FFD700", "#FFC107", "#FF8C00"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#F5A623", "#FFD700", "#FFC107", "#FF8C00"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const checkBalance = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/user/balance`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch balance");

      setBalance(data.balance);
      setShowBalance(true);
      triggerConfetti();
    } catch (err: any) {
      setError(err.message || "Failed to fetch balance");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    navigate("/login");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="animated-bg" />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-bold text-primary gold-glow font-['Space_Grotesk']">Kodbank</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Welcome, <span className="text-foreground font-medium">{username}</span></span>
          <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-destructive transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-card p-10 w-full max-w-lg z-10 animate-fade-in-up text-center">
        <div className="mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 gold-border-glow">
            <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Account Dashboard</h1>
          <p className="text-muted-foreground mt-1">Role: Customer</p>
        </div>

        {!showBalance ? (
          <button onClick={checkBalance} disabled={loading} className="btn-gold w-full text-lg animate-pulse-gold">
            {loading ? "Verifying Token..." : "💰 Check Balance"}
          </button>
        ) : (
          <div className="animate-fade-in-up">
            <p className="text-muted-foreground mb-2">Your balance is</p>
            <p className="text-5xl font-bold text-primary gold-glow font-['Space_Grotesk']">
              {balance !== null ? formatCurrency(balance) : "—"}
            </p>
            <button
              onClick={() => { setShowBalance(false); setBalance(null); }}
              className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Hide Balance
            </button>
          </div>
        )}

        {error && <p className="text-destructive text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UserDashboard;
