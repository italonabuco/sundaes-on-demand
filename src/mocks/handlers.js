import { rest } from "msw";
import { API_URL } from "../constants";

const apiUrl = (path) => `${API_URL}${path}`;

export const handlers = [
  rest.get(apiUrl("/scoops"), async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "/images/cholate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
];
