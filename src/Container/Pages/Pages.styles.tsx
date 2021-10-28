import styled from 'styled-components';

export const UserWrapper = styled.div`
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .menu-left {
    display: flex;
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    flex-direction: row;
    align-items: center;
    color: black;
  }
  .menu-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .menu-middle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 500px;
  }
  .text-search {
    margin-top: 5px;
    font-size: 12px;
    color: black;
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
  .mutiple {
    margin-right: 5px;
    color: #fff;
    background-color: #ff6f91;
    border-color: #ff6f91;
    &:hover {
      color: #fff;
      background-color: #ff6f91;
      border-color: #ff6f91;
    }
    &:focus {
      color: #fff;
      background-color: #ff6f91;
      border-color: #ff6f91;
    }
  }
  .ant-table-body {
    overflow-y: scroll;
    height: calc(100vh - 295px);
  }
  .delete-all {
    margin-right: 5px;
  }
`;
