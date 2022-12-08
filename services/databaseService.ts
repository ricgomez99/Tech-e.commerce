import { prisma } from "lib/prisma";

export default async function handlerGetUniqueUsers() {

   const user = async(id: string) => {
    const findUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        email: true
      }
    });
    
  }
    
}