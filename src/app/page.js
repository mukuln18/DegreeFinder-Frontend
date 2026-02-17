"use client";

import { useEffect, useState } from "react";
import { getColleges } from "@/services/college.service";
import CollegeCard from "@/components/CollegeCard";
import FilterBar from "@/components/FilterBar";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/SkeletonCard";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  const [colleges, setColleges] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [compareList, setCompareList] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const limit = 5;
  const totalPages = Math.ceil(total / limit);

  const router = useRouter();

  const fetchColleges = async (newFilters = filters) => {
    try {
      setFilters(newFilters); // save filters for next page
      setLoading(true);
      const data = await getColleges({
        ...newFilters,
        page,
        limit,
      });

      setColleges(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCompare = (college) => {
    if (compareList.find((c) => c._id === college._id)) return;

    if (compareList.length >= 3) {
      alert("Maximum 3 colleges allowed");
      return;
    }

    setCompareList([...compareList, college]);
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter((c) => c._id !== id));
  };

  useEffect(() => {
    fetchColleges(filters);
  }, [page]);

  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <div id="colleges-section" className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-6">Explore Colleges</h1>

        <FilterBar
          onFilter={(newFilters) => {
            setPage(1);
            fetchColleges(newFilters);
          }}
        />

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg font-medium">No colleges found</p>
            <p className="text-sm">Try adjusting filters or search</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <CollegeCard
                key={college._id}
                college={college}
                onSelect={addToCompare}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
        
      {/* Sticky Compare Tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex justify-between items-center z-50">
          <div className="flex gap-3 flex-wrap">
            {compareList.map((college) => (
              <div
                key={college._id}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm flex items-center gap-2"
              >
                {college.name}
                <button
                  onClick={() => removeFromCompare(college._id)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {compareList.length >= 2 && (
            <Button
              onClick={() =>
                router.push(
                  `/compare?ids=${compareList.map((c) => c._id).join(",")}`,
                )
              }
            >
              Compare
            </Button>
          )}
        </div>
        
      )}
    </div>
  );
}
