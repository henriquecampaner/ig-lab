import {getSession, useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {NextPage, GetServerSideProps} from "next";

const Home: NextPage = () => {
  const {user} = useUser();
  return (
    <div>
      <h1>Hi</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/logout">logout</a>
    </div>
  );
};

export default Home;

export const getServerSideProps = withPageAuthRequired();
