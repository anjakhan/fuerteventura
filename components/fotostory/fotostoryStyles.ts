import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const fotostoryStyles: CSSResultGroup = css`
  .fotostory-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
  }

  .image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    padding: 30px 0 60px;
  }

  img {
    width: auto;
    height: 250px;
    box-shadow: var(--fuerte-box-shadow);
    margin: 20px;
    cursor: pointer;
  }

  .lottie {
    width: 500px;
    height: 500px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .title {
      margin-bottom: 0;
      text-align: center;
    }

    .image-container {
      padding-top: 0px;
    }

    img {
      width: 100%;
      height: auto;
      margin: 10px;
      cursor: default;
    }

    .lottie {
      width: 100%;
    }
  }
`;
