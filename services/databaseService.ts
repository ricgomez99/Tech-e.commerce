import { prisma } from "lib/prisma";

export default async function handlerGetUniqueUsers() {
  const getUser = async (email: any): Promise<any> => {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
      },
    });
    if (!findUser) {
      throw new Error("User not found");
    }
    return findUser;
  };
  return { getUser };
}
// import knex from "knex";
// ({
//   client: "postgreSQL",
//   connection: {
//       host : process.env.DB_HOST,
//       port : 5432,
//       user : process.env.DB_USER,
//       password : process.env.DB_PASS,
//       database : process.env.DB,
//   }
// });

// export default function databaseServiceFactory() {
//   const TABLE = 'User';

//   const getUser = async (email: string) => {
//       const userEmail = await knex(TABLE).select().where('email', email);
//       if (userEmail.length === 0) {
//           throw new Error("User not found");
//       }
//       return userEmail[0];
//   };

//   return {getUser};
// };

// module.exports = {
//   databaseServiceFactory
// };
