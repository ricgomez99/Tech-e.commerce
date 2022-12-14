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