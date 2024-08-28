import { useSelector } from "react-redux";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import LinkButton from "../../UI/LinkButton";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const totalQuantity = useSelector(getTotalQuantity);

  if (!totalQuantity) return null;

  return (
    <div className="flex items-center bg-stone-800 px-7 py-3 text-stone-100 md:px-7 md:py-5">
      <p>
        <span>{`${totalQuantity} PIZZA${totalQuantity === 1 ? "" : "S"}`}</span>{" "}
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <div className="ml-[auto]">
        <LinkButton to="/cart" type="orangeRed">
          Open cart & Pay &rarr;
        </LinkButton>
      </div>
    </div>
  );
}

export default CartOverview;
