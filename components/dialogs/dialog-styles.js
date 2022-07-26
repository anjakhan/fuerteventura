import { css } from 'lit';
import { config } from '../../config';
export const dialogStyles = css `
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
    background-color: #fefefe;
    margin: auto;
    width: 50vmin;
    min-width: 500px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2), 0px 4px 20px rgba(0,0,0,0.2);
  }

  .pink { border-bottom: 2px solid #e35fbc; }
  .green { border-bottom: 2px solid var(--printess-green); }
  .magenta { border-bottom: 2px solid var(--printess-magenta); }
  .blue { border-bottom: 2px solid var(--printess-blue); }

  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .modal-title {
    line-height: 50px;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }

  wc-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 20px;
  }

  .pink .modal-header { background-color: #e35fbc; }
  .green .modal-header { background-color: var(--printess-green); }
  .magenta .modal-header { background-color: var(--printess-magenta); }
  .blue .modal-header { background-color: var(--printess-blue); }

  .modal-content {
    padding: 20px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    min-height: 160px;
    max-height: 50vh;
    overflow: auto;
  }

  label {
    font-size: 14px;
    padding-left: 2px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    margin-top: 7px;
    border: 1px solid rgb(118, 118, 118);
  }

  input:hover {
    background-color: var(--printess-lightpink);
    border: 1px solid rgb(118, 118, 118);
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

  .pink .submit { background-color: #e35fbc; }
  .green .submit { background-color: var(--printess-green); }
  .magenta .submit { background-color: var(--printess-magenta); }
  .blue .submit { background-color: var(--printess-blue); }

  .pink .submit:hover {
    background-color: #e447b6;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .modal {
      padding-top: 45px;
    }

    .modal-wrapper {
      width: 70vmin;
      min-width: unset;
    }

    .modal-content {
      max-height: unset;
    }
  }
`;
//# sourceMappingURL=dialog-styles.js.map