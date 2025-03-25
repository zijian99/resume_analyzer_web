import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  padding-top: 8vh ; /* Should match or be slightly larger than navbar height */
`;

export {
    LayoutContainer,
    MainContent,
}; 