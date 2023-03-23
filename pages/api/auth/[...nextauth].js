import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "../db";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "id-password-credential",
      credentials: {
        NAME: { label: "ID", type: "id", placeholder: "e@mail.com" },
        PASS: { label: "Password", type: "password", placeholder: "password" },
      },
      //인증
      async authorize(credentials) {
        const user = await executeQuery("select name,PASS from TBL_USER where name = ?", credentials.NAME);
        if (!user) {
          // Not Found
          throw new Error("일치하는 회원이 없습니다.");
        }
        if (user[0].PASS === credentials.PASS) {
          // Sign in Success
          return user[0];
        } else {
          // Wrong Password
          throw new Error("패스워드가 틀렸습니다.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      const exUser = await executeQuery("select ID from TBL_USER where name = ?", session.user.name);

      // 로그인한 유저 데이터 재정의
      // 단, 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요함
      session.user = exUser;

      // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
      return session;
    },
  },
});
