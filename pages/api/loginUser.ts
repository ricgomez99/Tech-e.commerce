import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "lib/prisma";
import bcryptjs from "bcryptjs";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      res.status(400).send("This email is not registered in here");
    } else {
      if (user.password) {
        const validate = await bcryptjs.compare(password, user.password);
        if (!validate) res.status(400).send("Wrong password");
      } else res.status(200).send("User verified");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else return res.status(404).json({ message: "error not found" });
  }
}
