import { TOKEN } from "../../constants/api-auth-token";
import { TASKS } from "../../constants/endpoints";

export const createNewTask = async (taskData) => {
  const response = await fetch(`${TASKS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return await response.json();
};
