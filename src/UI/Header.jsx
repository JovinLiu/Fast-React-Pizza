import { Link } from "react-router-dom";
// import Username from "../features/user/Username";
import SearchInput from "./SearchInput";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex flex-row items-center gap-9 border-b border-stone-100 bg-yellow-400 px-7 py-2 font-sans text-lg uppercase md:py-3">
      <Link
        to="/"
        className="text-[1rem] tracking-widest xxxs:text-[1rem] md:text-lg"
      >
        Fast React Pizza Co.
      </Link>
      <div className="ml-auto flex xxxs:flex-col xxxs:items-end xxs:flex-row xxs:items-center xxs:gap-3">
        <Username />
        <SearchInput />
      </div>
    </header>
  );
}

export default Header;
