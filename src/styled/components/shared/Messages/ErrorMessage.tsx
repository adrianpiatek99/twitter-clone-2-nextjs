import React from "react";

import { Text } from "components/core";
import styled, { keyframes } from "styled-components";

interface ErrorMessageProps {
  title: string | undefined;
  text?: string;
}

export const ErrorMessage = ({ title, text }: ErrorMessageProps) => {
  if (!title) return null;

  return (
    <Wrapper>
      <Content>
        <Text size="xxl" weight={700}>
          {title} <br />
          (┛ಠ_ಠ)┛彡┻━┻
        </Text>
        {text && <Text color="secondary">{text}</Text>}
      </Content>
    </Wrapper>
  );
};

const enterAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 400px;
  padding: 40px 20px;
  margin: 32px auto;
  animation: ${enterAnimation} 0.3s ease-out;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    & > span:nth-child(1) {
      ${({ theme }) => theme.heading.s}
    }
  }
`;
