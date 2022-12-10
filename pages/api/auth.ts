// import  databaseServiceFactory  from "services/databaseService";
// import  authServiceFactory  from "services/authService"
// import withSession from "../../lib/session";
// import { NextApiRequest, NextApiResponse } from "next";

// const dbService  = databaseServiceFactory();
// const authService = authServiceFactory();

// export default withSession( async (req: NextApiRequest,
//     res: NextApiResponse) => {
//     const ERROR_CREDENTIALS = "Invalid username and/or password";

//     // const method = req.method.toLowerCase();
//     const { email} = req.body;
//     // console.log("entro a auth.ts",email,password)
//     // if (method !== "post") {
//     //     return res.status(405).end(`Method ${req.method} Not Allowed`);
//     // }

//     try {
//         const userCredentials = await (await dbService).getUser(email);
//         if (await authService.validate(password, userCredentials.password) === true) {
//             await saveSession({email}, req);
//             res.status(200).json({email});
//             return;
//         }
//     } catch (error) {
//         console.log(error);
//     }
//     res.status(403).json({error: ERROR_CREDENTIALS});
// })

// async function saveSession(user:any, request:any) {
//     request.session.set("user", user);
//     await request.session.save();
//     console.log("entro a saveSession",user)
// }

// function getUser(email: any): any {
//     throw new Error("Function not implemented.");
// }
