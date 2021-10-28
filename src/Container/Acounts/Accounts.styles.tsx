import styled from "styled-components";

export const UserWrapper = styled.div`
  .header {
    display: flex;
    justify-content: flex-end;
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
  .ant-table-body {
    overflow-y: scroll;
    height: calc(100vh - 295px);
  }
`;
