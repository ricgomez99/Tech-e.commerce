import React, { useState } from "react";
import SignInButton from "./signinbutton";

const SignInModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <a
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
          className="btn btn-outline-success me-2"
        >
          Sign In
        </a>
      </div>

      {showModal ? (
        <div className="divsote">
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
              }
              .divsito {
                margin: 40vh auto;
                background-color: white;
                width: 20vw;
              }
            `}
          </style>
          <div className="divsito">
            <div className="">
              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="btn-close p-3 mx-auto"
                aria-label="Close"
              ></button>
              <SignInButton />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SignInModal;
