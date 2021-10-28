import React, { useState, useEffect } from "react";
import { UserWrapper } from "./Accounts.styles";
import {
  Table,
  Tag,
  Radio,
  Space,
  Popconfirm,
  Pagination,
  Select,
  Row,
  Tooltip,
} from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CRAWLER_ACCOUNTS } from "../../graphqls/Queries/Query";
import {
  CREATE_CRAWLER_ACCOUNTS,
  UPDATE_CRAWLER_ACCOUNT,
  DELETE_CRAWLER_ACCOUNTS,
} from "../../graphqls/Mutations/mutation";
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import AccountModal from "../../Components/AccountModal";
import Filter from "../../Components/Filter";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { NotificationManager } from "react-notifications";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

interface Accounts {
  accountLink: string;
  token: string;
  mission: string;
  tokenType: string;
  activeOn: string;
  groupJoined: string;
  owner: string;
  status: string;
  key?: string | number;
}

interface Params {
  pageSize: number;
  currentPage: number;
  status?: string;
  platform?: string;
  sortType?: string;
  sortBy?: string;
}

const defaultStatus = ["active", "react_limit", "locked"];
const defaultPlatform = ["youtube", "linkedin", "facebook", "twitter"];
const defaultSortTypes = ["ASC", "DESC"];
const defaultSortBy = ["platform", "active_on", "mission", "status"];
const { Option } = Select;

