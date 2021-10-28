import styled from "styled-components";

export const UserWrapper = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .delete-all {
    margin-right: 5px;
    /* background-color: #dc3545;
    border-color: #dc3545;
    &:focus {
      background-color: #dc3545;
      border-color: #dc3545;
    }
    &:hover {
      background-color: #dc3545;
      border-color: #dc3545;
    } */
  }
  .change {
    margin-right: 5px;
    color: #fff;
    background-color: #198754;
    border-color: #198754;
    &:hover {
      color: #fff;
      background-color: #22c77b;
      border-color: #22c77b;
    }
    &:focus {
      color: #fff;
      background-color: #198754;
      border-color: #198754;
    }
  }
  .disable {
    color: rgba(0, 0, 0, 0.25) !important;
    background: #f5f5f5 !important;
    border-color: #d9d9d9 !important;
    text-shadow: none !important;
    box-shadow: none !important;
    &:hover {
      color: rgba(0, 0, 0, 0.25) !important;
      background: #f5f5f5 !important;
      border-color: #d9d9d9 !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }

    &:focus {
      color: rgba(0, 0, 0, 0.25) !important;
      background: #f5f5f5 !important;
      border-color: #d9d9d9 !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }
  }
  .ant-table-body {
    overflow-y: scroll;
    height: calc(100vh - 240px);
  }

  .date-picker-wrapper {
    display: flex;
    align-items: center;
  }

  .date-picker-wrapper .bottom {
    display: flex;
    min-width: 730px;
    top: 40px;
    left: 50%;
    transform: translate(-65%, 0);
    padding: 10px 20px;
    color: #444444;
    background: #fff;
    font-weight: normal;
    font-size: 13px;
    border-radius: 8px;
    position: absolute;
    z-index: 99999999;
    box-sizing: border-box;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    visibility: visible;
    opacity: 0;
    transition: opacity 0.8s;
  }

  .date-picker-wrapper .unable {
    visibility: visible;
    opacity: 1;
  }

  .date-picker-wrapper .bottom i {
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 12px;
    overflow: hidden;
  }

  .date-picker-wrapper .bottom i::after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, 50%) rotate(45deg);
    background-color: #eeeeee;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }
  .date-picker-wrapper {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      font-size: 13px;
      background: #f5f5f5;
      border: 1px solid #f5f5f5;
      color: #08c;
      padding: 3px 12px;
      margin-bottom: 8px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
    .left {
      width: 200px;
      margin-right: 10px;
    }
    .right {
      width: 100%;
    }
  }
  .button-wrapper {
    margin-top: 10px;
  }
  .pause {
    background-color: #eb9316;
    border: 1px solid #eb9316;
    &:hover {
      background-color: #eb9316;
      border: 1px solid #eb9316;
    }
    &:focus {
      background-color: #eb9316;
      border: 1px solid #eb9316;
    }
  }
  .reload {
    border-color: #3e8f3e;
    background-color: #3e8f3e;
    &:hover {
      background-color: #3e8f3e;
      border: 1px solid #3e8f3e;
    }
    &:focus {
      background-color: #3e8f3e;
      border: 1px solid #3e8f3e;
    }
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }
  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;
