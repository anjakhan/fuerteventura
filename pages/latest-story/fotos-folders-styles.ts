import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const fotosFoldersStyles: CSSResultGroup = css`
  .folder-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 30px;
    justify-content: center;
  }

  .folder {
    margin: 10px;
    border-radius: 4px;
    box-shadow: var(--fuerte-box-shadow);
    cursor: pointer;
  }

  img {
    width: auto;
    height: 200px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .subtitle {
    font-family: var(--fuerte-text-font);
    background-color: var(--fuerte-brown);
    padding: 7px 10px;
    word-wrap: break-word;
    font-size: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
  }

  .back-to-fotos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    img {
      width: auto;
      height: 100px;
    }
  }
`;
