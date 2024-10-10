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
    <li className="relative flex items-start">
      <img
        src={imageUrl}
        alt={name}
        className={`h-32 p-2 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col gap-1 p-1">
        <div className="flex flex-row items-center gap-2">
          <p className="md:text-md text-sm font-bold xxxs:text-[0.8rem] xxs:text-[0.8rem] lg:text-lg">
            {name}
          </p>
          <div className="mt-[auto] font-normal">
            {!soldOut ? (
              <p className="sm:text-md inline-block bg-yellow-200 p-1 text-sm xxxs:text-[0.6rem] xxs:text-[0.8rem] xs:text-xs md:text-lg">
                {formatCurrency(unitPrice)}
              </p>
            ) : (
              <p className="sm:text-md md:text-md inline-block bg-gray-200 p-1 text-sm xxxs:text-[0.5rem] xxs:text-[0.6rem] xs:text-xs">
                Sold out
              </p>
            )}
          </div>
        </div>
        <p className="w-[12rem] text-wrap text-xs font-light italic text-stone-500 xxxs:w-[5rem] xxxs:text-[0.6rem] xxs:w-[8rem] xxs:text-[0.6rem] xs:w-[10rem] xs:text-xs sm:w-[15rem] md:w-[20rem] md:text-sm lg:w-[30rem]">
          {ingredients.join(", ")}
        </p>
      </div>
      <div className="xxxs: bottom-0 right-0 mb-4 ml-[auto] mr-5 mt-[auto] xxxs:absolute">
        {soldOut ? (
          ""
        ) : cart.some((item) => item.pizzaId === id) ? (
          <UpdateQuantity id={id} />
        ) : (
          <LinkButton type="secondary" onClick={handleClickAddItem}>
            <span className="text-md sm:text-md xxxs:text-[0.7rem] xxs:text-[0.8rem]">
              Add to Cart
            </span>
          </LinkButton>
        )}
      </div>
    </li>
  );
}

export default MenuItem;
