import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();
  // render app
  const { unmount } = render(<App />);

  // find ice cream scoops and toppings
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  const cherrriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  // add ice cream scoops and toppings
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  await user.click(cherrriesCheckbox);

  // find and click order button
  const orderButton = screen.getByRole("button", { name: "Order ice cream" });
  await user.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByText("Order summary", { exact: false });
  expect(summaryHeading).toBeInTheDocument();

  const totalText = screen.getByText("Total: $", { exact: false });
  expect(totalText).toHaveTextContent("5.50");

  // accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  await user.click(termsCheckbox);
  await user.click(confirmButton);

  // confirm order number on confirmation page
  const orderNumberText = screen.getByText("Your order number is", {
    exact: false,
  });
  expect(orderNumberText).toHaveTextContent("1234");

  // click "new order" button on confirmation page
  const createNewOrderButton = screen.getByRole("button", {
    name: "Create new order",
  });
  await user.click(createNewOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  unmount();
  // do we need to await anything to avoid test errors?
});
