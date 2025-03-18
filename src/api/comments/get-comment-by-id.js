import { BASEURL } from "../../constants/base-url";
import { COMMENTS } from "../../constants/endpoints";

export async function getCommentsByTaskId(taskId) {
  const response = await fetch(`${BASEURL}/tasks/${taskId}/${COMMENTS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return await response.json();
}
