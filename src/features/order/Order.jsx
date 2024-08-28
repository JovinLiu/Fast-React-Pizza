import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  console.log(fetcher);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 sm:px-2 lg:px-2">
      <div className="mt-10 flex items-center gap-3 ">
        <h2 className="text-lg font-semibold md:text-2xl">
          Order #{id} Status
        </h2>
        <div className="ml-[auto]">
          {priority && (
            <span className="md:text-md rounded-full bg-red-500 px-2 py-1 text-sm font-semibold uppercase text-red-100">
              Priority
            </span>
          )}
        </div>
        <span className="md:text-md rounded-full bg-green-500 px-2 py-1 text-sm font-semibold uppercase text-green-100">
          {status} order
        </span>
      </div>

      <div className="md:text-md mt-10 flex w-full justify-between bg-gray-200 p-4 text-sm">
        <p className="font-semibold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="md:text-md  divide-y-2 text-sm">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find((pizza) => pizza.id === item.pizzaId)
                .ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="md:text-md flex w-full flex-col justify-between gap-4 bg-gray-200  p-4 text-sm">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <UpdateOrder order={order} />
    </div>
  );
}

export default Order;

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

//如何load data或者write data without moving to other pages（without Navigation）
//使用menu router的data，但是不去那边 useFetcher hook
