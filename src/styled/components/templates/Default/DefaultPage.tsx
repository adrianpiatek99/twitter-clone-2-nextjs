import React from "react";
import { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { Button, LinearProgress } from "components/core";
import { Logo } from "shared/Logo";
import { Tab, TabGroup } from "shared/Tabs";
import { useAppSelector } from "store/store";
import styled from "styled-components";

import { DefaultBackgroundGif } from "./DefaultBackgroundGif";
import { DefaultCurrentTab } from "./DefaultCurrentTab";
import { DefaultExternalLinks } from "./DefaultExternalLinks";

export type DefaultTabs = "sign in" | "sign up";

const tabs: DefaultTabs[] = ["sign in", "sign up"];

export const DefaultPageTemplate = () => {
  const { formLoading } = useAppSelector(state => state.pages.defaultPage);
  const [currentTab, setCurrentTab] = useState<DefaultTabs>(tabs[0]);

  const handleChangeTab = (tab: DefaultTabs) => setCurrentTab(tab);

  return (
    <Wrapper>
      <LeftPanel>
        <DefaultBackgroundGif withBlur />
        <Content>
          {formLoading && <LinearProgress />}
          <Header>
            <Logo size="xl" />
          </Header>
          <TabGroupWrapper>
            <TabGroup
              variant="fullWidth"
              value={currentTab}
              onChange={(_, tab: DefaultTabs) => handleChangeTab(tab)}
            >
              {tabs.map(tab => (
                <Tab key={tab} label={tab} value={tab} />
              ))}
            </TabGroup>
          </TabGroupWrapper>
          <DefaultCurrentTab currentTab={currentTab} handleChangeTab={handleChangeTab} />
          <Button variant="outlined" color="secondary" startIcon={<GoogleIcon />} disabled>
            Sign in with Google
          </Button>
        </Content>
      </LeftPanel>
      <RightPanel>
        <DefaultBackgroundGif />
      </RightPanel>
      <DefaultExternalLinks />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100vh;

  @media ${({ theme }) => theme.breakpoints.lg} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LeftPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  @media ${({ theme }) => theme.breakpoints.sm} {
    justify-content: center;
    padding: 12px;
  }
`;

const RightPanel = styled(LeftPanel)`
  display: none;

  @media ${({ theme }) => theme.breakpoints.lg} {
    position: relative;
    display: flex;

    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 200px;
      background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.7) 100%);
      z-index: -1;
    }
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: calc(352px + 2 * 32px);
  gap: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 32px;
  overflow: hidden;

  @media ${({ theme }) => theme.breakpoints.sm} {
    border-radius: 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const TabGroupWrapper = styled.div`
  background: ${({ theme }) => theme.background};
`;
