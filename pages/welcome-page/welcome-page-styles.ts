import { css, CSSResultGroup } from 'lit';

export const welcomePageStyles: CSSResultGroup = css`
  .welcome-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    color: #555;
  }

  .title {
    text-align: center;
    padding-right: 150px;
  }

  #mapid { height: 180px; }
`;
