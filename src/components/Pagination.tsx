import { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange?: (page: number) => void;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPageChange,
  hasNext = currentPage < totalPages,
  hasPrev = currentPage > 1,
}: PaginationProps) {
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleCurrentPageClick = () => {
    if (onPageChange) {
      setIsEditingPage(true);
      setEditValue(currentPage.toString());
    }
  };

  const handleCurrentPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNumber = parseInt(editValue);
    if (pageNumber >= 1 && pageNumber <= totalPages && onPageChange) {
      onPageChange(pageNumber);
    }
    setIsEditingPage(false);
    setEditValue("");
  };

  const handleCurrentPageBlur = () => {
    setIsEditingPage(false);
    setEditValue("");
  };

  return (
    <div className="flex justify-center gap-4 p-5">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="px-3.5 py-2 sm:px-6 sm:py-2 md:px-8 text-sm md:text-base rounded-md bg-cyan-700 text-white font-bold transition duration-200 hover:bg-white hover:-translate-y-1 hover:text-black border-2 border-transparent hover:border-cyan-700 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-base text-black mt-2">
        Page{" "}
        {isEditingPage ? (
          <form onSubmit={handleCurrentPageSubmit} className="inline">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleCurrentPageBlur}
              autoFocus
              className="w-12 px-1 text-center text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </form>
        ) : (
          <span
            onClick={handleCurrentPageClick}
            className={`${
              onPageChange ? "cursor-pointer underline hover:text-cyan-700" : ""
            }`}
            title={onPageChange ? "Click to edit page number" : ""}
          >
            {currentPage}
          </span>
        )}{" "}
        of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-3.5 py-2 sm:px-6 sm:py-2 md:px-8 text-sm md:text-base rounded-md bg-cyan-700 text-white font-bold transition duration-200 hover:bg-white hover:-translate-y-1 hover:text-black border-2 border-transparent hover:border-cyan-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
