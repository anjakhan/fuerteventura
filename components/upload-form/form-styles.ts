import { css, CSSResultGroup } from 'lit';

export const formStyles: CSSResultGroup = css`
  form {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #555;
    padding-right: 150px;
    padding-top: 20px;
  }

  input {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 40px;
    outline: none;
    border: 1px solid #555;
    box-shadow: var(--fuerte-box-shadow);
  }

  textarea {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 200px;
    outline: none;
    border: 1px solid #555;
    box-shadow: var(--fuerte-box-shadow);
  }

  button {
    font-family: Ubuntu, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 10px;
    padding: 5px 10px;
    width: 300px;
    height: 40px;
    background-color: var(--fuerte-background-color);
    border: none;
    outline: none;
    color: white;
    box-shadow: var(--fuerte-box-shadow);
    font-weight: 600;
    letter-spacing: 1.2px;
    cursor: pointer;
  }
`;
