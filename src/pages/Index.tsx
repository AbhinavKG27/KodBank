import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="animated-bg" />
      <div className="z-10 text-center animate-fade-in-up">
        <h1 className="text-6xl font-bold text-primary gold-glow font-['Space_Grotesk'] mb-4">
          Kodbank
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-md mx-auto">
          Secure banking with stateless JWT authentication
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/login" className="btn-gold px-8 py-3 inline-block">Login</Link>
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all duration-300 inline-block"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
