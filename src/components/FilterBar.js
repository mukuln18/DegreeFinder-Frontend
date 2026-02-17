import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBar({ onFilter }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minFees, setMinFees] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [sort, setSort] = useState("");
  const [minRanking, setMinRanking] = useState("");
  const [maxRanking, setMaxRanking] = useState("");
  const [minPlacement, setMinPlacement] = useState("");

  useEffect(() => {
  const delayDebounce = setTimeout(() => {
    onFilter({
      search,
      location,
      minFees,
      maxFees,
      minRanking,
      maxRanking,
      minPlacement,
      sort,
    });
  }, 500);

  return () => clearTimeout(delayDebounce);
}, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onFilter({
      search,
      location,
      minFees,
      maxFees,
      minRanking,
      maxRanking,
      minPlacement,
      sort,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid gap-4 md:grid-cols-4 lg:grid-cols-6 items-end"
    >
      <Input
        type="text"
        placeholder="Search college"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Min Fees"
        value={minFees}
        onChange={(e) => setMinFees(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Max Fees"
        value={maxFees}
        onChange={(e) => setMaxFees(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Min Ranking"
        value={minRanking}
        onChange={(e) => setMinRanking(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Max Ranking"
        value={maxRanking}
        onChange={(e) => setMaxRanking(e.target.value)}
      />

      <Input
        type="number"
        placeholder="Min Placement %"
        value={minPlacement}
        onChange={(e) => setMinPlacement(e.target.value)}
      />

      <Select onValueChange={(value) => setSort(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fees">Fees Low to High</SelectItem>
          <SelectItem value="-fees">Fees High to Low</SelectItem>
          <SelectItem value="ranking">Ranking</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full">
        Apply
      </Button>
    </form>
  );
}
