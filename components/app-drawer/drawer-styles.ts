import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const drawerStyles: CSSResultGroup = css`
  .tab {
    cursor: pointer;
    font-family: var(--printess-font);
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    color: white;
    text-shadow: 1px 1px 2px #555;
  }

  .tab wc-icon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .selected {
    color: var(--fuerte-brown);
  }

  .user-icon {
    display: flex;
    align-items: center;
    position: relative;
  }

  .hidden {
    display: none;
  }

    @media (max-width: ${config.mobileDeviceWidth}px) {
    .menu-icon {
      position: fixed;
      top: 14px;
      left: 20px;
      height: 25px;
      width: 30px;
    }

    .tab {
      border-bottom: 1px solid #ddd;
      width: 100%;
      font-size: 15px;
      justify-content: center;
    }

    .hidden {
      display: none !important;
    }
  }
`;
