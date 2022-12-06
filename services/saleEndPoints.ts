import axios from "axios";

export async function postSale(data: any) {
    try {
        const response = await axios.post("http://localhost:3000/api/createSale", data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}