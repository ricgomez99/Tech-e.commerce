import axios from "axios";

export async function createUser(data: any) {
  try {
    const response = await axios.post("/api/createUsers", data);
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findManyUsers() {
  try {
    const response = await axios.get("/api/findManyUsers");
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findUniqueUser(email: string) {
  try {
    const response = await axios.get(`/api/findUniqueUser?email=${email}`);
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateUser(data: any, id: string) {
  try {
    const response = await axios.patch(`/api/updateUser?id=${id}`, data);
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logInUser(data: any) {
  try {
    const response = await axios.post("/api/loginUser", data);
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

// export async function handlerGetUniqueUsers(id: number) {
//   try {
//     const response = await axios.get(
//       `/api/databaseService?id=${id}`
//     );
//     return response.data;
//   } catch (error: any) {
//     return { error: error.message };
//   }
// }

export async function userSales(id: string) {
  try {
    const response = await axios.get(`/api/findUserSales?id=${id}`);
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}
