import { TOKEN } from "../../constants/api-auth-token";
import { BASEURL } from "../../constants/base-url";
import { EMPLOYEES } from "../../constants/endpoints";

export const addEmployee = async (employeeData) => {
  const response = await fetch(`${BASEURL}/${EMPLOYEES}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: employeeData,
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
};
