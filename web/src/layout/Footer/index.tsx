import React from "react";
import { Link, useLocation } from "react-router-dom";

import { FaInfoCircle } from "react-icons/fa";

import { Container } from "./styles";

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  if (pathname === "/info") {
    return <></>;
  }

  return (
    <Container>
      <p>ToF Pack is not affiliated with HOTTA.</p>
      <p>ToF Pack Version: 1.0.0</p>
      <Link to="/info" aria-current={pathname === "/info" && "page"}>
        <FaInfoCircle /> Privacy, Cookies and FAQs
      </Link>
    </Container>
  );
};

export default Footer;
