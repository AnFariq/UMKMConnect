"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PopoverGroup } from "@headlessui/react";
import { motion } from "framer-motion";
import CategoryMenu from "./CategoryMenu";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <motion.img
              src="./src/assets/icon_rm.png"
              alt="UMKMConnect"
              className="h-8 w-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            />
            <span className="text-lg font-bold text-gray-800">UMKMConnect</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2.5 text-gray-600"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* <CategoryMenu /> */}
          <Link to="/" className="text-sm font-semibold text-gray-800">
            Home
          </Link>
          <Link to="#" className="text-sm font-semibold text-gray-800">
            Explore
          </Link>
          <Link to="#" className="text-sm font-semibold text-gray-800">
            Detail UMKM
          </Link>
          <Link to="#" className="text-sm font-semibold text-gray-800">
            Daftar UMKM
          </Link>
          <Link to="/about" className="text-sm font-semibold text-gray-800">
            About
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-gray-800">
            Contact
          </Link>
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <MobileMenu closeMenu={() => setMobileMenuOpen(false)} />
      </Dialog>
    </header>
  );
}
