import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-primary/10 tracking-tighter">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Page Not Found
              </h2>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground text-lg text-balance">
              We couldn't find the page you were looking for. It might have been moved or doesn't exist anymore.
            </p>
            <div className="pt-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/" className="inline-flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Return Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

