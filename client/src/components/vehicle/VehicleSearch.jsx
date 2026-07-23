import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui";

const VehicleSearch = ({ searchQuery, onSearchChange }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    // If the prop updates from outside (e.g. cleared), sync it
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localQuery !== searchQuery) {
        onSearchChange(localQuery);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, onSearchChange, searchQuery]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted" />
      </div>
      <Input
        type="text"
        placeholder="Search make or model..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-10 w-full bg-surface border-border focus:border-primary transition-colors"
      />
    </div>
  );
};

export default VehicleSearch;
