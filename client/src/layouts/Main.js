import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Main = ({ children }) => {
  return (
    <Container>
      <NoExpand>
        <Header />
      </NoExpand>
      <Expand>{children}</Expand>
      <NoExpand>
        <Footer />
      </NoExpand>
    </Container>
  );
};
export default Main;
const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100vh;
`;

const Expand = styled.main`
  flex-grow: 1;
`;

const NoExpand = styled.div`
  flex-grow: 0;
`;
