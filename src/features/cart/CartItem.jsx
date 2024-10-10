import UpdateQuantity from "../../UI/UpdateQuantity";
import { formatCurrency } from "../../utils/helpers";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center gap-10 py-4 xxxs:gap-4 xxs:gap-6 xs:gap-8 sm:gap-10 md:py-5 lg:py-7">
      <p className="md:text-md text-sm font-bold">
        {quantity} &times; {name}
      </p>
      <div className="md:text-md ml-[auto] text-sm font-bold">
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateQuantity id={pizzaId} />
    </li>
  );
}
export default CartItem;
