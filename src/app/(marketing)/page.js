import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import {
  statsData,
  howItWorksData,
  testimonialsData,
  featuresData,
} from "@/data/landing";
import MotionReveal from "../../../components/MotionReveal";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Hero */}
      <HeroSection />

      {/* Writing Principles / Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {statsData.map((item, index) => (
              <MotionReveal key={index} delay={index * 0.06}>
                <div className="text-center">
                  <div className="text-4xl font-semibold text-indigo-600 mb-2">
                    {item.value}
                  </div>
                  <div className="text-sm text-slate-600">
                    {item.label}
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Built like a real publishing system
              </h2>
              <p className="text-slate-600 text-lg">
                This project mirrors how modern content platforms manage
                authorship, reviews, and structured publishing workflows.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuresData.map((feature, index) => (
              <MotionReveal key={index} delay={index * 0.08}>
                <Card className="border bg-white/80 backdrop-blur p-6 hover:shadow-lg transition">
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600">
                      {feature.icon}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Workflow */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Editorial workflow, simplified
              </h2>
              <p className="text-slate-600 text-lg">
                From drafting to publishing, each step follows real editorial
                systems used by professional platforms.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
            {howItWorksData.map((step, index) => (
              <MotionReveal key={index} delay={index * 0.1}>
                <div className="text-center px-6">
                  <div className="w-14 h-14 bg-violet-100 text-violet-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                    {step.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Peer Feedback */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <MotionReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                Feedback from learners & peers
              </h2>
              <p className="text-slate-600 text-lg">
                Insights from early users who explored the platform during
                development and testing.
              </p>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial, index) => (
              <MotionReveal key={index} delay={index * 0.1}>
                <div className="bg-white border rounded-2xl p-6 text-center hover:shadow-md transition">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mx-auto mb-4"
                  />

                  <p className="font-medium text-slate-900 mb-2">
                    {testimonial.name}
                  </p>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <MotionReveal>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">
              Explore how real content platforms work
            </h2>

            <p className="text-indigo-100 max-w-2xl mx-auto mb-10">
              Browse articles, inspect workflows, and understand how modern
              role-based publishing systems are built.
            </p>

            <div className="flex justify-center gap-4">
              <Link href="/all-posts">
                <Button size="lg" variant="secondary" className="px-10">
                  Read articles
                </Button>
              </Link>
              <Link href="/posts/new">
                <Button size="lg" className="px-10">
                  Start writing
                </Button>
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
