import { ArrowRight } from "lucide-react";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="px-4 py-12 md:py-16 max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Section - Logo and CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-bold text-2xl tracking-tight mb-4">
                <Logo className=" bg-clip-text  brightness-0 invert" />
              </div>
              <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
                Curated collections of premium homeware and cosmetics for the
                design-conscious. Discover timeless pieces that elevate your
                space and self.
              </p>
            </div>
            <button className="mt-6 inline-flex items-center gap-2 border border-primary-foreground/30 hover:border-primary-foreground px-4 py-3 text-sm font-medium transition-colors w-fit">
              GET STARTED
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Section - Link Columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* About Us */}
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4 uppercase">
                About Us
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Mission
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Our Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Awards
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4 uppercase">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Web Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Web Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Mobile Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    UI/UX Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Branding Design
                  </a>
                </li>
              </ul>
            </div>

            {/* Portfolio */}
            <div>
              <h4 className="font-semibold text-sm tracking-wide mb-4 uppercase">
                Portfolio
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Corporate Websites
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    E-commerce
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Mobile Apps
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    Landing Pages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-primary-foreground/90 hover:text-primary-foreground transition-colors text-sm"
                  >
                    UI/UX Projects
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-xs text-primary-foreground/60">
          <p>
            Copyright © 2025 ZAT | All Rights Reserved |{" "}
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors underline"
            >
              Terms and Conditions
            </a>{" "}
            |{" "}
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
