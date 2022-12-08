import withSession from "../../lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withSession(async (req: any, res: NextApiResponse) => {
  const user = req.session.get("user");

  if (user) {

    res.json({
      isLoggedIn: true,
      ...user,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});