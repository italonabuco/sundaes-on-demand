import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function OrderConfirmation({ orderNumber, onNewOrder }) {
  return (
    <Container>
      <h1>Thank you!</h1>
      <h2>Your order number is {orderNumber}</h2>
      <h3>as per our terms and conditions, nothing will happen now</h3>
      <Button variant="primary" onClick={onNewOrder}>
        Create new order
      </Button>
    </Container>
  );
}
