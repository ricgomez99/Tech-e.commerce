import axios from "axios";

export async function postSale(data: any) {
  try {
    const response = await axios.post(
      "https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/createSale",
      data
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function findManySales() {
  try {
    const response = await axios.get("https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findManySales");
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function findSaleDetails(id: any) {
  try {
    const response = await axios.get(
      `https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/findUniqueSale?id=${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function updateSale(data:any, id: string) {
  try{
    const { data } = await axios.patch(`https://tech-e-commerce-2lbeoi1sk-ricgomez99.vercel.app/api/updateSale?id=${id}`);
    return data;
  } catch (error) {
    return error;
  }
}
