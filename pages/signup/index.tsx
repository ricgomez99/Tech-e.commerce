import SignIn from "../../components/signUp";
import { MdOutlineArrowBack } from "react-icons/md";
import Router from "next/router";
import style from "styles/product.module.css";

export default function SignUp(){ 
    return (
      <div>
        <MdOutlineArrowBack
            onClick={() => Router.back()}
            className={style.backBtn}
          />
      <SignIn />
      </div>
      )
}