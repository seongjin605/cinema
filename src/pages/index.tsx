import React from 'react';
import Layout from '../layout/Layout';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
  width: auto;
`;

const Index = () => {
  return (
    <Container>
      <Layout />
      <Head>
        <title>Welcome to cinema!</title>
      </Head>
    </Container>
  );
};

export default Index;
