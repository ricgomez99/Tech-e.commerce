import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import { logInUser } from "../services/userEndPoints"
import SignInButton from "./signinbutton";
import { useScrollBlock } from "utils/scrollblock";
import Link from "next/link";
import { signIn } from "next-auth/react";


export default function SignInModal() {
  const [showModal, setShowModal] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (values: any) => {
    try{
      const user = await logInUser(values);
      // if(user){
      //   SignIn
      // }
      
    }catch(err){
      alert (err)
    }
 
  };

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
            <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object({
                email: yup.string().required("Email is required."),
                password: yup.string().required("Password is required"),
              })}
            onSubmit={handleSubmit}
          >
            <Form>
            <div>
                <Field
                  type="text"
                  name="email"
                  placeholder="user@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password..."
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
                <button type="submit" value="Login">Log In!</button>
            </Form>
            </Formik>
            </div>
            <SignInButton />
            <div>
            <Link href="/signup">
                Do not have an account? Register here!
            </Link>
          </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
