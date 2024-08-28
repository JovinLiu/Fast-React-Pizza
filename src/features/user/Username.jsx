import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="md:text-md text-xs font-semibold lg:text-lg">
      {username && "Hello "}
      {username}
    </div>
  );
}

export default Username;
