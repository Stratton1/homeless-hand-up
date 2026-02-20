import Link from 'next/link';
const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" stroke="none">
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-brand-light-gray mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Logo & Tagline */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-brand-warm to-brand-warm-dark">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Homeless Hand Up</span>
            </div>
            <p className="text-sm leading-relaxed text-brand-gray max-w-xs">
              Bottom up charity with parameters in place that promote long term benefits
              for the homeless.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/our-mission"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works/donors"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/transparency"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Transparency
                </Link>
              </li>
              <li>
                <Link
                  href="/where-to-spend"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Where to Spend
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get Involved</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/local"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Find Near Me
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Corporate Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@homelesshandup.org"
                  className="text-brand-light-gray hover:text-brand-warm transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-trust-dark/20 pt-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-brand-gray">
            © {new Date().getFullYear()} Homeless Hand Up. All rights reserved.
          </p>
          <p className="text-sm text-brand-gray">Built with love for our community</p>
        </div>
      </div>
    </footer>
  );
}
