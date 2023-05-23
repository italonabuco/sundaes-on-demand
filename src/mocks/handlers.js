import { rest } from "msw";

const REST_API_URL = "http://localhost:3030";

const apiUrl = (path) => `${REST_API_URL}${path}`;

export const handlers = [
  rest.get(
    apiUrl("/scoops", (req, res, ctx) => {
      return res(
        ctx.json([
          { name: "Chocolate", imagePath: "/images/cholate.png" },
          { name: "Vanilla", imagePath: "/images/vanilla.png" },
        ])
      );
    })
  ),
];
