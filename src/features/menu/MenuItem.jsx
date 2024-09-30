import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { addItem } from "../cart/cartSlice";
import UpdateQuantity from "../../UI/UpdateQuantity";
import LinkButton from "../../UI/LinkButton";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((state) => state.shoppingCart.cart);

  function handleClickAddItem() {
    const selectedPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(selectedPizza));
  }

  return (
    <li className="relative flex items-center">
      <img
        src={imageUrl}
        alt={name}
        className={`h-32 p-2 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col gap-1 p-2">
        <p className="xxxs:text-[0.8rem] xxs:text-[0.8rem] md:text-md text-sm font-bold lg:text-lg">
          {name}
        </p>
        <p className="xs:w-[10rem] xs:text-xs xxs:text-[0.6rem] xxxs:text-[0.6rem] xxs:w-[8rem] xxxs:w-[5rem] w-[12rem] text-wrap text-xs font-light italic text-stone-500 sm:w-[15rem] md:w-[20rem] md:text-sm lg:w-[30rem]">
          {ingredients.join(", ")}
        </p>
        <div className="mt-[auto] font-normal">
          {!soldOut ? (
            <p className="xs:text-xs xxs:text-[0.6rem] xxxs:text-[0.5rem] sm:text-md md:text-md inline-block bg-yellow-200 p-1 text-sm">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="sm:text-md md:text-md xs:text-xs xxs:text-[0.6rem] xxxs:text-[0.5rem] inline-block bg-gray-200 p-1 text-sm">
              Sold out
            </p>
          )}
        </div>
      </div>
      <div className="xxxs:absolute xxxs: xxxs: bottom-0 right-0 mb-4 ml-[auto] mr-5 mt-[auto]">
        {soldOut ? (
          ""
        ) : cart.some((item) => item.pizzaId === id) ? (
          <UpdateQuantity id={id} />
        ) : (
          <LinkButton type="secondary" onClick={handleClickAddItem}>
            Add to Cart
          </LinkButton>
        )}
      </div>
    </li>
  );
}

export default MenuItem;
