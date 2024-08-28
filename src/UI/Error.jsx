import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  console.log(error);

  return (
    <div className="mt-2 flex flex-col items-start gap-10">
      <h1>Something went wrong 😢</h1>
      <p className="text-lg">{error.data}</p>
      <p className="text-lg">{error.message}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
