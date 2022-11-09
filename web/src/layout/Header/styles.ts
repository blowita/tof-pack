import styled from "styled-components";

export const Container = styled.header`
  nav {
    width: 100%;
    font-size: 2rem;
    line-height: 2rem;

    ul {
      display: flex;
      flex-grow: 1;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;

      li {
        display: flex;
        flex-grow: 1;
        justify-content: center;

        :focus-within {
          box-shadow: 0 0 0.8rem #5e916c;
        }

        a {
          color: white;
          width: 100%;
          text-align: center;
          text-decoration: none;

          background-color: #333;
          border-left: 1px solid #222;
          border-right: 1px solid #222;
          border-radius: 0 0 0.3rem 0.3rem;

          :hover {
            color: #bbbbbb;
          }

          :active {
            color: #888888;
          }

          &[aria-current="page"] {
            background-color: inherit;
            border-radius: 0 0.3rem 0 0.3rem;
          }

          &[data-title]:after {
            top: 2.5rem;
            left: 50%;

            width: 6rem;
            margin-left: -3rem;

            background-color: white;
            color: black;
            padding: 0.2rem 0;
            border-radius: 0.3rem;
            font-size: 1rem;
            line-height: 1rem;
          }
        }
      }
    }
  }
`;
