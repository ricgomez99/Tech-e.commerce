import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <div className="col-md-3" 
      style={{
        backgroundColor: "#F6FFF8", 
        width: "max-content",
        borderRadius: "10px",
        margin: "1vw"
      }}>
      <a
        className="btn btn-outline-dark" //Modify styles
        onClick={() => signIn("google")}
        role="button"
        style={{ 
          textTransform: "none",
          width: "18vw"         
        }}
      >
        <img
          width="20px"
          style={{ marginBottom: "3px", marginRight: "5px" }}
          alt="Google sign-in"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        />
        Login with Google
      </a>
    </div>
  );
};

