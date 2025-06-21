import clsx from 'clsx';

export default function Button({
  children,
  handleClick,
  style = 'primary',
  shadow = false,
  type = 'button',
}) {
  const baseClasses =
    'font-bold text-base rounded-[15px] px-[30px] py-[12px] cursor-pointer border-0';

  const styleVariants = {
    primary: 'bg-[#F4BB4A] text-white',
    secondary: 'bg-[#E3E3E3] text-black font-normal w-fit',
    success: 'bg-gradient-to-r from-[#B5DC52] to-[#89E148] text-white',
    failure:
      'bg-gradient-to-r from-[#FF9595] via-[#FF4747] to-[#FF3838] text-white',
    default: 'bg-[#E3E3E3] text-black',
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        baseClasses,
        styleVariants[style] || styleVariants.default,
        shadow && 'shadow-md'
      )}
    >
      {children}
    </button>
  );
}