const Profiles = () => {
  const [isAccountPopup, setIsAccountPopup] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccount] = useState<Array<any>>([]);
  const [deletesAccounts, setDeletesAccounts] = useState<Array<string>>([]);
  const [account, setAccount] = useState<any>(null);
  const [dataAccounts, setDataAccounts] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("active");
  const [platform, setPlatform] = useState("");
  const [sortType, setSortType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [filtersIndentify, setFiltersIndentify] = useState<any>([
    { id: uuidv4(), param: "status", isChecked: false },
    { id: uuidv4(), param: "platform", isChecked: false },
    { id: uuidv4(), param: "sort", isChecked: false },
  ]);
  const { data, loading, error, refetch } = useQuery<any>(
    GET_CRAWLER_ACCOUNTS,
    {
      variables: {
        input: {
          limit: 50,
          skip: 0,
          filter: {
            status: "active",
          },
        },
      },
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true,
    }
  );
  const [
    createCrawlerAccounts,
    { loading: mutationLoadingCreate },
  ] = useMutation(CREATE_CRAWLER_ACCOUNTS, {
    update(cache, { data: { createCrawlerAccounts } }) {
      if (createCrawlerAccounts && createCrawlerAccounts.status === 200) {
        NotificationManager.success("Success create", "", 4000);
        setIsAccountPopup(false);
        refetch();
      } else if (
        createCrawlerAccounts &&
        createCrawlerAccounts.status !== 200
      ) {
        NotificationManager.error(createCrawlerAccounts.message, "", 4000);
      }
    },
  });

  const [
    updateCrawlerAccount,
    { loading: mutationLoadingUpdate },
  ] = useMutation(UPDATE_CRAWLER_ACCOUNT, {
    update(cache, { data: { updateCrawlerAccount } }) {
      if (updateCrawlerAccount && updateCrawlerAccount.status === 200) {
        NotificationManager.success("Success update", "", 4000);
        setIsAccountPopup(false);
        refetch();
      } else if (updateCrawlerAccount && updateCrawlerAccount.status !== 200) {
        NotificationManager.error(updateCrawlerAccount.message, "", 4000);
      }
    },
  });

  const [
    deleteCrawlerAccounts,
    { loading: mutationdeleteAccounts },
  ] = useMutation(DELETE_CRAWLER_ACCOUNTS, {
    update(cache, { data: { deleteCrawlerAccounts } }) {
      if (deleteCrawlerAccounts && deleteCrawlerAccounts.status === 200) {
        NotificationManager.success("Success delete", "", 4000);
        refetch();
      } else if (
        deleteCrawlerAccounts &&
        deleteCrawlerAccounts.status !== 200
      ) {
        NotificationManager.error(deleteCrawlerAccounts.message, "", 4000);
      }
    },
  });

  const hanldeChangeStatus = (value) => {
    setStatus(value);
  };

  const hanldeChangeSortBy = (value) => {
    setSortBy(value);
  };
  const hanldeChangeSortType = (value) => {
    setSortType(value);
  };

  const hanldeChangePlatform = (value) => {
    setPlatform(value);
  };

  const defineStatus = (status: string) => {
    return status === "active"
      ? "Active"
      : status === "react_limit"
      ? "React Limit"
      : "Locked";
  };

  const defineSort = (type: string) => {
    return type === " platform"
      ? "Platform"
      : type === "active_on"
      ? "Active On"
      : type === "mission"
      ? "Misson"
      : "Status";
  };

  const handleDeleteCrawlerAccount = (id: any) => {
    deleteCrawlerAccounts({
      variables: {
        input: {
          _ids: [id],
        },
      },
    });
  };

  const handleDeletesCrawlerAccounts = (ids: any) => {
    deleteCrawlerAccounts({
      variables: {
        input: {
          _ids: ids,
        },
      },
    }).then((res) => {
      if (res?.data?.deleteCrawlerAccounts?.status === 200) {
        setSelectedAccount([]);
      }
    });
  };

  const handleCreateCrawlerAccounts = (inputs, reset) => {
    createCrawlerAccounts({
      variables: {
        input: inputs,
      },
    })
      .then((res) => {
        if (res?.data?.createCrawlerAccounts?.status === 200) {
          if (reset) {
            reset();
          }
        }
      })

      .catch((error) => {
        const _error =
          error &&
          error.graphQLErrors &&
          error.graphQLErrors.length > 0 &&
          error.graphQLErrors[0];
        if (_error) {
          NotificationManager.error(_error.message, "", 4000);
        }
      });
  };

  const handleUpdateCrawlerAccount = (id, input) => {
    updateCrawlerAccount({
      variables: {
        input: {
          _id: id,
          data_update: input,
        },
      },
    }).catch((error) => {
      const _error =
        error &&
        error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0];
      if (_error) {
        NotificationManager.error(_error.message, "", 4000);
      }
    });
  };

  const fetchData = ({
    pageSize,
    currentPage,
    status,
    sortType,
    sortBy,
  }: Params) => {
    let sort;
    if (sortType || sortBy) {
      sort = {
        by: sortBy ? sortBy : undefined,
        type: sortType ? sortType : undefined,
      };
    }
    refetch({
      input: {
        limit: pageSize || 50,
        skip: (pageSize || 50) * (currentPage - 1 || 0),
        filter: {
          status: status ? status : undefined,
          platform: platform ? platform : undefined,
        },
        sort,
      },
    });
  };

  const renderSelectStatus = () => {
    return (
      <Select
        value={status}
        onChange={hanldeChangeStatus}
        placeholder={"Select status"}
        allowClear
        style={{ width: "100%" }}
      >
        {defaultStatus.map((status) => (
          <Option key={`accounts_${status}`} value={status}>
            {defineStatus(status)}
          </Option>
        ))}
      </Select>
    );
  };

  const renderSelectPlatform = () => {
    return (
      <Select
        value={platform}
        onChange={hanldeChangePlatform}
        placeholder={"Select platform"}
        allowClear
        style={{ width: "100%" }}
      >
        {defaultPlatform.map((platform) => (
          <Option key={`accounts_${platform}`} value={platform}>
            {platform}
          </Option>
        ))}
        <Option key={`accounts_all`} value="">
          All
        </Option>
      </Select>
    );
  };

  const renderSelectSort = () => {
    return (
      <>
        <Row
          style={{
            marginBottom: "5px",
          }}
        >
          <Select
            value={sortBy}
            onChange={hanldeChangeSortBy}
            placeholder={"Select"}
            allowClear
            style={{ width: "100%" }}
          >
            {defaultSortBy.map((type) => (
              <Option key={`sort_${type}`} value={type}>
                {defineSort(type)}
              </Option>
            ))}
          </Select>
        </Row>
        <Row>
          <Select
            value={sortType}
            onChange={hanldeChangeSortType}
            placeholder={"Select "}
            allowClear
            style={{ width: "100%" }}
          >
            {defaultSortTypes.map((type) => (
              <Option key={`sort_${type}`} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Row>
      </>
    );
  };

  const createFilterData = () => {
    return filtersIndentify.map((item) => {
      if (item.param === "status") {
        return {
          id: item.id,
          label: "status",
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectStatus(),
        };
      }
      if (item.param === "platform") {
        return {
          id: item.id,
          label: "platform",
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectPlatform(),
        };
      }

      if (item.param === "sort") {
        return {
          id: item.id,
          label: "sort",
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectSort(),
        };
      }

      return null;
    });
  };

  const onSelectFilter = (id) => {
    const newFiltersIndentify = filtersIndentify;
    const index = newFiltersIndentify.findIndex((item) => item.id === id);
    if (index >= 0) {
      newFiltersIndentify[index].isChecked = !filtersIndentify[index].isChecked;
      // const resetValue =
      //   filtersIndentify[index].param === "types" ? defaultTypes : undefined;
      console.log("newFiltersIndentify", newFiltersIndentify);
      setFiltersIndentify([...newFiltersIndentify]);
      // this.setState({
      //   filtersIndentify,
      //   [filtersIndentify[index].param]: resetValue,
      // });

      if (!filtersIndentify[index].isChecked) {
        fetchData({ pageSize, currentPage, status, platform });
      }
    }
  };

  const onResetFilter = () => {
    setFiltersIndentify(
      filtersIndentify.map((item) => {
        item.isChecked = false;
        return item;
      })
    );
    setStatus("active");
    setPlatform("");
    setSortBy("");
    setSortType("");
    fetchData({ pageSize, currentPage, status: "active", platform: "" });
    // this.fetchData({
    //   ...this.state,
    //   status: defaultStatus,
    //   hotelId: undefined,
    //   paymentStatus: undefined,
    //   paymentMethod: undefined,
    //   orderCode: undefined,
    //   pageSize: limit,
    //   page: 0,
    // });
  };

  const exportCSV = (fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const csvData = dataAccounts.map((account) => ({
      Username: account.username,
      Email: account.email,
      Phone: account.Phone,
      Token: account.token,
      Cookie: account.cookie,
      Platform: account.platform,
      Mission: account.mission ? account.mission.toString() : "",
      Domain: account.domain,
      Status: account.status,
      "Joined Group": account.joined_group,
      "Active On": account.active_on,
      priority: account.priority,
      "Is Locked": account.is_locked,
      "Locked Time": account.locked_time,
      "Lock Code": account.lock_code,
      "Last Updated Time": Number(account.last_updated_time)
        ? dayjs(Number(account.last_updated_time)).format("DD/MM/YYYY")
        : "",
      "Created Time": Number(account.created_time)
        ? dayjs(Number(account.created_time)).format("DD/MM/YYYY")
        : "",
      "Updated Time": Number(account.updated_time)
        ? dayjs(Number(account.updated_time)).format("DD/MM/YYYY")
        : "",
    }));
    const ws = [XLSX.utils.json_to_sheet(csvData)];
    const wb = {
      Sheets: { Accounts: ws[0] },
      SheetNames: ["Accounts"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Accounts_${fileName}` + fileExtension);
  };

  useEffect(() => {
    const dataAccounts = data?.getCrawlerAccounts?.data?.accounts || [];
    setDataAccounts(dataAccounts);
  }, [data]);

  useEffect(() => {
    const _error =
      error &&
      error.graphQLErrors &&
      error.graphQLErrors.length > 0 &&
      error.graphQLErrors[0];
    console.log(_error);
    if (_error) {
      NotificationManager.error(_error.message, "", 4000);
    }
  }, [error]);

  useEffect(() => {
    if (data && data?.getCrawlerAccounts?.data) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetchData({ pageSize, currentPage, status, platform, sortType, sortBy });
    }
  }, [status, platform, sortType, sortBy]);

  const newDataAccounts = dataAccounts.length
    ? dataAccounts.reduce((acc, value) => {
        const newValue = Object.assign({}, value, {
          key: value._id,
        });
        acc.push(newValue);
        return acc;
      }, [])
    : [];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setSelectedAccount(selectedRows);
      const accounts = selectedRows.reduce((acc, value) => {
        acc.push(value._id);
        return acc;
      }, []);
      setDeletesAccounts(accounts);
    },
  };

  const total = data?.getCrawlerAccounts?.data?.total;
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "No.",
      width: "5%",
      align: "center" as const,
      render: (value: any, item: any, index: any) => <a>{index + 1}</a>,
    },
    {
      title: "Account",
      dataIndex: "username",
      key: "username",
      align: "center" as const,
      width: "20%",
    },
    {
      title: "Token",
      key: "token",
      dataIndex: "token",
      align: "center" as const,
      render: (platform: any) => <span>{platform}</span>,
      width: "20%",
    },
    {
      title: "Platform",
      key: "platform",
      dataIndex: "platform",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
      width: "8%",
    },
    {
      title: "Group Joined",
      key: "joined_group",
      dataIndex: "joined_group",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      align: "center" as const,
      render: (value: any) => <span>{value}</span>,
      width: "8%",
    },
    {
      title: "Edit",
      key: "edit",
      align: "center" as const,
      width: "5%",
      render: (text: string, record: any) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setType("edit");
              setAccount(record);
              setIsAccountPopup(true);
            }}
            style={{ fontSize: "20px", color: "#ffc107", cursor: "pointer" }}
          />
        </Space>
      ),
    },
    {
      title: "Remove",
      key: "remove",
      align: "center" as const,
      width: "8%",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            disabled={mutationdeleteAccounts}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => {
              handleDeleteCrawlerAccount(record._id);
            }}
          >
            <DeleteOutlined style={{ fontSize: "20px", color: "#dc3545" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const filters = createFilterData();

  return (
    <UserWrapper>
      <div className="header">
        <Tooltip placement="top" title={"Export"}>
          <Button
            onClick={() => exportCSV(dayjs(new Date()).format("YYYYMMDDHHmm"))}
            style={{
              marginRight: "5px",
            }}
            shape="round"
          >
            <DownloadOutlined />
          </Button>
        </Tooltip>
        <Filter
          filters={filters}
          onSelect={(key) => onSelectFilter(key)}
          onReset={onResetFilter}
        />
        {/* <Button
          onClick={() => {
            // setIsGroupPopup(true);
          }}
          className="delete-all"
          danger
          shape="round"
          disabled={selectedAccounts.length < 2}
        >
          Change Type
        </Button> */}

        <Popconfirm
          title="Are you sure？"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          disabled={selectedAccounts.length < 2 || mutationdeleteAccounts}
          onConfirm={() => {
            handleDeletesCrawlerAccounts(deletesAccounts);
          }}
        >
          <Button
            onClick={() => {
              // setIsGroupPopup(true);
            }}
            type="primary"
            className="delete-all"
            danger
            shape="round"
            disabled={selectedAccounts.length < 2 || mutationdeleteAccounts}
          >
            Delete All
          </Button>
        </Popconfirm>

        <Button
          onClick={() => {
            setType("create");
            setIsAccountPopup(true);
          }}
          className="create"
          type="primary"
          shape="round"
        >
          Create
        </Button>
      </div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        loading={loading}
        scroll={{ y: 600 }}
        columns={columns}
        dataSource={newDataAccounts}
        pagination={false}
      />
      <Pagination
        style={{
          marginTop: "10px",
        }}
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSizeOptions={["10", "20", "50", "100"]}
        defaultPageSize={50}
        showSizeChanger={true}
        onChange={(pagePages, pageSizePages) => {
          if (pageSizePages !== pageSize) {
            let filter, sort;
            if (status || platform) {
              filter = {
                status: status ? status : undefined,
                platform: platform ? platform : undefined,
              };
            }
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined,
              };
            }

            setPageSize(pageSizePages);
            refetch({
              input: {
                filter,
                sort,
                limit: pageSizePages || 50,
                skip: (pageSizePages || 50) * (pagePages - 1 || 0),
              },
            });
          }
          if (pagePages !== currentPage) {
            let filter, sort;
            if (status || platform) {
              filter = {
                status: status ? status : undefined,
                platform: platform ? platform : undefined,
              };
            }
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined,
              };
            }
            setCurrentPage(pagePages);
            refetch({
              input: {
                filter,
                sort,
                limit: pageSizePages || 50,
                skip: (pageSizePages || 50) * (pagePages - 1 || 0),
              },
            });
          }
        }}
      />
      ;
      <AccountModal
        type={type}
        account={account}
        mutationLoadingCreate={mutationLoadingCreate}
        mutationLoadingUpdate={mutationLoadingUpdate}
        handleCreateCrawlerAccounts={handleCreateCrawlerAccounts}
        handleUpdateCrawlerAccount={handleUpdateCrawlerAccount}
        isAccountPopup={isAccountPopup}
        setIsAccountPopup={setIsAccountPopup}
      />
    </UserWrapper>
  );
};

export default Profiles;
