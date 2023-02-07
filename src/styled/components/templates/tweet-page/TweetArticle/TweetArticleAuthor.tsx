import React, { memo, useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton, Text } from "components/core";
import MoreHorizontalIcon from "icons/MoreHorizontalIcon";
import { Avatar } from "shared/Avatar";
import { TweetCellMenuModal } from "shared/TweetCell";
import styled from "styled-components";

interface TweetArticleAuthorProps {
  tweetData: TweetData;
  isOwner: boolean;
  handleDeleteTweet: () => void;
}

export const TweetArticleAuthor = memo(
  ({
    tweetData: {
      author: { name, screenName, profileImageUrl }
    },
    isOwner,
    handleDeleteTweet
  }: TweetArticleAuthorProps) => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    return (
      <Wrapper>
        <Content>
          <Avatar src={profileImageUrl} screenName={screenName} size="large" />
          <NamesWrapper>
            <Text weight={700} href={`/${screenName}`} truncate>
              {name}
            </Text>
            <Text color="secondary" href={`/${screenName}`} truncate>
              @{screenName}
            </Text>
          </NamesWrapper>
        </Content>
        {isOwner && (
          <Actions>
            <IconButton onClick={() => setIsMenuModalOpen(prev => !prev)} color="secondary">
              <MoreHorizontalIcon />
            </IconButton>
            <TweetCellMenuModal
              isOwner={isOwner}
              isOpen={isMenuModalOpen}
              onClose={() => setIsMenuModalOpen(false)}
              handleDeleteTweet={handleDeleteTweet}
            />
          </Actions>
        )}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.neutral300};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0px;
`;

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & * {
    width: 100%;
  }
`;

const Actions = styled.div`
  display: flex;
  align-self: start;
  margin: -8px -6px -8px;
`;
