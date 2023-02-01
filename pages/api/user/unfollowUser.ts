import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "prisma/prisma";

export type UnfollowUserRequest = {
  followerId: string;
};

export const unfollowUserPath = "/api/user/unfollowUser";

const handler: NextApiHandler<NextApiError> = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({ error: "You are not authorized." });
  }

  if (req.method === "DELETE") {
    const { followerId } = req.query as UnfollowUserRequest;
    const userId = session.user.id;

    const unfollow = await prisma.follow.delete({
      where: {
        userId_followerId: {
          userId,
          followerId
        }
      }
    });

    if (!unfollow) {
      return res.status(404).send({ error: "Something went wrong then trying to unfollow user." });
    }

    return res.status(200).end();
  }

  return res.status(400).send({ error: "Bad request." });
};

export default handler;
