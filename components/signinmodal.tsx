import React, { useState } from "react";
import SignInButton from "./signinbutton";
import { useScrollBlock } from "utils/scrollblock";
import Link from "next/link";

export default function SignInModal() {
  const [showModal, setShowModal] = useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

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
          <div>
            <Link href="/signup">
              Do not have an account? Register here!
            </Link>
          </div>
          <div className="divsito" onClick={(e) => e.stopPropagation()}>
            <SignInButton />
          </div>
        </div>
      ) : null}
    </>
  );
}
