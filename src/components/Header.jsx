"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PopoverGroup } from "@headlessui/react";



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
            <img
              src="icon_rm.png"
              alt="UMKMConnect"
              className="h-8 w-auto"
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
          <Link to="/" className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/daftar-umkm" className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Daftar UMKM
          </Link>
          <Link to="/about" className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </PopoverGroup>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/30" />
        <div className="fixed inset-0 z-50 flex">
          <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition-transform">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="icon_rm.png"
                  alt="UMKMConnect"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      <li>
                        <Link
                          to="/"
                          className="text-gray-800 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/daftar-umkm"
                          className="text-gray-800 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Daftar UMKM
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about"
                          className="text-gray-800 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/contact"
                          className="text-gray-800 hover:bg-gray-50 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </header>
  );
}
