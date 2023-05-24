import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Options from "./Options";
import Button from "react-bootstrap/Button";

export default function OrderEntry({ onOrder }) {
  const { totals } = useOrderDetails();
  const { scoops, toppings } = totals;
  return (
    <>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2 style={{ marginTop: 20 }}>
        Grand Total: {formatCurrency(scoops + toppings)}
      </h2>
      <Button variant="primary" onClick={onOrder}>
        Order ice cream
      </Button>
    </>
  );
}
