import {
    PenTool,
    ShieldCheck,
    Workflow,
    FileText,
    UserCog,
    BarChart3,
    Search,
  } from "lucide-react";
  
  /* ----------------------------
     STATS (NUMERIC IDS)
  ----------------------------- */
  export const statsData = [
    {
      id: 1,
      value: "Full-Stack",
      label: "End-to-end implementation",
    },
    {
      id: 2,
      value: "Role-Based",
      label: "Access control & permissions",
    },
    {
      id: 3,
      value: "Editorial",
      label: "Draft → Review → Publish workflow",
    },
    {
      id: 4,
      value: "SEO-Ready",
      label: "Optimized content structure",
    },
  ];
  
  /* ----------------------------
     FEATURES (BLOG PLATFORM)
  ----------------------------- */
  export const featuresData = [
    {
      id: 1,
      icon: <PenTool className="h-6 w-6 text-blue-600" />,
      title: "Rich Post Authoring",
      description:
        "Create and manage posts with clean slugs, publishing metadata, and structured content.",
    },
    {
      id: 2,
      icon: <Workflow className="h-6 w-6 text-blue-600" />,
      title: "Editorial Workflow",
      description:
        "Support for draft, review, and published states to mimic real-world content platforms.",
    },
    {
      id: 3,
      icon: <UserCog className="h-6 w-6 text-blue-600" />,
      title: "Role-Based Permissions",
      description:
        "Server-side access control for readers, authors, and admins to protect content actions.",
    },
    {
      id: 4,
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: "Authentication with Clerk",
      description:
        "Secure authentication and session management using a modern identity provider.",
    },
    {
      id: 5,
      icon: <Search className="h-6 w-6 text-blue-600" />,
      title: "SEO-Friendly Architecture",
      description:
        "Server-rendered pages with clean URLs, metadata, and indexing-friendly structure.",
    },
    {
      id: 6,
      icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
      title: "Basic Analytics",
      description:
        "Track post views and engagement to understand how content performs over time.",
    },
  ];
  
  /* ----------------------------
     HOW IT WORKS (STEP FLOW)
  ----------------------------- */
  export const howItWorksData = [
    {
      id: 1,
      icon: <FileText className="h-6 w-6 text-blue-600" />,
      title: "Write & Draft",
      description:
        "Authors write posts in draft mode without exposing unfinished content publicly.",
    },
    {
      id: 2,
      icon: <Workflow className="h-6 w-6 text-blue-600" />,
      title: "Review & Approve",
      description:
        "Admins review submitted posts before approving them for publication.",
    },
    {
      id: 3,
      icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
      title: "Publish Securely",
      description:
        "Approved posts go live with proper access control and SEO-friendly metadata.",
    },
  ];
  
  /* ----------------------------
     TESTIMONIALS (STUDENT-REAL)
  ----------------------------- */
  export const testimonialsData = [
    {
      id: 1,
      name: "Computer Science Student",
      image: "https://i.pravatar.cc/150?img=12",
      quote:
        "This project helped me understand how authentication and publishing workflows work in real applications.",
    },
    {
      id: 2,
      name: "Frontend Learner",
      image: "https://i.pravatar.cc/150?img=32",
      quote:
        "Clean UI and solid backend logic. A great example of a realistic full-stack project.",
    },
    {
      id: 3,
      name: "Self Reflection",
      image: "https://i.pravatar.cc/150?img=56",
      quote:
        "Building this taught me how frontend, backend, and database decisions connect together.",
    },
  ];
  