import { Cta } from "@/components/ui/Cta";
import { redirect } from "next/navigation";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Logos } from "./components/Logos";
import { Navbar } from "./components/Navbar";
import { Testimonial } from "./components/Testimonial";
import { auth } from "./lib/auth";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect ("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features />
      <Testimonial />
      <Cta />
    </div>
  );
}
