import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import LinkButton from "../../UI/LinkButton";

function CreateUser() {
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleUpdateName(e) {
    e.preventDefault();
    dispatch(updateName(username));
    setUsername("");
    navigate("/menu");
  }

  return (
    <form onSubmit={handleUpdateName} className="space-y-7">
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="h-10 rounded-full border-2 px-5 transition-all duration-300 focus:border-0 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-70"
      />

      {username !== "" && (
        <div>
          <LinkButton type="primary">Start ordering</LinkButton>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
