import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiPizza, PiGift } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { BsSuitcase2 } from "react-icons/bs";

export default function TransactionCard({ details, handleDelete, handleEdit }) {
  return (
    <div className="border-b border-gray-500 pb-2 mb-6 flex flex-wrap items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="bg-gray-300 rounded-full p-2.5 text-xl">
          {details.category === "food" && <PiPizza />}
          {details.category === "entertainment" && <PiGift />}
          {details.category === "travel" && <BsSuitcase2 />}
        </div>
        <div>
          <h5 className="font-sans text-base font-normal text-black">{details.title}</h5>
          <p className="text-gray-500 text-base">{details.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <p className="text-yellow-400 font-bold">{`₹${details.price}`}</p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="p-3 rounded-xl bg-red-600 text-white shadow-md text-xl cursor-pointer"
            aria-label="Delete Transaction"
          >
            <IoMdCloseCircleOutline />
          </button>
          <button
            onClick={handleEdit}
            className="p-3 rounded-xl bg-yellow-400 text-white shadow-md text-xl cursor-pointer"
            aria-label="Edit Transaction"
          >
            <MdOutlineModeEdit />
          </button>
        </div>
      </div>
    </div>
  );
}
