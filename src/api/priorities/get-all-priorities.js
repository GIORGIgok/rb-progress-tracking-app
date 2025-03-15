import { TOKEN } from "../../constants/api-auth-token";
import { BASEURL } from "../../constants/base-url";
import { PRIORITIES } from "../../constants/endpoints";

export const getAllPriorities = async () => {
  const response = await fetch(`${BASEURL}/${PRIORITIES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch priorities");
  }

  return response.json();
};
