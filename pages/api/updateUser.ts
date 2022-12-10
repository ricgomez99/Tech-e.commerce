import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcryptjs from "bcryptjs"

export default async function handlerUpdateUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name, role, active } = req.body;
  const { id } = req.query;
  let hashed;
  // if(password){
  //   hashed = await bcryptjs.hash(password, 8)
  // }
  try {
    const user = await prisma.user.update({
     where: {id: id},
      data: {
        email: email,
        name: name,
        role: role,
        active: active
      },
    });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).json({ message: "It's not working" });
  }
}
