import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  className,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    value ? options.find(option => option.value === value) : null
  );
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  // Update selected option when value changes externally
  useEffect(() => {
    if (value) {
      const option = options.find(option => option.value === value);
      if (option) {
        setSelectedOption(option);
      }
    } else {
      setSelectedOption(null);
    }
  }, [value, options]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        data-state={isOpen ? "open" : "closed"}
      >
        <span className={cn(!selectedOption && "text-muted-foreground")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div 
          className="absolute z-[9999] mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md max-h-72 overflow-auto p-1"
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "relative cursor-pointer select-none py-1.5 pl-8 pr-2 text-sm rounded-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                selectedOption?.value === option.value && "bg-accent text-accent-foreground"
              )}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selectedOption?.value === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {required && (
        <input
          type="hidden"
          name="custom-select"
          value={selectedOption?.value || ""}
          required={required}
        />
      )}
    </div>
  );
};

export default CustomSelect; 