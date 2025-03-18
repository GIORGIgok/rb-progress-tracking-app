import { BASEURL } from "../../constants/base-url";
import { PRIORITIES } from "../../constants/endpoints";

export const getAllPriorities = async () => {
  const response = await fetch(`${BASEURL}/${PRIORITIES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKENEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch priorities");
  }

  return response.json();
};
