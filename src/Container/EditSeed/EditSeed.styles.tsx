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
  .edit {
    background-color: #ec971f;
    border-color: #d58512;

    &:hover {
    }
    background-color: #e38d13;
    border-color: #e38d13;
    &:focus {
      background-color: #e38d13;
      border-color: #e38d13;
    }
  }
  .del {
    background-color: #d9534f;
    border-color: #b92c28;
    &:hover {
      background-color: #c9302c;
      border-color: #ac2925;
    }
    &:focus {
      background-color: #d9534f;
      border-color: #b92c28;
    }
  }
`;
