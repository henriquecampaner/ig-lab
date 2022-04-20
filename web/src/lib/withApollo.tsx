import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import {GetServerSidePropsContext, NextPage} from "next";

type ApolloClientContext = GetServerSidePropsContext;

const getApolloClient = (
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:3000/api",
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  });
};

const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};

export {withApollo, getApolloClient};
export type {ApolloClientContext};
