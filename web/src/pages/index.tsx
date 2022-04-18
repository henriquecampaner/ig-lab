import {getSession, useUser} from "@auth0/nextjs-auth0";
import {GetServerSideProps} from "next";

const Login = () => {
  const {user} = useUser();

  return null;
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const session = getSession(req, res);

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/login",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
};