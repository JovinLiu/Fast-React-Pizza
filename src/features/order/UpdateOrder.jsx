import { useFetcher, useNavigation } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";
import LinkButton from "../../UI/LinkButton";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  const isUpdating = fetcher.state === "loading";

  if (order.priority) return null;

  return (
    <fetcher.Form method="PATCH">
      <div className="mt-3 text-right">
        <LinkButton type="primary" condition={isUpdating}>
          {isUpdating ? "Updating..." : "Make Priority"}
        </LinkButton>
      </div>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
