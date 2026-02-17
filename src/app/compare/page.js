"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");

  const [colleges, setColleges] = useState([]);
  const [strongest, setStrongest] = useState({});

  useEffect(() => {
    const fetchColleges = async () => {
      if (!ids) return;

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/colleges/compare?ids=${ids}`
        );
        setColleges(res.data.data);
        setStrongest(res.data.strongest || {});
      } catch (error) {
        console.error(error);
      }
    };

    fetchColleges();
  }, [ids]);

  if (!ids) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">
          Select colleges from homepage to compare
        </h1>
      </div>
    );
  }

  if (colleges.length === 0) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Compare Colleges</h1>

      <p className="text-sm text-gray-500 mb-4">
        Highlighted values indicate strongest metrics.
      </p>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feature</TableHead>
              {colleges.map((college) => (
                <TableHead key={college._id} className="text-center">
                  {college.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>

            {/* Ranking */}
            <TableRow>
              <TableCell className="font-medium">Ranking</TableCell>
              {colleges.map((college) => (
                <TableCell
                  key={college._id}
                  className={`text-center ${
                    strongest.ranking === college._id
                      ? "bg-green-100 font-semibold"
                      : ""
                  }`}
                >
                  {college.ranking ?? "—"}
                </TableCell>
              ))}
            </TableRow>

            {/* Location */}
            <TableRow>
              <TableCell className="font-medium">Location</TableCell>
              {colleges.map((college) => (
                <TableCell key={college._id} className="text-center">
                  {college.location}
                </TableCell>
              ))}
            </TableRow>

            {/* Fees */}
            <TableRow>
              <TableCell className="font-medium">Fees</TableCell>
              {colleges.map((college) => (
                <TableCell
                  key={college._id}
                  className={`text-center ${
                    strongest.fees === college._id
                      ? "bg-green-100 font-semibold"
                      : ""
                  }`}
                >
                  ₹{college.fees ?? "—"}
                </TableCell>
              ))}
            </TableRow>

            {/* Placement */}
            <TableRow>
              <TableCell className="font-medium">Placement</TableCell>
              {colleges.map((college) => (
                <TableCell
                  key={college._id}
                  className={`text-center ${
                    strongest.placementPercentage === college._id
                      ? "bg-green-100 font-semibold"
                      : ""
                  }`}
                >
                  {college.placementPercentage ?? "—"}%
                </TableCell>
              ))}
            </TableRow>

            {/* Eligibility */}
            <TableRow>
              <TableCell className="font-medium">Eligibility</TableCell>
              {colleges.map((college) => (
                <TableCell key={college._id} className="text-center">
                  {college.eligibility || "—"}
                </TableCell>
              ))}
            </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  );
}
