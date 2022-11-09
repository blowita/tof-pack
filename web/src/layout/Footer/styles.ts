import styled from "styled-components";

export const Container = styled.footer`
  width: 100%;
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;

  background-color: #1d1d1d;

  p,
  a {
    font-size: 0.7rem;
    line-height: 1rem;
  }

  a {
    color: #5e916c;
  }
`;
