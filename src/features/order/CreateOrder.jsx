import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import LinkButton from "../../UI/LinkButton";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const { username, status, position, address, error } = useSelector(
    (state) => state.user,
  );
  const cart = useSelector((state) => state.shoppingCart.cart);
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const totalPrice = useSelector(getTotalPrice);
  const finalPrice = withPriority ? totalPrice * 1.2 : totalPrice;
  const navigation = useNavigation();

  const isLoadingAddress = status === "loading";
  const isSubmitting = navigation.state === "submitting";

  const formLabel = "text-md md:text-lg";

  const inputBarStyle =
    "h-9 md:h-11 w-[25rem] xxxs:w-[13rem] xxxs:mr-2 xxs:mt-0 sm:w-[28rem] xxs:w-[16rem] md:w-[35rem] lg:w-[42rem] rounded-full focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-70 px-5 py-2 text-md border-2";

  const formError =
    "absolute right-2 top-10 md:top-12 lg:top-14 w-[25rem] xxxs:w-[21.6rem] sm:w-[28rem] md:w-[35rem] lg:w-[42rem] rounded-lg bg-red-200 p-0.5 xl:p-1.5 text-xs md:text-sm text-red-800";

  function handleClickGetPosition(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 sm:px-2 lg:px-2">
      <h2 className="text-md mt-10 font-semibold sm:text-xl lg:text-2xl">{`Ready to order? Let's go!`}</h2>
      <Form
        method="POST"
        action="/order/new"
        className="mt-10 flex flex-col gap-14"
      >
        <div className="flex items-center">
          <label className={formLabel}>First Name</label>
          <div className="ml-[auto] ">
            <input
              type="text"
              name="customer"
              defaultValue={username}
              disabled={isSubmitting}
              className={inputBarStyle}
              required
            />
          </div>
        </div>

        <div className="relative flex items-center">
          <label className={formLabel}>Phone number</label>
          <div className="ml-[auto] flex flex-col">
            <input
              type="tel"
              name="phone"
              disabled={isSubmitting}
              required
              className={inputBarStyle}
            />
          </div>
          {formErrors?.phone && (
            <span className={formError}>{formErrors.phone}</span>
          )}
        </div>

        <div className="flex items-center">
          <label className={formLabel}>Address</label>
          <div className="relative ml-[auto]">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress || isSubmitting}
              defaultValue={address}
              required
              className={inputBarStyle}
            />
            {status === "error" && <span className={formError}>{error}</span>}
            <div className="absolute right-0 top-0 xxxs:mr-0">
              {!position.latitude && !position.longitude && (
                <LinkButton
                  condition={isLoadingAddress || isSubmitting}
                  onClick={handleClickGetPosition}
                  type="primary"
                >
                  Get Position
                </LinkButton>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 xxxs:flex-col sm:flex-row">
          <div className="mr-auto flex items-center gap-3">
            <input
              className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
              type="checkbox"
              name="priority"
              id="priority"
              value="true"
              disabled={isSubmitting}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="sm:text-md text-sm">
              Want to yo give your order priority?
            </label>
          </div>
          <div className="ml-[auto]">
            <LinkButton
              type="primary"
              condition={isLoadingAddress || isSubmitting}
            >
              {isSubmitting
                ? "Placing Order"
                : `Order now for ${formatCurrency(finalPrice)}`}
            </LinkButton>
          </div>
        </div>
        {/* {这里用一个隐藏的input，name改成cart（之后会成为data.cart），然后value通过JSON.stringify变成字符串} */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

export default CreateOrder;

export async function action({ request }) {
  console.log(request.formData);
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
