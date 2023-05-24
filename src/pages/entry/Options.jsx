import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import { API_URL, pricePerItem } from "../../constants";
import AlertBanner from "../common/AlertBanner";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  //options type is 'scoops' or 'toppings'
  useEffect(() => {
    // create an abortController to attach to network request
    // this avoid the testing error
    // Warning: An update to Options inside a test was not wrapped in act(...)
    const controller = new AbortController();
    axios
      .get(`${API_URL}/${optionType}`, { signal: controller.signal })
      .then((res) => setItems(res.data))
      .catch((error) => {
        //avoid error out on re-render
        if (error.name !== "CanceledError") {
          setError(true);
        }
      });

    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  //TODO: replace null with ToppingOption when available
  const ItemComponet = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponet key={name} {...{ name, imagePath }} />
  ));
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
