import { getSession, signIn } from "next-auth/react";

export default function SignInModal({ session }: any) {
  return (
    <div className="row">
      <div className="col-md-3">
        <a
          className="btn btn-outline-dark"
          onClick={() => signIn("google")}
          role="button"
          style={{ textTransform: "none" }}
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
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  // if (session)
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  return {
    props: {
      session,
    },
  };
};
