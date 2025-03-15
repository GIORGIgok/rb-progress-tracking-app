import { TOKEN } from "../../constants/api-auth-token";
import { BASEURL } from "../../constants/base-url";
import { STATUSES } from "../../constants/endpoints";

export const getAllStatuses = async () => {
  const response = await fetch(`${BASEURL}/${STATUSES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch statuses");
  }

  return response.json();
};
