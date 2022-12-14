import axios from "axios";

export async function postSale(data: any) {
  try {
    const response = await axios.post("/api/createSale", data);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function findManySales() {
  try {
    const response = await axios.get("/api/findManySales");
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function findSaleDetails(id: any) {
  try {
    const response = await axios.get(`/api/findUniqueSale?id=${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateSale(data: any, id: string) {
  try {
    const { data } = await axios.patch(`/api/updateSale?id=${id}`);
    return data;
  } catch (error) {
    return error;
  }
}

