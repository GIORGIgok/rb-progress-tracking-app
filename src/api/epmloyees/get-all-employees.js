import { TOKEN } from "../../constants/api-auth-token";
import { BASEURL } from "../../constants/base-url";
import { EMPLOYEES } from "../../constants/endpoints";

export const getAllEmployees = async () => {
  const response = await fetch(`${BASEURL}/${EMPLOYEES}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
};
