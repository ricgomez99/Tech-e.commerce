// import { prisma } from "lib/prisma";

// export default async function handlerGetUniqueUsers() {
//   type JSONValue = {
//     email: string,
//     id: string
//   }

//    const getUser = async(id: string) => {
//     const findUser = await prisma.user.findUnique({
//       where: {
//         id: Number(id),
//       },
//       select: {
//         email: true
//       }
//     });
//     if(!findUser){
//       throw new Error("User not found");
//     }
//     return findUser;
//   }
//     return {getUser};
// }
import knex from "knex";
({
  client: "postgresql",
  connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB,
  }
});

export default function databaseServiceFactory() {
  const TABLE = 'user';

  const getUser = async (email: string) => {
      const userEmail = await knex(TABLE).select().where('email', email);
      if (userEmail.length === 0) {
          throw new Error("User not found");
      } 
      return userEmail[0];
  };

  return {getUser};
};

// module.exports = {
//   databaseServiceFactory
// };