import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

export default function Pagination({ updatePage, currentPage, totalPages }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      updatePage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (totalPages !== currentPage) {
      updatePage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`bg-[#F1F1F1] text-black w-[48px] h-[48px] flex items-center justify-center rounded-[15px] shadow-md text-[1.4rem] cursor-pointer disabled:opacity-50 max-sm:w-[42px] max-sm:h-[42px]`}
      >
        <IoIosArrowRoundBack />
      </button>

      <p className="bg-[#43967B] text-white w-[48px] h-[48px] flex items-center justify-center text-[1.6rem] rounded-[5px] shadow-md max-sm:w-[42px] max-sm:h-[42px] max-sm:text-[1.4rem]">
        {currentPage}
      </p>

      <button
        onClick={handleNext}
        disabled={totalPages === currentPage}
        className={`bg-[#F1F1F1] text-black w-[48px] h-[48px] flex items-center justify-center rounded-[15px] shadow-md text-[1.4rem] cursor-pointer disabled:opacity-50 max-sm:w-[42px] max-sm:h-[42px]`}
      >
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
}
