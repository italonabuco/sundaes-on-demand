import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import { API_URL } from "../../constants";
import AlertBanner from "../common/AlertBanner";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  //options type is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`${API_URL}/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  //TODO: replace null with ToppingOption when available
  const ItemComponet = optionType === "scoops" ? ScoopOption : ToppingOption;
  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponet key={name} {...{ name, imagePath }} />
  ));
  return <Row>{optionItems}</Row>;
}
