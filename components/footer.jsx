import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white z-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              BlogPlatform
            </Link>
            <p className="text-sm text-slate-600">
              A modern, role-based publishing platform built to understand how
              real content systems work in production.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/all-posts" className="hover:text-slate-900">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/posts/new" className="hover:text-slate-900">
                  Write a Post
                </Link>
              </li>
              <li>
                <Link href="/my-posts" className="hover:text-slate-900">
                  My Posts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-slate-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Built With
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Next.js App Router</li>
              <li>Prisma + PostgreSQL</li>
              <li>Clerk Authentication</li>
              <li>Role-based access</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} BlogPlatform. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Built as a learning-focused production-style project
          </p>
        </div>
      </div>
    </footer>
  );
}
