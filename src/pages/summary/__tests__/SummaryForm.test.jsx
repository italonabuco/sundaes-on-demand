import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

// checkbox name: I agree to Terms and Conditions
// button name: Confirm order

test("Initial conditions", () => {
  render(<SummaryForm />);
  const termsCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  expect(termsCheckbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("Disabling then enabling button", () => {
  render(<SummaryForm />);
  const termsCheckbox = screen.getByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  //checking checkbox

  fireEvent.click(termsCheckbox);
  expect(confirmButton).toBeEnabled();

  //unchecking checkbox
  fireEvent.click(termsCheckbox);
  expect(confirmButton).toBeDisabled();
});
