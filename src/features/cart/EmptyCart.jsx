import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton";

function EmptyCart() {
  return (
    <div className="mt-2 flex flex-col items-start gap-10">
      <div>
        <LinkButton type="link" to="/menu">
          &larr; Back to menu
        </LinkButton>
      </div>

      <p className="text-lg">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
