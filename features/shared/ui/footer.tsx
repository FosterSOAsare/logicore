"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/company" },
    { name: "Our Services", href: "/services" },
    { name: "Track Shipment", href: "/tracking" },
    { name: "Contact us", href: "/contact" },
  ];

  const servicesLinks = [
    { name: "Air Freight", href: "/services/air-freight" },
    { name: "Ocean Freight", href: "/services/ocean-freight" },
    { name: "Land Transport", href: "/services/land-transport" },
    { name: "Warehousing", href: "/services/warehousing" },
    { name: "Customs Brokerage", href: "/services/customs-brokerage" },
  ];

  return (
    <footer className="bg-primary text-white pt-10 md:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter flex items-center gap-1 mb-6"
            >
              LOGICORE
              <div className="w-2 h-2 rounded-full bg-secondary mb-1" />
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Global logistics partner delivering excellence in freight,
              warehousing, and supply chain solutions.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white active:bg-secondary active:text-white transition-all duration-300 text-gray-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="">
            <h3 className="text-lg !text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`transition-colors flex items-center gap-2 group ${
                      isActive(item.href)
                        ? "text-secondary"
                        : "text-gray-400 hover:text-white active:text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive(item.href)
                          ? "bg-secondary"
                          : "bg-gray-600 group-hover:bg-secondary group-active:bg-secondary"
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg !text-white font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`transition-colors flex items-center gap-2 group ${
                      isActive(item.href)
                        ? "text-secondary"
                        : "text-gray-400 hover:text-white active:text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isActive(item.href)
                          ? "bg-secondary"
                          : "bg-gray-600 group-hover:bg-secondary group-active:bg-secondary"
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg !text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-secondary shrink-0" />
                <span className="text-gray-400">New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-gray-400">+233 55 052 9015</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-gray-400">fostersoasare@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 LogiCore Logistics. All Rights Reserved.
          </p>
          <div className="flex space-x-8">
            <Link
              href="/privacy"
              className={`text-sm transition-colors ${
                isActive("/privacy")
                  ? "text-secondary font-medium"
                  : "text-gray-500 hover:text-white active:text-white"
              }`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`text-sm transition-colors ${
                isActive("/terms")
                  ? "text-secondary font-medium"
                  : "text-gray-500 hover:text-white active:text-white"
              }`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
