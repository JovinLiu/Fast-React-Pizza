import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="text-[1rem]">
      {username && "Hello "}
      {username}
    </div>
  );
}

export default Username;
