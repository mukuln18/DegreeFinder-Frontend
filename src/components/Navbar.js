"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedEmail = localStorage.getItem("email");

    setRole(storedRole);
    setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight">
            DegreeFinder
          </h1>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          {role === "admin" && (
            <>
              <Link href="/" className="hover:text-black transition">
                Home
              </Link>

              <Link href="/add-college" className="hover:text-black transition">
                Add College
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!email && (
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}

          {email && (
            <>
              <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {email}
              </span>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
