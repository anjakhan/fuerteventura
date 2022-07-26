import { css, CSSResultGroup } from 'lit';

export const traveldetailsStyles: CSSResultGroup = css`
  .travel-details-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
    padding-top: 30px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 40px;
  }

  .flight, .apartment {
    background-color: #fff7e6;
    box-shadow: var(--fuerte-box-shadow);
    border-radius: 10px;
    margin-bottom: 30px;
  }

  .apartment {
    width: 410px;
  }

  .flight {
    padding: 10px 30px;
  }

  .flex {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
  }

  img {
    width: 410px; 
    border-top-right-radius: 10px; 
    border-top-left-radius: 10px;
  }

  wc-icon {
    width: 20px;
    height: 20px;
    margin: 0 10px;
  }

  @media screen and (max-width: 490px) {
    .flight, .apartment {
      max-width: 100%;
    }

    img {
      max-width: 100%;
    }
  }
`;
