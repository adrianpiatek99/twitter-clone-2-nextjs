// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from "@prisma/client";
import { UserData } from "api/user/userByScreenName";

declare module "next-auth" {
  interface Session {
    user: UserData;
    expires: string;
  }
}
