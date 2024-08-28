import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="relative box-border grid h-screen grid-rows-[auto_1fr_auto] bg-stone-100 font-sans text-stone-700">
      {isLoading ? <Loader /> : ""}
      <Header />
      <div className="overflow-x-hidden overflow-y-scroll">
        <main className="m-[0_auto] w-[40rem] md:w-[48rem] lg:w-[56rem]">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
