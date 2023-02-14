import React, { type ComponentPropsWithRef, type Ref, forwardRef, memo } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { Text } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import { useLikeTweetMutation } from "hooks/useLikeTweetMutation";
import { ActionCard } from "shared/ActionCard";
import { Avatar } from "shared/Avatar";
import styled from "styled-components";

import { TweetCellActions } from "./TweetCellActions";
import { TweetCellToolbar } from "./TweetCellToolbar";

interface TweetCellProps extends Omit<ComponentPropsWithRef<"article">, "id"> {
  isProfile?: boolean;
  start: number;
  tweetData: TweetData;
}

export const TweetCell = memo(
  forwardRef(({ tweetData, start, ...props }: TweetCellProps, ref: Ref<HTMLDivElement>) => {
    const { id, text, author, authorId } = tweetData;
    const { session } = useAppSession();
    const { screenName, profileImageUrl } = author;
    const isOwner = session?.user.id === authorId;
    const { handleLikeTweet, likeLoading, unlikeLoading, isLiked } = useLikeTweetMutation({
      tweetData
    });

    return (
      <TweetArticle
        tag="article"
        role="article"
        label="Tweet"
        href={`${screenName}/tweet/${id}`}
        {...props}
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${start}px)`
        }}
      >
        <Inner>
          <StyledAvatar src={profileImageUrl} screenName={screenName} size="large" />
          <RightColumn>
            <TweetCellActions tweetData={tweetData} isOwner={isOwner} />
            <Content>
              <TweetText>
                <Text truncate>{text}</Text>
              </TweetText>
              <TweetCellToolbar
                tweetData={tweetData}
                isLiked={isLiked}
                isLoading={likeLoading || unlikeLoading}
                handleLikeTweet={handleLikeTweet}
              />
            </Content>
          </RightColumn>
        </Inner>
      </TweetArticle>
    );
  })
);

const TweetArticle = styled(ActionCard)`
  border-bottom: 1px solid ${({ theme }) => theme.border};

  & > a {
    z-index: 1;
  }
`;

const Inner = styled.div`
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  transition: opacity 0.2s, transform 0.2s;
`;

const StyledAvatar = styled(Avatar)`
  align-self: flex-start;
  z-index: 1;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-top: 2px;
`;

const TweetText = styled.div`
  display: inline-block;
  width: 98%;
  max-height: 550px;
  white-space: pre-line;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  & > span {
    display: inline-block;
    white-space: pre-line;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;
