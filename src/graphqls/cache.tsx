import { InMemoryCache, makeVar } from "@apollo/client";
import { defaultSetting } from "./initState";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        setting() {
          return settingVar();
        },
        user: {
          read() {
            return userVar();
          },
        },
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});

export const settingVar = makeVar(defaultSetting);
export const userVar = makeVar(null);
export const isLoggedInVar = makeVar<boolean>(
  !!localStorage.getItem("accessToken")
);
