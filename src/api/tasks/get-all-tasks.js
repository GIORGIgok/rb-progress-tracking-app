import { TOKEN } from "../../constants/api-auth-token";
import { TASKS } from "../../constants/endpoints";

export const getAllTasks = async () => {
  const response = await fetch(TASKS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};
