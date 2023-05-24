import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";
import { apiUrl } from "../../constants";

export default function OrderSummary({ onOrder }) {
  const { totals, optionsCounts, resetOrder } = useOrderDetails();

  const handleConfirmOrder = () => {
    axios
      .post(apiUrl("/order"))
      .then((res) => {
        onOrder(res.data.orderNumber);
        resetOrder();
      })
      .catch((e) => {
        //TODO: handle error
        console.error(e);
      });
  };

  const scoopList = Object.entries(optionsCounts.scoops).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const toppingList = Object.entries(optionsCounts.toppings).map(([key]) => (
    <li key={key}>{key}</li>
  ));

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <h2>Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      <SummaryForm onOrder={handleConfirmOrder} />
    </div>
  );
}
