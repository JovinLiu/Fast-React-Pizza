import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  getCurrentQuantityById,
} from "../features/cart/cartSlice";
import LinkButton from "./LinkButton";

function UpdateQuantity({ id }) {
  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));

  function handleClickDelete() {
    dispatch(deleteItem(id));
  }

  function handleClickIncrease() {
    dispatch(increaseItemQuantity(id));
  }

  function handleClickDecrease() {
    dispatch(decreaseItemQuantity(id));
  }

  return (
    <div className="flex items-center gap-6 xxxs:items-center xxxs:gap-2 xxs:gap-4">
      <div className="flex items-center gap-2 xxxs:gap-2 xxs:gap-2">
        <LinkButton type="round" onClick={handleClickDecrease}>
          <span className="text-md sm:text-md xxxs:text-[0.7rem] xxs:text-[0.8rem]">
            -
          </span>
        </LinkButton>
        <span className="font-bold xxxs:text-[0.7rem] xxs:text-[0.8rem]">
          {currentQuantity}
        </span>
        <LinkButton type="round" onClick={handleClickIncrease}>
          <span className="text-md sm:text-md xxxs:text-[0.7rem] xxs:text-[0.8rem]">
            +
          </span>
        </LinkButton>
      </div>
      <LinkButton type="secondary" onClick={handleClickDelete}>
        <span className="text-md sm:text-md xxxs:text-[0.7rem] xxs:text-[0.8rem]">
          Delete
        </span>
      </LinkButton>
    </div>
  );
}

export default UpdateQuantity;
