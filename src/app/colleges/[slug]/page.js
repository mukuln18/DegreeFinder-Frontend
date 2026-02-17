"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";

export default function CollegeDetail() {
  const { slug } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/colleges/${slug}`);
      setCollege(res.data.data);
    };

    fetchCollege();
  }, [slug]);

  if (!college) return <p className="p-8">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* HERO */}
      <div className="relative">
        {college.image && (
          <div className="w-full h-[350px] overflow-hidden rounded-xl">
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{college.name}</h1>
            <p className="text-gray-600">{college.location}</p>
          </div>

          {college.website && (
            <a href={college.website} target="_blank">
              <Button>Apply Now</Button>
            </a>
          )}
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Ranking</p>
            <p className="text-xl font-semibold">#{college.ranking}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Fees</p>
            <p className="text-xl font-semibold">₹{college.fees}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Placement</p>
            <p className="text-xl font-semibold">
              {college.placementPercentage}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Eligibility</p>
            <p className="text-xl font-semibold">
              {college.eligibility || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* DESCRIPTION */}
      {college.description && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">About College</h2>
          <p className="text-gray-700 leading-relaxed">{college.description}</p>
        </div>
      )}

      {/* COURSES */}
      {college.courses?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-3">Courses Offered</h2>

          <div className="grid gap-3">
            {college.courses.map((course) => (
              <Card key={course._id}>
                <CardContent className="p-4">
                  <p className="font-semibold">{course.name}</p>
                  <p className="text-sm text-gray-600">
                    Duration: {course.duration}
                  </p>
                  <p className="text-sm text-gray-600">Fees: ₹{course.fees}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
