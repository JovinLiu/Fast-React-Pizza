import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="md:text-md xxxs:text-[0.7rem] xxs:text-xs xs:text-sm sm:text-md font-semibold lg:text-lg">
      {username && "Hello "}
      {username}
    </div>
  );
}

export default Username;
