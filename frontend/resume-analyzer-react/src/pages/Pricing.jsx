import React from 'react'
import PricingPlan from '../components/PricingPlan';
import styled from 'styled-components';
import FAQ from '../components/FAQ';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6em;

`;
const Title = styled.h2`
  font-size: 3em;
`;
const Text = styled.div`
    font-size: 20px;
    align-items: center;
    text-align: center;
    color: grey;
`;

const Pricing = () => {
  return (
    <Container>
      <Title>Great Resume Starts with a Plan</Title>
      <Text>Trusted by 0 organization and 0 people</Text>
      <PricingPlan/>
      <FAQ/>
    </Container>
  )
}

export default Pricing