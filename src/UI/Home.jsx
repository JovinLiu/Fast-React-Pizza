import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import LinkButton from "./LinkButton";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div>
      <h1 className="space-y-10 py-12">
        <p className="text-center text-4xl font-semibold uppercase text-stone-800">
          The best pizza
        </p>
        <p className="text-center text-xl font-bold text-yellow-500 ">
          Straight out of the oven, straight to you.
        </p>
      </h1>
      <div className="text-center">
        {username ? (
          <LinkButton
            to={"/menu"}
            type="primary"
          >{`Continue Ordering ${username}`}</LinkButton>
        ) : (
          <CreateUser />
        )}
      </div>
    </div>
  );
}

export default Home;
