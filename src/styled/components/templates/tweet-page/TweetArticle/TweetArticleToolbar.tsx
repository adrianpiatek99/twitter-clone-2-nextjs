import React, { memo, useState } from "react";

import type { TweetData } from "api/tweet/timelineTweets";
import { IconButton } from "components/core";
import { useAppSession } from "hooks/useAppSession";
import HeartIcon from "icons/HeartIcon";
import HeartOutlinedIcon from "icons/HeartOutlinedIcon";
import MessageIcon from "icons/MessageIcon";
import { ReplyTweetModal } from "shared/Modals";
import { setAuthRequiredModalOpen } from "store/slices/globalSlice";
import { useAppDispatch } from "store/store";
import styled, { useTheme } from "styled-components";

interface TweetArticleToolbarProps {
  handleLikeTweet: () => void;
  tweetData: TweetData;
  isLoading: boolean;
  isLiked: boolean;
}

export const TweetArticleToolbar = memo(
  ({ handleLikeTweet, tweetData, isLoading, isLiked }: TweetArticleToolbarProps) => {
    const { isUnauthenticated } = useAppSession();
    const dispatch = useAppDispatch();
    const { pink400 } = useTheme();
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const likeTitle = isLiked ? "Unlike" : "Like";

    const handleOpenReplyModal = () => {
      if (isUnauthenticated) {
        return dispatch(setAuthRequiredModalOpen(true));
      }

      setIsReplyModalOpen(prev => !prev);
    };

    return (
      <Wrapper>
        <IconButton onClick={handleOpenReplyModal} color="secondary">
          <MessageIcon />
        </IconButton>
        <IconButton
          title={likeTitle}
          onClick={handleLikeTweet}
          color={pink400}
          isSelected={isLiked}
          disabled={isLoading}
        >
          {isLiked ? <HeartIcon /> : <HeartOutlinedIcon />}
        </IconButton>
        <ReplyTweetModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          tweetData={tweetData}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 425px;
  width: 100%;
  margin: 0 auto;
  gap: 12px;
  z-index: 1;
`;
