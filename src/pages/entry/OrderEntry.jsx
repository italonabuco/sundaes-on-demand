import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const { scoops, toppings } = totals;
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(scoops + toppings)}</h2>
    </>
  );
}
