import { Link } from "react-router-dom";
// import Username from "../features/user/Username";
import SearchInput from "./SearchInput";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex flex-row items-center gap-9 border-b border-stone-100 bg-yellow-400 px-7 py-2 font-sans text-lg uppercase md:py-3">
      <Link
        to="/"
        className="xxxs:text-[0.7rem] xxs:text-xs xs:text-sm sm:text-md text-[0.7rem] tracking-widest md:text-lg"
      >
        Fast React Pizza Co.
      </Link>
      <SearchInput />
      <Username />
    </header>
  );
}

export default Header;
