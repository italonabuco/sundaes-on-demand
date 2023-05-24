import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import SummaryForm from "./SummaryForm";

export default function OrderSummary() {
  const { totals, optionsCounts } = useOrderDetails;

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
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <SummaryForm />
    </div>
  );
}
