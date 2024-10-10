import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={(e) => handleSearchSubmit(e)} className="ml-[auto]">
      <input
        placeholder="Search Order #"
        onChange={(e) => setQuery(e.target.value)}
        className="h-7 w-40 rounded-full bg-yellow-100 px-5 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-70 sm:h-8 sm:w-40 md:h-10 md:w-60"
      />
    </form>
  );
}

export default SearchInput;
