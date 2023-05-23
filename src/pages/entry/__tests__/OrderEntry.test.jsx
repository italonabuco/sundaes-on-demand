import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { apiUrl } from "../../../constants";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get(apiUrl("/scoops"), (req, res, ctx) => res(ctx.status(500))),
    rest.get(apiUrl("/toppings"), (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
