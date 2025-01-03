import { useState } from "react";

const AssignedToSelect = ({ selectedOption, setSelectedOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    {
      id: 0,
      type: "Demand v/s Production",
    },
    {
      id: 1,
      type: "Monthly Demand",
    },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 w-56  z-50">
      <button
        type="button"
        className="grid w-full cursor-default grid-cols-1 rounded-md bg-black/30 py-1.5 pl-3 pr-2 text-left text-white  outline-1 -outline-offset-1  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        aria-haspopup="listbox"
        aria-expanded={isDropdownOpen}
        aria-labelledby="listbox-label"
        onClick={toggleDropdown}
      >
        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <span className="block truncate">{selectedOption.type}</span>
        </span>
        <svg
          className="col-start-1 row-start-1 size-5 self-center justify-self-end text-white sm:size-4"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isDropdownOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          role="listbox"
          aria-labelledby="listbox-label"
        >
          {options.map((option) => (
            <li
              key={option.id}
              className="relative cursor-default select-none py-2 pl-3 pr-9 text-white"
              role="option"
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex items-center p-2 ">
                <span
                  className={`ml-3 block truncate ${
                    selectedOption.id === option.id
                      ? "font-semibold"
                      : "font-normal"
                  }`}
                >
                  {option.type}
                </span>
              </div>
              {selectedOption.id === option.id && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedToSelect;
