import React, { Component, ErrorInfo, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error("Uncaught error in component:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col min-h-screen bg-background">
          <Navbar />
          <main className="flex-grow flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <h1 className="text-9xl font-extrabold text-destructive/10 tracking-tighter">
                  Oops
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    Something went wrong
                  </h2>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg text-balance">
                  We encountered an unexpected error. Don't worry, it's not your fault. Some developer noise was suppressed for your comfort.
                </p>
                <div className="pt-4">
                  <Button 
                    onClick={() => window.location.reload()} 
                    size="lg" 
                    className="rounded-full px-8 gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" />
                    Try Refreshing
                  </Button>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return this.props.children;
  }
}


export default ErrorBoundary;
