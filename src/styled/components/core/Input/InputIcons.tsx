import React, { Dispatch, SetStateAction } from "react";

import EyeClosedIcon from "icons/EyeClosedIcon";
import EyeOpenIcon from "icons/EyeOpenIcon";
import WarningIcon from "icons/WarningIcon";
import styled from "styled-components";

import { IconButton } from "../IconButton";

interface InputIconsProps {
  isPasswordIcon: boolean;
  isPasswordVisible: boolean;
  setIsPasswordVisible: Dispatch<SetStateAction<boolean>>;
  error?: string;
}

export const InputIcons = ({
  isPasswordIcon,
  isPasswordVisible,
  setIsPasswordVisible,
  error
}: InputIconsProps) => {
  return (
    <IconsWrapper>
      {isPasswordIcon && (
        <IconButton
          title={isPasswordVisible ? "Hide password" : "Show password"}
          onClick={() => setIsPasswordVisible(prev => !prev)}
          disableFocus
        >
          {isPasswordVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </IconButton>
      )}
      {error && (
        <IconButton title={error} isError disableFocus>
          <WarningIcon />
        </IconButton>
      )}
    </IconsWrapper>
  );
};

const IconsWrapper = styled.div`
  position: absolute;
  display: flex;
  gap: 4px;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
`;
