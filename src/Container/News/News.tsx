import React, { useState } from "react";
import { UserWrapper } from "./News.styles";
import {
  Table,
  Tag,
  Radio,
  Space,
  DatePicker,
  Popconfirm,
  message,
  Row,
  Col,
  Input,
  Form,
  Dropdown,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import ChangeTypeModal from "../../Components/ChangeTypeModal";
import { Button } from "antd";
import NewsModal from "../../Components/NewsModal";
import moment from "moment-timezone";
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";

interface Keyword {
  key?: string | number | undefined;
  siteName: string;
  priority: string;
  useDiffbot?: string;
  seedError?: string;
  urlAdded?: string;
  urlParseError?: string;
  urlDownloadError?: string;
  systemDelay?: string;
  insertDelay?: string;
}

const { RangePicker } = DatePicker;

const data: any[] = [
  {
    siteName: "anninhthudo.vn",
    priority: "true",
    useDiffbot: "false",
    seedError: "0",
    urlAdded: "0",
    urlParseError: "0",
    urlDownloadError: "0",
    systemDelay: "0 - 0 - 0",
    insertDelay: "0 - 0 - 0",
  },
];

const News = () => {
  const [isKeywordPopup, setIsKeywordPopup] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccount] = useState<Array<Keyword>>([]);
  const [isChangeTypePopup, setIsChangeTypePopup] = useState<boolean>(false);
  const [isCustomDataPopup, setIsCustomDataPopup] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<any>(moment(new Date()));
  const [endDate, setEndDate] = useState<any>(
    moment(startDate).add(5, "days").subtract(1, "second")
  );

  const handleMenuClick = (text, record) => {
    console.log("text", text);
    console.log("record", record);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Keyword[]) => {
      setSelectedAccount(selectedRows);
    },
    getCheckboxProps: (record: Keyword) => ({
      disabled: record.siteName === "Disabled User", // Column configuration not to be checked
      name: record.siteName,
    }),
  };

  const applyCallback = (startDate, endDate) => {
    console.log("Apply Callback");
    console.log(startDate.format("DD-MM-YYYY HH:mm"));
    console.log(endDate.format("DD-MM-YYYY HH:mm"));
  };

  const rangeCallback = (index, value) => {
    console.log(index, value);
  };

  const dataKeywords = data.reduce((acc, value, index) => {
    const newValue = Object.assign({}, value, {
      key: index,
    });
    acc.push(newValue);
    return acc;
  }, []);
  let now = new Date();
  let start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  let end = moment(start).add(1, "days").subtract(1, "seconds");
  let ranges = {
    "Today Only": [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days"),
    ],
    "3 Days": [moment(start).subtract(3, "days"), moment(end)],
    "5 Days": [moment(start).subtract(5, "days"), moment(end)],
    "1 Week": [moment(start).subtract(7, "days"), moment(end)],
    "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
    "1 Month": [moment(start).subtract(1, "months"), moment(end)],
    "1st August 18": [
      moment("2018-08-01 00:00:00"),
      moment("2018-08-02 23:59:59"),
    ],
    "1 Year": [moment(start).subtract(1, "years"), moment(end)],
  };
  let local = {
    format: "DD-MM-YYYY HH:mm",
    sundayFirst: false,
  };
  let value = `${startDate.format("DD-MM-YYYY HH:mm")} - ${endDate.format(
    "DD-MM-YYYY HH:mm"
  )}`;
  let maxDate = moment(end).add(24, "hour");

  const columns = [
    {
      title: "Site Name",
      dataIndex: "siteName",
      key: "siteName",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Use Diffbot",
      key: "useDiffbot",
      dataIndex: "useDiffbot",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Seed Error",
      key: "seedError",
      dataIndex: "seedError",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Url Added",
      key: "urlAdded",
      dataIndex: "urlAdded",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Url Parse Error",
      key: "urlParseError",
      dataIndex: "urlParseError",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Url Download Error",
      key: "urlDownloadError",
      dataIndex: "urlDownloadError",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "SystemDelay (min/max/avg)",
      key: "systemDelay",
      dataIndex: "systemDelay",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "InsertDelay (min/max/avg)",
      key: "insertDelay",
      dataIndex: "insertDelay",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: "180px",
      align: "center" as const,
      render: (value: any) => (
        <Space size="small">
          <Button
            className="pause"
            style={{
              width: "50px",
              padding: 0,
              fontSize: "12px",
              height: "29px",
            }}
            size="small"
            type="primary"
          >
            Pause
          </Button>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={`/news/${value?.siteName}/edit_seed`}>Seed</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`/news/${value?.siteName}/edit_article`}>
                    Article
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
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
            >
              Edit <DownOutlined />
            </Button>
          </Dropdown>
          <Button
            className="reload"
            style={{
              width: "50px",
              padding: 0,
              fontSize: "12px",
              height: "29px",
            }}
            size="small"
            type="primary"
          >
            Reload
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <UserWrapper>
      <div className="header">
        <div className="date-picker-wrapper">
          <DateTimeRangeContainer
            ranges={ranges}
            start={startDate}
            end={endDate}
            local={local}
            maxDate={maxDate}
            applyCallback={applyCallback}
            rangeCallback={rangeCallback}
            smartMode
          >
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Input
                placeholder="Enter text"
                style={{ cursor: "pointer", width: "260px" }}
                disabled={true}
                type="text"
                // onChange={(e) => this.setState({ cityName: e.target.value })}
                value={value}
              />
              <Button
                type="primary"
                shape="round"
                icon={<SearchOutlined />}
                size={"middle"}
                style={{ marginLeft: "5px", height: "28px" }}
              />
            </Form.Item>
          </DateTimeRangeContainer>

          {/* <RangePicker
            onClick={() => {
              console.log("Hello");
            }}
            onChange={() => {
              console.log("Hello 2");
            }}
            onFocus={() => {
              setIsCustomDataPopup(true);
            }}
            open={false}
          />

          <div
            className={`bottom ${isCustomDataPopup ? "unable" : "disable"}  `}
          >
            <div className="left">
              <ul>
                <li>Today</li>
                <li>Yesterday</li>
                <li className="">Last 24 Hours</li>
                <li>Last 7 Days</li>
                <li>Last 30 Days</li>
                <li>This Month</li>
                <li className="active">Last Month</li>
                <li className="">Custom Range</li>
              </ul>
              <Row gutter={12}>
                <Col span={12}>
                  <div className="input-date-wrapper">
                    <div className="label"> FROM</div>
                    <Input type="text" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="input-date-wrapper">
                    <div className="label"> TO</div>
                    <Input type="text" />
                  </div>
                </Col>
              </Row>
              <Row className="button-wrapper">
                <Space>
                  <Button
                    style={{
                      fontSize: "11px",
                      height: "29px",
                      padding: "5px",
                    }}
                    type="primary"
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCustomDataPopup(false);
                    }}
                    style={{
                      fontSize: "11px",
                      height: "29px",
                      padding: "5px",
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Row>
              <i></i>
            </div>
            <Row gutter={24} className="right">
              <Col span={12}>
                <Calendar showDateInput={false} />
              </Col>
              <Col span={12}>
                <Calendar showDateInput={false} />
              </Col>
            </Row>
          </div> */}
        </div>
        <div>
          <Button
            onClick={() => {
              setIsChangeTypePopup(true);
            }}
            type="primary"
            className={`change ${selectedAccounts.length < 2 ? "disable" : ""}`}
            shape="round"
            disabled={selectedAccounts.length < 2}
          >
            Change Type
          </Button>
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
            className="create"
            type="primary"
            shape="round"
          >
            Create
          </Button>
        </div>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        scroll={{ y: 600, x: 1300 }}
        columns={columns}
        dataSource={dataKeywords}
        pagination={false}
      />
      <NewsModal
        isKeywordPopup={isKeywordPopup}
        setIsKeywordPopup={setIsKeywordPopup}
      />
      <ChangeTypeModal
        isChangeTypePopup={isChangeTypePopup}
        setIsChangeTypePopup={setIsChangeTypePopup}
      />
    </UserWrapper>
  );
};

export default News;
