import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function CollegeCard({ college , onSelect}) {
  return (
    <Link href={`/colleges/${college.slug}`}>
      <Card className="hover:shadow-lg transition cursor-pointer overflow-hidden">
        {college.image && (
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-44 object-cover"
          />
        )}

        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {college.name}
          </h2>
        </CardContent>

        <Button
          variant="outline"
          className="w-full mt-3"
          onClick={(e) => {
            e.preventDefault();
            onSelect(college);
          }}
        >
          Add to Compare
        </Button>
      </Card>
    </Link>
  );
}
