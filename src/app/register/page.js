"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData
      );

      alert("Registration successful. Please login.");
      router.push("/login");

    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">

            <Input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <Button type="submit" className="w-full">
              Register
            </Button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
