import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="mr-[0.1rem] text-[0.95rem]">
      {username && "Hello "}
      {username}
    </div>
  );
}

export default Username;
