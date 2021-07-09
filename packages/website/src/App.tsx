import React from "react";
import { Container } from "./components/Container";
import { PageContents } from "./components/PageContents";
import { PageFooter } from "./components/PageFooter";
import { PageHeader } from "./components/PageHeader";

export const App = () => {
  return (
    <Container>
      <PageHeader />

      <PageContents />

      <PageFooter />
    </Container>
  );
};
