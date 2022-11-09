import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: calc(100vh - 3rem);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.3);
    border-radius: 0.9rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.9rem;
    background-color: #444;
    -webkit-box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.5);
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h1 {
      align-self: center;
      margin-bottom: 0.6rem;
    }

    section {
      width: 100%;
    }

    details {
      background-color: #333;
      border-radius: 0.3rem;
      margin-bottom: 0.3rem;

      summary {
        font-size: 1.3rem;
        background-color: #444;
        border-radius: 0.3rem;
        padding: 0.3rem;
      }

      p {
        padding: 0.3rem;
        text-align: justify;

        a {
          color: #5e916c;

          :visited {
            color: #5d5dff;
          }
        }

        em {
          background-color: #444;
          border-radius: 0.2rem;
          padding-left: 0.2rem;
          padding-right: 0.2rem;
        }
      }

      ul {
        list-style-position: inside;

        li {
          margin-left: 1rem;
        }
      }
    }
  }
`;
