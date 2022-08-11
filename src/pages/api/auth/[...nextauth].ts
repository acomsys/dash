import NextAuth, { Awaitable, type NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { JWT } from "next-auth/jwt";
import { fixAccountFields } from "../../../helpers/AccountHelper";

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error;
    const details = {
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      grant_type: ['refresh_token'],
      refresh_token: token.refreshToken,
    };
    const formBody: string[] = [];
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + '=' + encodedValue);
    });
    const formData = formBody.join('&');
    const url = `${env.KEYCLOAK_BASE_URL}/token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formData,
    });
    const refreshedTokens = await response.json();
    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID,
      clientSecret: env.KEYCLOAK_CLIENT_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    })
  ],
  session: {
    strategy: 'database'
  },
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      account = fixAccountFields(account);
      if (account && user) {
        return true;
      } else {
        return '/unauthorized';
      }
    },
    async session({ session, token, user }) {
      if (token) {
        session.email = token.email;
        session.userId = token.sub;
        session.name = token.name;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
