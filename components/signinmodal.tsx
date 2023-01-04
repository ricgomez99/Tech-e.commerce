import React, { useState } from "react";
import SignInButton from "./signinbutton";
import { useScrollBlock } from "utils/scrollblock";
import Link from "next/link";
import { signIn } from "next-auth/react";
import styles from "../styles/signInModal.module.css";

export default function SignInModal() {
  const [showModal, setShowModal] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email,
      password: password,
    });
  };

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            setShowModal(true);
            blockScroll();
          }}
          className={styles.signInBtn}
        >
          Sign In
        </button>
      </div>

      {showModal ? (
        <div
          className={styles.divsote}
          onClick={() => {
            setShowModal(false);
            allowScroll();
          }}
        >
          <div className={styles.divsito} onClick={(e) => e.stopPropagation()}>
            <div className={styles.info}>
              {
                <form onSubmit={handleSubmit}>
                  <div className={styles.inputs}>
                    <label className={styles.label}>
                      <b>Email</b>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      required
                      onChange={emailHandler}
                      className={styles.userInput}
                    />

                    <label className={styles.label}>
                      <b>Password</b>
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      required
                      onChange={passwordHandler}
                      className={styles.userInput}
                    />

                    <button type="submit" className={styles.submit}>
                      Log In
                    </button>
                  </div>
                </form>
              }
              <div className={styles.signContainer}>
                <SignInButton />
              </div>
            </div>
            <div className={styles.register}>
              <p>
                Do not have an account?
                <Link href="/signup" className={styles.link}>
                  Register here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
