"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MotionReveal from "../../components/MotionReveal";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-36 pb-24 px-4">
      {/* soft background accent */}
      <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left content */}
        <div className="text-left">

          {/* Badge */}
          <MotionReveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1 text-sm text-indigo-700">
              <span>📘</span>
              Editorial-first blogging platform
            </div>
          </MotionReveal>

          {/* Heading */}
          <MotionReveal delay={0.1}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6 text-slate-900">
              Thoughtful writing,
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                structured publishing.
              </span>
            </h1>
          </MotionReveal>

          {/* Subtext */}
          <MotionReveal delay={0.2}>
            <p className="text-lg text-slate-600 max-w-xl mb-10">
              A role-based blogging system designed to mirror how modern
              publishing teams work — drafts, reviews, scheduling, and clean
              SEO-ready output.
            </p>
          </MotionReveal>

          {/* CTA */}
          <MotionReveal delay={0.3}>
            <div className="flex items-center gap-4">
              <Link href="/all-posts">
                <Button size="lg" className="px-10">
                  Read articles
                </Button>
              </Link>

            </div>
          </MotionReveal>
        </div>

        {/* Right visual */}
        <MotionReveal delay={0.4}>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-indigo-200/40 to-violet-200/40 blur-xl" />
            <div className="rounded-2xl border bg-white shadow-2xl p-2">
              <Image
                src="/heroimage.png"
                alt="Blog platform preview"
                width={900}
                height={600}
                priority
                className="rounded-xl"
              />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};

export default HeroSection;
