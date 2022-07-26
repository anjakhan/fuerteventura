import { css, CSSResultGroup } from 'lit';

export const fotoUploadStyles: CSSResultGroup = css`
  .foto-upload-container {
    margin-bottom: 15px;
  }

  .file-loader {
    position: relative;
    width: 300px;
    height: 40px;
    letter-spacing: 0.5px;
    line-height: 40px;
    font-size: 14px;
    font-weight: 600;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    margin: 10px 10px 15px;
    box-shadow: var(--fuerte-box-shadow);
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
  }

  label {
    cursor: pointer;
    height: auto;
    cursor: pointer;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }

  .preview {
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 300px;
  }

  img {
    height: 60px;
    margin: 10px;
  }
`;
