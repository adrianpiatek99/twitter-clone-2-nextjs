import React, { useState } from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { CardActionArea } from "@mui/material";
import { useAppSession } from "hooks/useAppSession";
import { Avatar } from "shared/Avatar";
import { Skeleton } from "shared/Skeleton";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

import { NavSidebarProfileMenuModal } from "./NavSidebarProfileMenuModal";

export const NavSidebarProfile = () => {
  const { session, isSessionLoading, isUnauthenticated } = useAppSession();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const userScreenName = session?.user?.screen_name;

  if (isUnauthenticated) return null;

  if (isSessionLoading) {
    return (
      <Wrapper>
        <Inner>
          <Column>
            <Avatar src={""} loading={true} />
          </Column>
          <Column>
            <ColumnSkeletons>
              <Skeleton height={15} width={80} />
              <Skeleton height={15} width={85} />
            </ColumnSkeletons>
          </Column>
          <Column>
            <Skeleton height={5} width={15} />
          </Column>
        </Inner>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Inner onClick={() => setIsMenuModalOpen(true)}>
        <Column>
          <Avatar src={session?.user?.profile_image_url ?? ""} disableFocus />
        </Column>
        <Column>
          <UserName>{session?.user?.name}</UserName>
          <UserScreenName>{userScreenName && `@${userScreenName}`}</UserScreenName>
        </Column>
        <Column>
          <MoreHorizIcon />
        </Column>
      </Inner>
      <NavSidebarProfileMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 12px 0;
`;

const Inner = styled(CardActionArea)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  border-radius: 50px;
  padding: 12px;
  width: 100%;
  transition: background-color 0.2s;

  &:hover:not(:disabled),
  &:focus-visible {
    background-color: ${({ theme }) => hexToRGBA(theme.neutral00, 0.05)};
  }

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.neutral20} 0px 0px 0px 2px;
  }
`;

const Column = styled.div`
  &:nth-child(2),
  &:nth-child(3) {
    display: none;
  }

  @media ${({ theme }) => theme.breakpoints.xl} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;

    &:nth-child(2),
    &:nth-child(3) {
      display: flex;
    }

    &:nth-child(3) {
      align-items: flex-end;
      flex-grow: 1;

      & > svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const ColumnSkeletons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UserName = styled.span`
  font-weight: 700;
`;

const UserScreenName = styled.span`
  color: ${({ theme }) => theme.neutral100};
`;
