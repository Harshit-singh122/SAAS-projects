import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  SignedOut,
  SignedIn,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { navbarStyles } from "../assets/dummystyle";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // ❌ Hide navbar inside app
  if (location.pathname.startsWith("/app")) return null;

  const openSignInWithRedirect = () => {
    openSignIn({
      afterSignInUrl: "/app/dashboard",
    });
  };

  return (
    <header className={navbarStyles.header}>
      <div className={navbarStyles.container}>
        <nav className={navbarStyles.nav}>
          {/* LEFT */}
          <div className={navbarStyles.logoSection}>
            <Link to="/" className={navbarStyles.logoLink}>
              <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
              <span className={navbarStyles.logoText}>InvoiceAI</span>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <a href="#features" className={navbarStyles.navLink}>Features</a>
              <a href="#pricing" className={navbarStyles.navLinkInactive}>Pricing</a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <div className="hidden md:flex gap-4">
                <button onClick={openSignInWithRedirect} className={navbarStyles.signInButton}>
                  Sign In
                </button>
                <button onClick={openSignInWithRedirect} className={navbarStyles.signUpButton}>
                  Get Started
                </button>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Mobile */}
            <button onClick={() => setOpen(!open)} className={navbarStyles.mobileMenuButton}>
              ☰
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className={navbarStyles.mobileMenu}>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>

          <SignedOut>
            <button onClick={openSignInWithRedirect}>Sign In</button>
          </SignedOut>
        </div>
      )}
    </header>
  );
};

export default Navbar;
