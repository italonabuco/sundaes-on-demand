import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  expect(termsCheckbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("Disabling then enabling button", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  //checking checkbox
  await user.click(termsCheckbox);
  expect(confirmButton).toBeEnabled();

  //unchecking checkbox
  await user.click(termsCheckbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullablePopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullablePopover).not.toBeInTheDocument();

  // popover appers on mouserover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);

  //expect to be in the document by using ´get´
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappers when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
