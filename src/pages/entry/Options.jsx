import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";
import { API_URL } from "../../constants";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  //options type is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`${API_URL}/${optionType}`)
      .then((res) => setItems(res.data))
      .catch((error) => {
        //TODO: handle error response
      });
  }, [optionType]);

  //TODO: replace null with ToppingOption when available
  const ItemComponet = optionType === "scoops" ? ScoopOption : null;
  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponet key={name} {...{ name, imagePath }} />
  ));
  return <Row>{optionItems}</Row>;
}
