import { BASEURL } from "../../constants/base-url";
import { COMMENTS } from "../../constants/endpoints";

export async function addComment(taskId, text, parentId) {
  // console.log("Task ID:", taskId);
  const response = await fetch(`${BASEURL}/tasks/${taskId}/${COMMENTS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
      Credentials: "include",
    },
    body: JSON.stringify({
      text,
      task_id: taskId,
      parent_id: parentId || null,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }
  return await response.json();
}
