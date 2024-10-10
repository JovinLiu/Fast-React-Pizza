import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import LinkButton from "./LinkButton";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <>
      <div className="z-10 my-10 px-4 text-center sm:my-16">
        <h1 className="space-y-10 py-12">
          <p className="text-center text-3xl font-semibold uppercase text-stone-800 xs:text-3xl sm:text-4xl md:text-4xl ">
            The best pizza
          </p>
          <p className="xs:text-md text-center text-xl font-bold text-yellow-500">
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
    </>
  );
}

export default Home;
