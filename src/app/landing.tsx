"use client"
import { motion } from 'framer-motion';
import { 
  Github, 
  Brain, 
  Mic, 
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { MovingBorder } from "~/components/ui/moving-border";
import { AnimatedTooltip } from "~/components/ui/animated-tooltip";
import { SparklesCore } from "~/components/ui/sparkles";
import { TextGenerateEffect } from "~/components/ui/text-generate-effect";
import { Button } from '~/components/ui/button';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    designation: "Lead Developer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    designation: "Engineering Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Alex Thompson",
    designation: "Senior Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

function LandingPage() {
    const {theme} = useTheme();
  return (
    <div className="min-h-screen dark:bg-black  ">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            maxSize={2}
            minSize={1}
            particleColor={theme=='dark'?"white":"black"}
            className="w-full h-full"
            particleDensity={40}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TextGenerateEffect
              words="Summarize large codebases in a single click."
              className="text-3xl md:text-4xl xl:text-6xl font-bold mb-8"
            />
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Our AI-powered platform helps you quickly understand and navigate complex codebases, saving you time and effort.
            </p>
            <div  className="flex flex-wrap justify-center gap-4">
              <MovingBorder duration={6000}  className="px-8 py-3 bg-indigo-600 rounded-lg font-semibold">
                <Link href={'/dashboard'} className='w-full'>
               Get Started Free
                <ChevronRight className="ml-2 inline-block w-5 h-5" />
                  </Link>
                  
              </MovingBorder>
              <button  className="px-8 py-3 border-2 border-gray-700 rounded-lg font-semibold hover:border-indigo-600 transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
        
      </header>

      {/* Features Section */}
      <section className="py-32 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines AI capabilities with developer workflows
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              {
                icon: <Github />,
                title: "GitHub Integration",
                description: "Connect repositories and manage projects effortlessly",
                color: "from-blue-600 to-indigo-600",
              },
              {
                icon: <Brain />,
                title: "AI Summarization",
                description: "Advanced file and commit summarization with Gemini",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: <Mic />,
                title: "Meeting Notes",
                description: "Automated documentation with Assembly API",
                color: "from-orange-600 to-red-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition duration-500 rounded-xl blur-xl"
                  style={{
                    background: `linear-gradient(to right, ${feature.color})`,
                  }}
                />
                <div className="relative p-8 bg-neutral-500 dark:bg-gray-900 rounded-xl border border-gray-800 group-hover:border-gray-700 transition">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold mb-4">Trusted by Developers</h2>
            <AnimatedTooltip items={testimonials} />
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 pb-20 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Simple, Credit-Based Pricing</h2>
            <p className="text-gray-400">Start free and scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-white">
            {[
              {
                name: "Starter",
                price: "Free",
                credits: "100",
                features: ["Basic GitHub integration", "5 repositories", "Basic summaries"]
              },
              {
                name: "Pro",
                price: "$49",
                credits: "1000",
                features: ["Advanced GitHub integration", "Unlimited repositories", "Priority support"]
              },
              {
                name: "Enterprise",
                price: "Custom",
                credits: "Custom",
                features: ["Custom integrations", "Dedicated support", "Custom AI models"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`rounded-xl p-8 ${
                  index === 1 
                    ? 'bg-gradient-to-b from-indigo-500 to-indigo-700' 
                    : 'bg-gray-900'
                }`}
              >
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-sm">/month</span>}
                </div>
                <p className="mb-6 text-gray-400">
                  {plan.credits} credits included
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-indigo-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-2 rounded-lg font-semibold ${
                    index === 1
                      ? 'bg-white text-indigo-600'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "Changelog"]
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security"]
              },
              {
                title: "Social",
                links: ["Twitter", "GitHub", "LinkedIn"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI SaaS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

