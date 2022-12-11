import { withIronSession } from "next-iron-session";

export default function withSession(handler : any) {
  return withIronSession(handler, {
    password: String(process.env.SECRET_COOKIE_PASSWORD),
    cookieName: "Papitajpg_auth",
    cookieOptions: {      
      secure: process.env.NODE_ENV === "production",
    },
  });
}