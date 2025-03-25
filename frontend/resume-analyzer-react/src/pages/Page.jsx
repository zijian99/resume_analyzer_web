import { motion } from "framer-motion";
import styled from "styled-components";

const PageWrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
`;

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: "100vw", transition: { duration: 0.5 } },
};


// For animation transition between page(NOT USING)
const Page = ({ children }) => {
  return (
    <PageWrapper
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </PageWrapper>
  );
};

export default Page;