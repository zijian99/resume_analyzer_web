import React from "react";
import styled from "styled-components";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";

const PricingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em;
`;

const PlanContainer = styled.div`
    margin: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    background-color: white;
    min-height: 100vh;
`;

const Card = styled.div`
    max-width: 300px;
    height: 70vh;
    background-color: ${(props) => (props.active ? "#5f30e2" : "white")};
    color: ${(props) => (props.active ? "white" : "rgba(0,0,0,0.7)")};
    padding: 40px;
    margin: 30px 15px;
    border-radius: 10px;
    border-style: solid;
    box-shadow: 10px 10px 10px -1px rgba(10, 99, 169, 0.16),
        3px 3px 10px -1px rgba(255, 255, 255, 0.7);
    transform: ${(props) => (props.active ? "scale(1.09, 1.09)" : "none")};
`;

const Title = styled.h3`
    margin-bottom: 15px;
`;

const Price = styled.h1`
    margin-bottom: 10px;
    height: 1em;
    color: ${(props) => (props.active ? "white" : "rgba(0,0,0,1)")};
    span {
        font-size: 12px;
        color: ${(props) => (props.active ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)")};
    }
`;

const Description = styled.p`
    margin: 20px 0;
    color: ${(props) => (props.active ? "white" : "rgba(0,0,0,0.6)")};
    font-size: 14px;
    line-height: 1.5;
`;

const List = styled.ul`
    list-style: none;
`;

const ListItem = styled.li`
    line-height: 3;
    color: ${(props) => (props.active ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.9)")};
    display: flex;
    align-items: center;
    
    svg {
        color: ${(props) => (props.active ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)")};
        margin-right: 10px;
    }
`;

const Button = styled.a`
    margin: 20px 0;
    display: block;
    text-align: center;
    text-decoration: none;
    border: 1px solid #5f30e2;
    color: #5f30e2;
    padding: 15px;
    border-radius: 5px;
    font-weight: bold;
    transition: 0.4s;
    background-color: ${(props) => (props.active ? "white" : "transparent")};
    color: ${(props) => (props.active ? "rgba(0,0,0,0.8)" : "#5f30e2")};

    &:hover {
        background-color: #5f30e2;
        color: white;
        border: ${(props) => (props.active ? "1px solid white" : "none")};
    }
`;


const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ToggleLabel = styled.span`
    font-size: 1.2em;
    font-weight: bold;
    margin: 1em;
`;

const ToggleSwitch = styled.label`
    position: relative;
    width: 50px;
    height: 25px;
    background: #ccc;
    border-radius: 20px;
    cursor: pointer;
    display: inline-block;

    &::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        top: 50%;
        left: 3px;
        transform: translateY(-50%);
        transition: all 0.3s;
    }
`;

const ToggleInput = styled.input`
    display: none;

    &:checked + ${ToggleSwitch} {
        background: #5f30e2;
    }

    &:checked + ${ToggleSwitch}::after {
        left: 27px;
    }
`;

const DiscountTag = styled.span`
  background-color: rgba(95, 48, 226, 0.1);
  color: #5f30e2;
  font-size: 0.9em;
  font-weight: bold;
  padding: 5px 12px;
  border-radius: 15px;
  border: 1px solid #5f30e2;
`;


const pricingPlans = [
    // { title: "Intro", price: 19, active: false },
    { title: "Free",
        target_user:"For Individual", 
        monthlyPrice: 0,
        yearlyPrice: 0,
        description:"For Individual who needs help with resume, grammar & spelling check", 
        active: false, 
        features:["Resume Analysis", "Spelling & Grammer Checking", "100 Prompt Per Month", "Professional Advice"]  
    },
    { title: "Pro",
        target_user:"For Individual and Teams", 
        description: "For Most Businesses that want to optimize their resume analysis.",
        monthlyPrice: 40,
        yearlyPrice: 400,
        active: true, 
        features:["Everything included in Free", "Unlimited Prompt", "Mutiple resume analysis", "Chat Support", "Detect AI generated text"]  
    },
    { title: "Enterprise", 
        target_user: "For Larger Organization", 
        description: "Drive results across your entire organization with trusted AI.",
        monthlyPrice: -1,
        yearlyPrice: -1,
        active: false, 
        features:["Everything included in Pro","Dedicated Support", "Custom roles and permissions", "Data loss prevention", "BYOK encryption"]  
    },
];

const PricingPlan = () => {
    const [billingCycle, setBillingCycle] = useState("monthly");

    const toggleBillingCycle = () => {
      setBillingCycle((prev) => (prev === "monthly" ? "yearly" : "monthly"));
    };


    return (
        <PricingContainer>
        <ToggleContainer>
        <ToggleLabel>Monthly</ToggleLabel>
        <ToggleInput
          type="checkbox"
          id="billing-toggle"
          checked={billingCycle === "yearly"}
          onChange={toggleBillingCycle}
        />
        <ToggleSwitch htmlFor="billing-toggle" />
        <ToggleLabel>Yearly</ToggleLabel>
        <DiscountTag>Save Up to 60%</DiscountTag>
      </ToggleContainer>
        <PlanContainer>
        {pricingPlans.map((plan, index) => (
            <Card key={index} active={plan.active}>
            <Title>{plan.title}</Title>
            {plan.monthlyPrice >= 0 ? (
              <Price active={plan.active}>
                ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice} 
                <span>/{billingCycle === "monthly" ? "Month" : "Year"}</span>
              </Price>
            ) : (
              <Price active={plan.active}></Price>
            )}
            {/* <Price active={plan.active}>${plan.price} <span>/Month</span></Price> */}
            <Description active={plan.active}>
            {plan.description}
            </Description>
            <Button active={plan.active} href="#">{plan.monthlyPrice>=0? "Choose Plan" : "Contact Sales"}</Button>
            <List>
                {plan.features.map((feature, i) => (
                <ListItem key={i} active={plan.active}>
                    <FaCheckSquare /> {feature}
                </ListItem>
                ))}
            </List>
            
            </Card>
        ))}
        </PlanContainer>

        </PricingContainer>
    );
};

export default PricingPlan;