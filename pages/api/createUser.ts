import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcryptjs from "bcryptjs";

export default async function handlerCreateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
<<<<<<< HEAD
  const { email, password, name } = req.body;
  let passwordHash: any = await bcryptjs.hash(password, 8);
=======
  const { email, username } = req.body;

>>>>>>> 65ef5e42233b600bf2ff19a3f24211269f9c6b68
  try {
    const creation = await prisma.user.create({
      data: {
        email: email,
<<<<<<< HEAD
        password: passwordHash,
        name: name,
=======
        name: username,
>>>>>>> 65ef5e42233b600bf2ff19a3f24211269f9c6b68
      },
    });
    console.log(creation);
    return res.status(200).send(creation);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}
