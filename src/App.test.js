import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading app name", () => {
  render(<App />);

  const header = screen.getByRole("heading", { level: 1 });
  expect(header).toHaveTextContent("Sundaes on Demand");
});
