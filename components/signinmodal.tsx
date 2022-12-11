import React, { useState } from "react";
// import SignInButton from "./signinbutton";
import SignInButton from "./signinbutton";
import { useScrollBlock } from "utils/scrollblock";
import Link from "next/link";

// import useUser from "../lib/useUser";

export default function SignInModal() {

  const [showModal, setShowModal] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     console.log(email,password)
    //     try {
    //         mutateUser(
    //             await userService.login(email, password)
    //         );
    //     } catch (error:any) {
    //         alert(error.response.data.error);
    //     }
        
    // };

    // const emailHandler =  (e:any) => {
    //     setEmail(e.target.value);
    // }

    // const passwordHandler =  (e:any) => {
    //     setPassword(e.target.value);
    // }

  return (
    <>
      <div>
        <a
          onClick={() => {
            setShowModal(true);
            blockScroll();
          } }
          style={{ cursor: "pointer" }}
          className="btn btn-outline-success me-2"
        >
          Sign In
        </a>
      </div>

      {showModal ? (
        <div className="divsote"
          onClick={() => {
            setShowModal(false);
            allowScroll();
          } }>
          <style jsx>
            {`
              .divsote {
                background-color: rgba(0, 0, 0, 0.5);
                height: 100vh;
                width: 100vw;
                position: fixed;
                top: 0;
                left: 0;
                backdrop-filter: blur(4px);
                z-index: 10;
              }
              .divsito {
                margin: 40vh auto;
                display: flex;
                background-color: #A4C3B2;
                flex-direction: column;
                width: 20vw;
                border-radius: 15px;
              }
            `}
          </style>
          <div className="divsito" onClick={(e) => e.stopPropagation()}>
          <div>
        {/* {<form onSubmit={handleSubmit}>
  

                        <div>
                            <label><b>Email</b></label>
                            <input type="email" placeholder="Enter Email" name="email" required
                                onChange={emailHandler}/>

                            <label><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="password" required
                                onChange={passwordHandler}/>

                            <button type="submit">Log In</button>
                        </div>
                </form>} */}
    </div>
            <SignInButton />
            {/* <div>
            <Link href="/signup">
                Do not have an account? Register here!
            </Link>
          </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
