type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  hasNext = currentPage < totalPages,
  hasPrev = currentPage > 1,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 p-5">
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className="px-8 py-2 rounded-md bg-cyan-700 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-cyan-700 disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-base text-black mt-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="px-8 py-2 rounded-md bg-cyan-700 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-cyan-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
