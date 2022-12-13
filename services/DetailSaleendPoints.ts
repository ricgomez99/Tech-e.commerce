import axios from "axios";

export async function createDetailSale(data: any) {
  try {
    const response = await axios.post(
      "https://tech-e-commerce.vercel.app/api/createDetailSale",
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
