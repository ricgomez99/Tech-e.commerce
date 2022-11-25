import React, {useState} from "react";

const SignInModal = () => {
  
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
    <div>
      <h6 onClick={() => setShowModal(true)}>SignIn</h6>
    </div>

    {showModal ? (
      <div className="divsote">
        <style jsx>{`
        .divsote {
          background-color:rgba(0, 0, 0, 0.5);
          height: 100vh;
          width: 100vw;
          position: fixed;
          top:0;
          left:0;
          backdrop-filter: blur(4px);
        }
        .divsito {
          margin:40vh auto;
          background-color: white;
          width:20vw;
        }
        `}
        </style>
        <div className="divsito">
        <div>SignIn Modal</div>
        <div>SignIn Modal</div>
        <div>SignIn Modal</div>
        <button onClick={() => setShowModal(false)}>Close</button>
        </div>
</div>
    ) : null }
    </>
  )
}

export default SignInModal;