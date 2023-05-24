import Col from "react-bootstrap/Col";
import { API_URL } from "../../constants";

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`${API_URL}/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
}
