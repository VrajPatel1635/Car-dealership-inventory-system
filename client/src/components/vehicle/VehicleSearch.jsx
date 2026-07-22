import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui";

const VehicleSearch = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted" />
      </div>
      <Input
        type="text"
        placeholder="Search make or model..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default VehicleSearch;
