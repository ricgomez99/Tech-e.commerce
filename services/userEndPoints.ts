import axios from "axios";

export async function createUser(data: any) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/createUser",
      data
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findManyUsers() {
  try {
    const response = await axios.get("http://localhost:3000/api/findManyUsers");
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function findUniqueUser(id: number) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/findUniqueUser?id=${id}`
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateUser(data: any, id: any) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/updateUser?id=${id}`,
      data
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function logInUser(data: any){
  try {
    const response = await axios.post(
      "http://localhost:3000/api/loginUser",
      data
    );
    return response.data;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function userSales(id: any) {
  try {
    const response = await axios.get(`http://localhost:3000/api/findUserSales?id=${id}`)
    return response.data
  } catch(error: any){
    return {error: error.message};
  }
}