import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const dialogStyles: CSSResultGroup = css`
  .modal {
    font-family: var(--printess-text-font);
    color: #555555;
    display: block;
    position: fixed;
    z-index: 100;
    padding-top: 70px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .modal-wrapper {
    display: flex;
    justify-content: center;
    position: relative;
    background-color: black;
    margin: auto;
    height: 80vh;
    width: 67vw;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2), 0px 4px 20px rgba(0,0,0,0.2);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
  }

  .prev {
    position: absolute;
    top: 50%;
    left: 10px;
  }

  .next {
    position: absolute;
    top: 50%;
    right: 10px;
  }

  img {
    width: auto;
    height: 100%;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .modal {
      padding-top: 45px;
    }

    .modal-wrapper {
      width: 70vmin;
    }
  }

  wc-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 20px;
  }

  button.submit {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    color: white;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #e35fbc;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }
`;