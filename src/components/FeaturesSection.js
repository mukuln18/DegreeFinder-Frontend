import { Card, CardContent } from "@/components/ui/card";
import { Search, BarChart3, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Smart Search & Filters",
      desc: "Quickly find colleges using ranking, fees, placement, and location filters.",
      icon: <Search className="w-8 h-8" />,
    },
    {
      title: "Compare Colleges Easily",
      desc: "Compare multiple colleges side-by-side to choose the best option.",
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: "Reliable & Structured Data",
      desc: "Every college includes courses, fees, placements, eligibility and more.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 ">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-semibold text-center mb-12">
          Why Choose DegreeFinder
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="p-6 space-y-4 text-center">

                <div className="flex justify-center text-primary">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {feature.desc}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
