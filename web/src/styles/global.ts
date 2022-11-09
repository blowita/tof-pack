import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    overflow: hidden;
  }

  body {
    background: #222222;
    color: white;
    -webkit-font-smoothing: antialiased;
    height: 100vh;
  }

  body, input, button, span {
    font-family: 'Roboto Slab', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  .visuallyhidden {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;

    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }

  [data-title] {
    position: relative;
  }

  [data-title]:after {
    content: attr(data-title);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s ease-out 0s, visibility 0.2s ease-out 0s;

    position: absolute;
    z-index: 1;
  }

  [data-title]:hover:after {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.2s ease-out 0.5s,
      visibility 0.2s ease-out 0.5s;
  }
`;
