import React, { useState } from "react";
import { Table, Tag, Radio, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ChangeTypeModal from "../../Components/ChangeTypeModal";
import { Button } from "antd";
import { UserWrapper } from "./EditSeed.styles";
import EditSeedModal from "../../Components/EditSeedModal";
import NewURLModal from "../../Components/NewURLModal";

interface Keyword {
  key?: string | number | undefined;
  name: string;
  platform: string;
  address?: string;
  facebook?: string;
  google?: string;
  youtube?: string;
  status?: "active" | "unactive" | "pending";
}

const data: any[] = [
  {
    url: "http://www.anninhthudo.vn",
    status: "get_success",
  },
  {
    url: "http://www.anninhthudo.vn/thoi-su/3.antd",
    status: "get_success",
  },
  {
    url: "http://www.anninhthudo.vn/an-ninh-doi-song/80.antd",
    status: "get_success",
  },
  {
    url: "http://www.anninhthudo.vn/video/132.antd",
    status: "get_success",
  },
  {
    url: "https://anninhthudo.vn/the-gioi/7.antd",
    status: "init",
  },
  {
    url: "https://anninhthudo.vn/phap-luat/80.antd",
    status: "init",
  },
];

const Users = () => {
  const [isKeywordPopup, setIsKeywordPopup] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccount] = useState<Array<Keyword>>([]);
  const [isNewURLPopup, setIsNewURLPopup] = useState<boolean>(false);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Keyword[]) => {
      setSelectedAccount(selectedRows);
    },
    getCheckboxProps: (record: Keyword) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: "URL",
      dataIndex: "url",
      key: "url",
      width: "50%",
      align: "center" as const,
      render: (value: any) => <p>{value}</p>,
    },
    {
      title: "Status",
      align: "center" as const,
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      render: (text: string, record: any) => (
        <Space size="small">
          <Button
            className="edit"
            style={{
              width: "50px",
              padding: 0,
              fontSize: "12px",
              height: "29px",
            }}
            size="small"
            type="primary"
            shape="round"
            onClick={() => setIsNewURLPopup(true)}
          >
            Edit
          </Button>

          <Button
            className="del"
            style={{
              width: "50px",
              padding: 0,
              fontSize: "12px",
              height: "29px",
            }}
            size="small"
            type="primary"
            shape="round"
          >
            Del
          </Button>
        </Space>
      ),
    },
  ];
  const dataKeywords = data.reduce((acc, value, index) => {
    const newValue = Object.assign({}, value, {
      key: index,
    });
    acc.push(newValue);
    return acc;
  }, []);

  return (
    <UserWrapper>
      <div className="header">
        <Button
          onClick={() => {
            // setIsGroupPopup(true);
          }}
          type="primary"
          className="delete-all"
          danger
          shape="round"
          disabled={selectedAccounts.length < 2}
        >
          Delete All
        </Button>
        <Button
          onClick={() => {
            setIsKeywordPopup(true);
          }}
          type="primary"
          className="edit-seed"
          danger
          shape="round"
        >
          Edit seed
        </Button>
        <Button
          onClick={() => {
            setIsNewURLPopup(true);
          }}
          className="create"
          type="primary"
          shape="round"
        >
          New URL
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        scroll={{ y: 600 }}
        columns={columns}
        dataSource={dataKeywords}
        pagination={false}
      />
      <EditSeedModal
        isKeywordPopup={isKeywordPopup}
        setIsKeywordPopup={setIsKeywordPopup}
      />
      <NewURLModal
        isNewURLPopup={isNewURLPopup}
        setIsNewURLPopup={setIsNewURLPopup}
      />
    </UserWrapper>
  );
};

export default Users;
