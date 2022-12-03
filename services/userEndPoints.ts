import axios from "axios";

export async function createUser(data: any){
try {
    // console.log(data)
    // return await fetch("http//localhost:3000/api/create"), {
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     method: "POST"
    // }
  
  
    const response = await axios.post(
        "localhost:5432/api/create",
        data
      );
      console.log(response)
      return response.data;
} catch (error) {
    console.log(error)
}
}