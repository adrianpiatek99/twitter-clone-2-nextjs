import React from "react";

import Link from "next/link";
import { Skeleton } from "shared/Skeleton";
import styled, { css } from "styled-components";

type AvatarSize = "small" | "medium" | "large" | "extraLarge";

interface AvatarProps {
  src: string;
  onClick?: () => void;
  screenName?: string;
  size?: AvatarSize;
  loading?: boolean;
  disableFocus?: boolean;
}

export const Avatar = ({
  src,
  onClick,
  screenName,
  size = "medium",
  loading = false,
  disableFocus = false,
  ...props
}: AvatarProps) => {
  const avatarSize = determineSize(size);
  const href = screenName && `/${screenName}`;

  if (loading) {
    return <Skeleton absolute variant="circular" />;
  }

  const AvatarComponent = () => {
    return (
      <AvatarWrapper size={avatarSize} {...props}>
        <img
          src={
            src
              ? src
              : "https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"
          }
          alt={screenName ?? "Profile image"}
        />
      </AvatarWrapper>
    );
  };

  if (href) {
    return (
      <StyledLink href={href} onClick={onClick} tabIndex={disableFocus ? -1 : 0} {...props}>
        <AvatarComponent />
      </StyledLink>
    );
  }

  return (
    <AvatarButton
      as={onClick ? "button" : "div"}
      onClick={onClick}
      disabled={disableFocus}
      tabIndex={disableFocus || !onClick ? -1 : 0}
    >
      <AvatarComponent />
    </AvatarButton>
  );
};

const determineSize = (size: AvatarSize) => {
  if (size === "small") {
    return 32;
  }

  if (size === "large") {
    return 48;
  }

  if (size === "extraLarge") {
    return 68;
  }

  return 40;
};

const sharedStyles = css`
  position: relative;
  border-radius: 50%;

  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: rgba(0, 0, 0, 0.15);
    opacity: 0;
    border-radius: 50%;
    transition: opacity 0.2s ease;
  }

  @media (hover: hover) {
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.boxShadows.primary};
    &::after {
      opacity: 1;
    }
  }
`;

const StyledLink = styled(Link)`
  -webkit-user-drag: none;
  ${sharedStyles};
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${sharedStyles};

  &:disabled {
    pointer-events: none;
    cursor: default;
  }
`;

const AvatarWrapper = styled.div<{ size: number }>`
  position: relative;
  display: grid;
  place-items: center;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  transition: 0.2s;

  & > img {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: inherit;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
`;
