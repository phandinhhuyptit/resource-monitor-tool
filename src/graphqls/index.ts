import {
  ApolloClient, NormalizedCacheObject,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Operation,
  NextLink,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities"
import { createUploadLink } from "apollo-upload-client";
// import { setContext } from "apollo-link-context";
import { onError } from '@apollo/link-error';
import { isLoggedInVar } from './cache'
// import { split, from } from "apollo-link";
// import { getMainDefinition } from "apollo-utilities";
import { cache } from "../graphqls/cache";
import { NotificationManager } from "react-notifications";



const httpLink = createUploadLink({
  uri: `http://115.73.222.226:9000/kompaql`,
  // uri: `https://cms-gateway.radaa.net/kompaql`,
});

const errorLink: any = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }, index) => {
      if (index === 0) {
        NotificationManager.error(message, "", 4000);
      }

      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    }
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = split(({ query }) => {
  const { kind } = getMainDefinition(query);
  return kind === "OperationDefinition";
}, httpLink);

const authLink = setContext(async () => {
  const accessToken = await localStorage.getItem("accessToken");
  const refreshToken = await localStorage.getItem("refreshToken");

  if (accessToken && refreshToken) {

    isLoggedInVar(true)
    return {
      headers: {
        "x-token": `Bearer ${accessToken || ""}`,
        "x-refresh-token": `Bearer ${refreshToken || ""}`,
      },
    };
  } else {
    return {
      headers: {},
    };
  }
});



export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: from([authLink, errorLink, link]),
  cache,
  connectToDevTools: true,
});
