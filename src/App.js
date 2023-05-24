import { useState } from "react";
import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

const STEP = {
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  COMPLETE: "complete",
};
function App() {
  const [step, setStep] = useState(STEP.IN_PROGRESS);
  const [orderNumber, setOrderNumber] = useState("");

  return (
    <Container>
      <OrderDetailsProvider>
        {step === STEP.IN_PROGRESS && (
          <OrderEntry onOrder={() => setStep(STEP.REVIEW)} />
        )}
        {step === STEP.REVIEW && (
          <OrderSummary
            onOrder={(orderNumber) => {
              setStep(STEP.COMPLETE);
              setOrderNumber(orderNumber);
            }}
          />
        )}
      </OrderDetailsProvider>
      {step === STEP.COMPLETE && (
        <OrderConfirmation
          orderNumber={orderNumber}
          onNewOrder={() => setStep(STEP.IN_PROGRESS)}
        />
      )}
    </Container>
  );
}

export default App;
