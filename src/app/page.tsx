import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Box,
  BarChartHorizontal,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background flex items-center justify-center">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold hidden sm:block">Smart Inventory</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center">
        <section className="py-20 md:py-32 bg-background">
          <div className="container flex flex-col items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Modern inventory management for your supply chain
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-[42rem]">
              Streamline your inventory process, reduce costs, and optimize your
              supply chain with our powerful yet simple inventory management
              solution.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Try for free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Powerful Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Everything you need to manage your inventory efficiently and
                effectively
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Box className="h-10 w-10" />}
                title="Real-time Inventory Tracking"
                description="Keep track of your inventory levels in real-time across multiple locations and warehouses."
              />
              <FeatureCard
                icon={<TrendingUp className="h-10 w-10" />}
                title="Demand Forecasting"
                description="Use advanced analytics to predict future demand and optimize your inventory levels."
              />
              <FeatureCard
                icon={<BarChartHorizontal className="h-10 w-10" />}
                title="Comprehensive Reporting"
                description="Generate detailed reports on inventory performance, stock movements, and sales trends."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10" />}
                title="Secure Data Management"
                description="Your inventory data is secure with enterprise-grade security and regular backups."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10" />}
                title="Streamlined Workflows"
                description="Automate routine tasks and streamline your inventory management workflows."
              />
              <FeatureCard
                icon={<CheckCircle2 className="h-10 w-10" />}
                title="Multi-platform Access"
                description="Access your inventory system from anywhere on any device - desktop, tablet, or mobile."
              />
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to optimize your inventory?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Join thousands of businesses that trust Smart Inventory for
                their supply chain needs
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Start your free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-10 bg-background flex items-center justify-center">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 px-4">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5 text-primary" />
            <span className="text-md font-bold">Smart Inventory</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Smart Inventory. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
