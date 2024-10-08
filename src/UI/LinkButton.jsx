import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, type, to, onClick, condition = false }) {
  const navigate = useNavigate();

  const baseStyles = " rounded-full uppercase transition-all duration-300";

  const buttonDisabled =
    "md:py-3 py-2 md:px-5 px-3 mr-2 text-sm text-slate-500 bg-slate-300 hover:bg-slate-300 rounded-full uppercase";

  const styles = {
    primary:
      "md:py-3 py-2 md:px-5 px-3 bg-yellow-400 hover:bg-yellow-200 font-semibold text-sm xxxs:text-[0.8rem] xxxs:mr-2" +
      baseStyles,
    secondary:
      "xxxs:text-[0.6rem] xxxs:h-8 md:h-9 md:py-2 py-1.5 md:px-4 px-2 bg-yellow-400 hover:bg-yellow-200 text-sm font-semibold" +
      baseStyles,
    link: "text-md text-blue-500 hover:text-blue-600 hover:underline",
    round:
      "xxxs:text-[0.6rem] bg-yellow-400 hover:bg-yellow-200 text-sm font-semibold xxxs:h-8 xxxs:w-8 md:h-9 h-8 md:w-9 w-8" +
      baseStyles,
    orangeRed:
      "py-2 px-4 sm:px-2 sm:py-3 bg-red-700 text-sm sm:text-md md:text-md hover:bg-orange-600" +
      baseStyles,
    lightGrey:
      "md:py-3 py-2 md:px-5 px-3 ring ring-inset ring-2 ring-gray-300 hover:bg-gray-300 font-semibold text-gray-500 text-sm" +
      baseStyles,
  };

  if (to === "/menu")
    return (
      <button onClick={() => navigate(to)} className={styles[type]}>
        {children}
      </button>
    );

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button
      className={`${condition ? buttonDisabled : styles[type]}`}
      onClick={onClick}
      disabled={condition}
    >
      {children}
    </button>
  );
}

export default LinkButton;

//
