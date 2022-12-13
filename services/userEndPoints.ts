import axios from "axios";

export async function createUser(data: any) {
  try {
<<<<<<< HEAD
    const response = await axios.post(
      "https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/createUsers",
      data
    );
=======
    const response = await axios.post("/api/createUsers", data);
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findManyUsers() {
  try {
<<<<<<< HEAD
    const response = await axios.get("https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findManyUsers");
=======
    const response = await axios.get("/api/findManyUsers");
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findUniqueUser(email: string) {
  try {
<<<<<<< HEAD
    const response = await axios.get(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findUniqueUser?email=${email}`
    );
=======
    const response = await axios.get(`/api/findUniqueUser?email=${email}`);
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateUser(data: any, id: string) {
  try {
<<<<<<< HEAD
    const response = await axios.patch(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/updateUser?id=${id}`,
      data
    );
=======
    const response = await axios.patch(`/api/updateUser?id=${id}`, data);
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logInUser(data: any) {
  try {
<<<<<<< HEAD
    const response = await axios.post(
      "https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/loginUser",
      data
    );
=======
    const response = await axios.post("/api/loginUser", data);
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
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
<<<<<<< HEAD
    const response = await axios.get(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findUserSales?id=${id}`
    );
=======
    const response = await axios.get(`/api/findUserSales?id=${id}`);
>>>>>>> 5c86a9d6d2bd00984a013b9c2b8d429f600b256c
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}
