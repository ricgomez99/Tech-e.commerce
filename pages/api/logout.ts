import withSession from "../../lib/session";

export default withSession(async (req: any, res: any) => {
  req.session.destroy();
  res.redirect('/login');
});