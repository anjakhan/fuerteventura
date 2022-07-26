import { css, CSSResultGroup } from 'lit';
import { config } from '../../config';

export const fotoPreviewStyles: CSSResultGroup = css`
  .calendar-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #555;
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .title {
    text-align: center;
  }

  .foto-calendar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: var(--fuerte-box-shadow);
    border-radius: 10px;
    margin-top: 20px;
    width: 640px;
    padding-bottom: 20px;
    background-color: #fff7e6;
  }

  img {
    height: 415px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  .calendar-month {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 22px;
    font-weight: bold;
    padding: 30px 50px 10px;
    text-align: center;
  }

  .calendar-month wc-icon {
    width: 30px;
    height: 30px;
  }

  .table-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .calendar-day {
    font-weight: bold;
    padding: 20px 35px;
    color: var(--fuerte-aqua);
  }

  .month {
    display: grid;
    grid-template-columns: repeat(7, 90px);
    grid-template-rows: repeat(5, 50px);
    justify-content: center;
  }

  .date-box {
    display: flex;
    font-weight: bold;
    color: #555;
    text-align: center;
    cursor: pointer;
    align-self: center;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 50px;
  }

  .date-text {
    text-align: center;
    min-width: 20px;
    min-height: 20px;
  }

  .date-box:hover .date-text {
    background-color: var(--fuerte-brown);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }

  .today {
    background-color: var(--fuerte-aqua);
    border-radius: 100px;
    padding: 5px;
    color: white;
  }
  
  .date-box:hover .today {
    background-color: var(--fuerte-aqua);
  }

  .disabled {
    cursor: default;
  }

  .back-to-calendar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .foto-calendar {
      margin-top: 40px;
      width: 100%;
    }

    img {
      width: 100%;
      height: auto;
    }

    .calendar-day {
      font-size: 3vmin;
    }

    .calendar-month {
      font-size: 4vmin;
      padding: 20px 10% 10px;
    }

    .calendar-month wc-icon {
      height: 5vmin;
    }

    .table-header {
      display: grid;
      grid-template-columns: repeat(7, 13%);
      grid-template-rows: repeat(1, 7vmin);
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .calendar-day {
      padding: 0px;
      align-self: center;
    }
  
    .month {
      display: grid;
      grid-template-columns: repeat(7, 13%);
      grid-template-rows: repeat(5, 7vmin);
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .date-box {
      width: 100%;
      font-size: 3vmin;
      height: 7vmin;
    }

    .date-text {
      padding: 0.5vmin;
      line-height: 7vmin;
      min-width: 7vmin;
    }
  }

  .hidden {
    display: none;
  }
`;
