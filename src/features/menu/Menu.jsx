import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menuData = useLoaderData();

  return (
    <div>
      <ul className="divide-y-2 divide-stone-200">
        {menuData.map((item) => (
          <MenuItem pizza={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
