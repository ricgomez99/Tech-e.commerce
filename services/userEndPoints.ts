import axios from "axios";

export async function createUser(data: any) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/createUser",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function findManyUsers() {
  try {
    const response = await axios.get("http://localhost:3000/api/findManyUsers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function findUniqueUser(id: number) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/findUniqueUser?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id: number, data: any) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/updateUser?id=${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
