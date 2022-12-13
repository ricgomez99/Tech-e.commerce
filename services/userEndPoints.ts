import axios from "axios";

export async function createUser(data: any) {
  try {
    const response = await axios.post(
      "https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/createUsers",
      data
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findManyUsers() {
  try {
    const response = await axios.get("https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findManyUsers");
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function findUniqueUser(email: string) {
  try {
    const response = await axios.get(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findUniqueUser?email=${email}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateUser(data: any, id: string) {
  try {
    const response = await axios.patch(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/updateUser?id=${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function logInUser(data: any) {
  try {
    const response = await axios.post(
      "https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/loginUser",
      data
    );
    return response.data;
  } catch (error) {
    return error;
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
    const response = await axios.get(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findUserSales?id=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
