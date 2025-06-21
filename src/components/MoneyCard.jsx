import Button from './Button';

export default function MoneyCard({
  title,
  money,
  buttonText,
  buttonType,
  handleClick,
  success = true,
}) {
  return (
    <div className="bg-[#9B9B9B] flex flex-col items-center justify-center text-center p-[45px_20px] rounded-[15px] shadow-md max-sm:p-[35px_10px]">
      <h3 className="text-white font-normal text-[30px] mb-[12px] max-sm:text-[24px]">
        {`${title}: `}
        <span className={success ? 'text-[#9DFF5B] font-bold' : 'text-[#F4BB4A] font-bold'}>
          ₹{money}
        </span>
      </h3>
      <Button handleClick={handleClick} style={buttonType}>
        {buttonText}
      </Button>
    </div>
  );
}
