import SignIn from "../../components/signUp";
import { MdOutlineArrowBack } from "react-icons/md";
import Router from "next/router";
import style from "styles/product.module.css";
import styledSignUp from "../../styles/signUp.module.css";

export default function SignUp() {
  return (
    <div className={styledSignUp.main}>
      <MdOutlineArrowBack
        onClick={() => Router.back()}
        className={style.backBtn}
      />
      <SignIn />
    </div>
  );
}
