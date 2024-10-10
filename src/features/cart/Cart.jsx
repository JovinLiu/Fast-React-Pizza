import CartItem from "./CartItem";
import LinkButton from "../../UI/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "../cart/EmptyCart";

function Cart() {
  const cart = useSelector((state) => state.shoppingCart.cart);
  const userName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleClickClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 sm:px-2 lg:px-2">
      <div className="mt-2">
        <LinkButton type="link" to="/menu">
          &larr; Back to menu
        </LinkButton>
      </div>

      <h2 className="text-md mt-5 px-4 font-semibold sm:px-2 sm:text-lg md:mt-10 md:text-2xl lg:px-0">
        Your cart, {userName}
      </h2>
      <ul className="mt-3 divide-y-2 divide-stone-200 border-b-2 border-stone-200 px-4 sm:px-2 md:mt-10 lg:px-0">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mr-4 mt-3 flex items-center gap-5 xxxs:mr-1 sm:mr-2 md:mt-5">
        <div className="ml-[auto]">
          <LinkButton type="lightGrey" onClick={handleClickClearCart}>
            Clear cart
          </LinkButton>
        </div>
        <LinkButton type="primary" to="/order/new">
          Order pizzas
        </LinkButton>
      </div>
    </div>
  );
}

export default Cart;
