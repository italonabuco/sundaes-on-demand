import Col from "react-bootstrap/Col";
import { API_URL } from "../../constants";

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12}>
      <img src={`${API_URL}/${imagePath}`} alt={`${name} topping`} />
    </Col>
  );
}