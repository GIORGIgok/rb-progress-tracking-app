import { BASEURL } from "../../constants/base-url";
import { DEPARTMENTS } from "../../constants/endpoints";

export const getAllDepartments = async () => {
  const response = await fetch(`${BASEURL}/${DEPARTMENTS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch departments");
  }

  return response.json();
};
