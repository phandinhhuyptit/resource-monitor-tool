import React, { useState, useEffect } from 'react';
import { UserWrapper } from './group.styles';
import { Table, Tag, Radio, Space, Popconfirm, Pagination, Select, Input, Tooltip, Row } from 'antd';
import ReactTooltip from 'react-tooltip';
import { useQuery, useMutation } from '@apollo/client';
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  DownloadOutlined,
  SearchOutlined,
  FileSearchOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { FB_SOURCES } from '../../graphqls/Queries/Query';
import { CREATE_SOURCE, DELETE_SOURCE, UPDATE_SOURCES } from '../../graphqls/Mutations/mutation';
import Filter from '../../Components/Filter';
import { v4 as uuidv4 } from 'uuid';
import Export from '../../Components/Export';
import ChangeTypeModal from '../../Components/ChangeTypeModal';
import GroupModal from '../../Components/GroupModal';
import AddMutipleModal from '../../Components/AddMutipleModal';
import { NotificationManager } from 'react-notifications';
import DetailSourceModal from '../../Components/DetailSourceModal';
import useDebounce from '../../Hooks/useDebounce';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
interface Group {
  name: string;
  groupId: string;
  priority: string;
  privacy: string;
  lastPostTime: string;
  lastEditTime: string;
  key?: string | number;
}

interface Params {
  pageSize: number;
  currentPage: number;
  priority?: string;
  sortType?: string;
  sortBy?: string;
  searchId?: any;
  level?: any;
}

const defaultPriority = ['NORMAL', 'HIGH', 'KOLS'];
const defaultSortTypes = ['ASC', 'DESC'];
const levels = [1, 2, 3, 4, 5];
const defaultSortBy = ['priority', 'last_edit_time', 'last_crawled_time', 'created_time'];
const { Option } = Select;

const Profiles = () => {
  const [isGroupPopup, setIsGroupPopup] = useState<boolean>(false);
  const [isDetailPopup, setIsDetailPopup] = useState<boolean>(false);
  const [selectedAccounts, setSelectedAccount] = useState<Array<any>>([]);
  const [dataGroups, setDataGroups] = useState<Array<any>>([]);
  const [isChangeTypePopup, setIsChangeTypePopup] = useState<boolean>(false);
  const [isAddMutiplePopup, setIsAddMutiplePopup] = useState<boolean>(false);
  const [deletesGroups, setDeletesGroups] = useState<Array<string>>([]);
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);
  const [group, setGroup] = useState<any>(null);
  const [priority, setPriority] = useState('');
  const [sortType, setSortType] = useState<string>('');
  const [searchId, setSearchId] = useState<Array<string>>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [level, setLevel] = useState<any>('');
  const [totalData, setTotalData] = useState<any>(null);
  const [filtersIndentify, setFiltersIndentify] = useState<any>([
    { id: uuidv4(), param: 'priority', isChecked: false },
    { id: uuidv4(), param: 'sort', isChecked: false },
    // { id: uuidv4(), param: 'search', isChecked: false },
    { id: uuidv4(), param: 'level', isChecked: false }
  ]);

  const debounceSearchId = useDebounce(searchId, 1000);

  const { data, loading, error, refetch } = useQuery<any>(FB_SOURCES, {
    variables: {
      input: {
        filter: {
          edge_type: 'group'
        },
        limit: 50,
        skip: 0
      }
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true
  });

  const [createSource, { loading: mutationLoading }] = useMutation(CREATE_SOURCE, {
    update(cache, { data: { createSource } }) {
      if (createSource && createSource.status === 200) {
        NotificationManager.success('Success create', '', 4000);
        setIsGroupPopup(false);
        refetch();
      } else if (createSource && createSource.status !== 200) {
        NotificationManager.error(createSource.message, '', 4000);
      }
    }
  });

  const [deleteSources, { loading: mutationLoadingKeywords, error: mutationErrorKeywords }] = useMutation(
    DELETE_SOURCE,
    {
      update(cache, { data: { deleteSources } }) {
        if (deleteSources && deleteSources.status === 200) {
          NotificationManager.success('Success delete', '', 4000);
          setIsGroupPopup(false);
          refetch();
        } else if (deleteSources && deleteSources.status !== 200) {
          NotificationManager.error(deleteSources.message, '', 4000);
        }
      }
    }
  );

  const [updateSources, { loading: loadingUpdate }] = useMutation(UPDATE_SOURCES, {
    update(cache, { data: { updateSources } }) {
      if (updateSources && updateSources.status === 200) {
        NotificationManager.success('Success update', '', 4000);
        setIsGroupPopup(false);
        refetch();
      } else if (updateSources && updateSources.status !== 200) {
        NotificationManager.error(updateSources.message, '', 4000);
      }
    }
  });

  useEffect(() => {
    const dataGroups = data?.getFbSources?.data?.source || [];
    setDataGroups(dataGroups);
  }, [data]);

  const handleCreateSource = (inputs, reset) => {
    createSource({
      variables: {
        input: inputs
      }
    })
      .then((res) => {
        if (res?.data?.createSource?.status === 200) {
          if (reset) {
            reset();
          }
        }
      })
      .catch((error) => {
        const _error = error && error.graphQLErrors && error.graphQLErrors.length > 0 && error.graphQLErrors[0];

        if (_error) {
          NotificationManager.error(_error.message, '', 4000);
        }
      });
  };

  const fetchData = ({ pageSize, currentPage, priority, sortType, sortBy, searchId, level }: Params) => {
    let sort;
    if (sortType || sortBy) {
      sort = {
        by: sortBy ? sortBy : undefined,
        type: sortType ? sortType : undefined
      };
    }
    refetch({
      input: {
        limit: pageSize || 50,
        skip: (pageSize || 50) * (currentPage - 1 || 0),
        filter: {
          priority: priority ? priority : undefined,
          edge_type: 'group',
          ids: searchId?.length ? searchId : undefined,
          level: level ? level : undefined
        },
        sort
      }
    });
  };

  const handleDeleteSources = (id: any) => {
    deleteSources({
      variables: {
        input: {
          ids: [id]
        }
      }
    });
  };

  const handleDeletesSources = () => {
    deleteSources({
      variables: {
        input: {
          ids: deletesGroups
        }
      }
    }).then((res) => {
      if (res?.data?.deleteSources?.status === 200) {
        setSelectedAccount([]);
      }
    });
  };

  useEffect(() => {
    if (data && data?.getFbSources?.data) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetchData({ pageSize, currentPage, priority, sortType, sortBy, searchId: debounceSearchId, level });
    }
    setCurrentPage(1);
  }, [priority, sortType, sortBy, debounceSearchId, level]);

  useEffect(() => {
    const total = data?.getFbSources?.data?.total || 0;
    setTotalData(total);
  }, [data]);

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const handleUpdateGroup = (id, input) => {
    updateSources({
      variables: {
        input: {
          ids: [id],
          data_update: input
        }
      }
    }).catch((error) => {
      const _error = error && error.graphQLErrors && error.graphQLErrors.length > 0 && error.graphQLErrors[0];
      if (_error) {
        NotificationManager.error(_error.message, '', 4000);
      }
    });
  };

  const defineSort = (type: string) => {
    return type === 'priority'
      ? 'Priority'
      : type === 'last_edit_time'
      ? 'Edit Time'
      : type === 'last_crawled_time'
      ? 'Crawled Time'
      : 'Created_time';
  };

  const hanldeChangePriority = (value) => {
    setPriority(value);
  };

  const hanldeChangeSortBy = (value) => {
    setSortBy(value);
  };
  const hanldeChangeSortType = (value) => {
    setSortType(value);
  };

  const hanldeChangeLevel = (value) => {
    setLevel(value);
  };

  const renderSelectPriority = () => {
    return (
      <Select
        value={priority}
        onChange={hanldeChangePriority}
        placeholder={'Select status'}
        allowClear
        style={{ width: '100%' }}
      >
        {defaultPriority.map((priority) => (
          <Option key={`groups_${priority}`} value={priority}>
            {priority}
          </Option>
        ))}
        <Option key={`groups_all`} value="">
          All
        </Option>
      </Select>
    );
  };

  const renderSelectLevel = () => {
    return (
      <Select
        value={level}
        onChange={hanldeChangeLevel}
        placeholder={'Select status'}
        allowClear
        style={{ width: '100%' }}
      >
        {levels.map((level) => (
          <Option key={`groups_${level}`} value={level}>
            {level}
          </Option>
        ))}
        <Option key={`groups_all`} value="">
          All
        </Option>
      </Select>
    );
  };

  const renderSearchID = () => {
    return (
      <Select
        mode="tags"
        value={searchId}
        onChange={(value) => {
          setSearchId(value);
        }}
        suffixIcon={<SearchOutlined />}
        style={{ width: '100%' }}
        filterOption={false}
        allowClear={true}
        tokenSeparators={[',']}
        showArrow={false}
        // maxTagCount={5}
      />

      // <Input
      //   value={searchId}
      //   size="large"
      //   placeholder="search"
      //   allowClear
      //   prefix={<SearchOutlined />}
      //   onChange={(e) => {
      //     setSearchId(e.target.value);
      //   }}
      // />
    );
  };

  const renderSelectSort = () => {
    return (
      <>
        <Row
          style={{
            marginBottom: '5px'
          }}
        >
          <Select
            value={sortBy}
            onChange={hanldeChangeSortBy}
            placeholder={'Select'}
            allowClear
            style={{ width: '100%' }}
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
            placeholder={'Select '}
            allowClear
            style={{ width: '100%' }}
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
      if (item.param === 'priority') {
        return {
          id: item.id,
          label: 'Priority',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectPriority()
        };
      }
      if (item.param === 'sort') {
        return {
          id: item.id,
          label: 'sort',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectSort()
        };
      }

      // if (item.param === 'search') {
      //   return {
      //     id: item.id,
      //     label: 'search ID',
      //     isChecked: item.isChecked,
      //     param: item.param,
      //     component: renderSearchID()
      //   };
      // }

      if (item.param === 'level') {
        return {
          id: item.id,
          label: 'Level',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectLevel()
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
      const resetValue = filtersIndentify[index].param === 'types' ? defaultPriority : undefined;

      setFiltersIndentify([...newFiltersIndentify]);
      // this.setState({
      //   filtersIndentify,
      //   [filtersIndentify[index].param]: resetValue,
      // });

      if (!filtersIndentify[index].isChecked) {
        fetchData({ pageSize, currentPage, priority });
      }
    }
  };

  const onRow = (record) => ({
    onContextMenu: (event) => {
      console.log('record', record);
      // event.preventDefault();
      //   document.addEventListener(`click`, function onClickOutside() {
      //     that.setState({ popup: { visible: false } });
      //     document.removeEventListener(`click`, onClickOutside);
      //   })
    }
  });

  const onResetFilter = () => {
    setFiltersIndentify(
      filtersIndentify.map((item) => {
        item.isChecked = false;
        return item;
      })
    );
    setPriority('');
    setSortBy('');
    setSortType('');
    setSearchId([]);
    setLevel('');

    fetchData({ pageSize, currentPage, priority: '' });
  };

  const exportCSV = (fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const csvData = dataGroups.map((group) => ({
      Name: group.name,
      Priority: group.priority,
      Privacy: group.privacy,
      'Edge Type': group.edge_type,
      'Last Updated Time': Number(group.last_updated_time)
        ? dayjs(Number(group.last_updated_time)).format('DD/MM/YYYY')
        : '',
      'last Crawled Time': Number(group.last_crawled_time)
        ? dayjs(Number(group.last_crawled_time)).format('DD/MM/YYYY')
        : '',
      'Created Time': Number(group.created_time) ? dayjs(Number(group.created_time)).format('DD/MM/YYYY') : '',
      'Last Edited Time': Number(group.last_edited_time)
        ? dayjs(Number(group.last_edited_time)).format('DD/MM/YYYY')
        : ''
    }));
    const ws = [XLSX.utils.json_to_sheet(csvData)];
    const wb = {
      Sheets: { Groups: ws[0] },
      SheetNames: ['Groups']
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `groups_${fileName}` + fileExtension);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedAccount(selectedRows);
      const groups = selectedRows.reduce((acc, value) => {
        acc.push(value._id);
        return acc;
      }, []);
      setDeletesGroups(groups);
    }
  };

  // const dataKeywords = data.reduce((acc, value, index) => {
  //   const newValue = Object.assign({}, value, {
  //     key: index,
  //   });
  //   acc.push(newValue);
  //   return acc;
  // }, []);
  const newDataKeywords = dataGroups.length
    ? dataGroups.reduce((acc, value) => {
        const newValue = Object.assign({}, value, {
          key: value._id
        });
        acc.push(newValue);
        return acc;
      }, [])
    : [];
  const total = data?.getFbSources?.data?.total || 0;
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'No.',
      render: (value: any, item: any, index: any) => <a> {index + 1 + (currentPage - 1) * pageSize}</a>,
      width: '5%',
      align: 'center' as const
    },
    {
      title: 'Group Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: '17%'
    },
    {
      title: 'Group ID',
      key: 'id',
      dataIndex: 'id',
      align: 'center' as const,
      render: (value: any) => (
        <span>
          <a rel="noreferrer" target="_blank" href={`https://www.fb.com/${value}`}>
            {value}
          </a>
        </span>
      ),
      width: '15%'
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      align: 'center' as const,
      render: (value: any) => <span>{value}</span>
    },
    {
      title: 'Privacy',
      key: 'privacy',
      dataIndex: 'privacy',
      align: 'center' as const,
      render: (value: any) => <span>{value}</span>
    },
    {
      title: 'Last Crawled Time',
      key: 'lastCrawledTime',
      width: '10%',
      dataIndex: 'last_crawled_time',
      align: 'center' as const,
      render: (value: any) => {
        const date = Number(value) ? dayjs(Number(value)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Last Edited Time',
      key: 'lastEditedTime',
      width: '10%',
      dataIndex: 'last_edited_time',
      align: 'center' as const,
      render: (value: any) => {
        const date = Number(value) ? dayjs(Number(value)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Last Post Time',
      key: 'lastUpdatedTime',
      dataIndex: 'last_updated_time',
      width: '10%',
      align: 'center' as const,
      render: (value: any) => {
        const date = Number(value) ? dayjs(Number(value)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      align: 'center' as const,
      render: (value: any) => {
        return <span>{value}</span>;
      }
    },
    // {
    //   title: 'Edit',
    //   key: 'edit',
    //   align: 'center' as const,
    //   render: (text: string, record: any) => (
    //     <Space size="middle">
    //       <EditOutlined
    //         onClick={() => {
    //           setType('edit');
    //           setGroup(record);
    //           setIsGroupPopup(true);
    //         }}
    //         style={{ fontSize: '20px', color: '#ffc107', cursor: 'pointer' }}
    //       />
    //     </Space>
    //   ),
    //   width: '5%'
    // },
    {
      title: 'Action',
      key: 'Action',
      align: 'center' as const,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Tooltip placement="top" title={'Detail'}>
            <FileSearchOutlined
              onClick={() => {
                setGroup(record);
                setIsDetailPopup(true);
              }}
              style={{ fontSize: '20px', color: '#16a085', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip placement="top" title={'Edit'}>
            <EditOutlined
              onClick={() => {
                setType('edit');
                setGroup(record);
                setIsGroupPopup(true);
              }}
              style={{ fontSize: '20px', color: '#ffc107', cursor: 'pointer' }}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
              handleDeleteSources(record._id);
            }}
          >
            <Tooltip placement="top" title={'Remove'}>
              <DeleteOutlined style={{ fontSize: '20px', color: '#dc3545' }} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
      width: '10%'
    }
  ];
  const filters = createFilterData();

  return (
    <UserWrapper>
      <div className="header">
        <div className="menu-left">
          <p> Total Groups: {totalData} </p>
        </div>
        <div className="menu-middle">
          <p className="text-search"> Search ID</p>
          <Select
            mode="tags"
            value={searchId}
            onChange={(value) => {
              setSearchId(value);
            }}
            suffixIcon={<SearchOutlined />}
            style={{ width: '85%' }}
            filterOption={false}
            allowClear={true}
            tokenSeparators={[',']}
            showArrow={false}
            maxTagCount={4}
          />
        </div>
        <div className="menu-right">
          <Export total={totalData} type={'group'} />
          <Filter filters={filters} onSelect={(key) => onSelectFilter(key)} onReset={onResetFilter} />
          <Button
            onClick={() => {
              setIsAddMutiplePopup(true);
            }}
            type="primary"
            className={`mutiple`}
            shape="round"
          >
            Add Mutiple
          </Button>
          <Button
            onClick={() => {
              setIsChangeTypePopup(true);
            }}
            type="primary"
            className={`change ${selectedAccounts.length < 1 ? 'disable' : ''}`}
            shape="round"
            disabled={selectedAccounts.length < 1}
          >
            Change Type
          </Button>
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            disabled={selectedAccounts.length < 2}
            onConfirm={() => {
              handleDeletesSources();
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
              disabled={selectedAccounts.length < 2}
            >
              Delete All
            </Button>
          </Popconfirm>
          <Button
            onClick={() => {
              setType('create');
              setIsGroupPopup(true);
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
        style={{
          border: '1px solid #f0f0f0'
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        scroll={{ y: 600, x: 1500 }}
        columns={columns}
        loading={loading}
        components={{
          body: {
            row: (props) => {
              const description = props?.children[0]?.props?.record?.description ?? '';
              return <tr data-for="description" data-tip={`${description}`} {...props} />;
            }
          }
        }}
        dataSource={newDataKeywords}
        pagination={false}
      />
      <Pagination
        style={{
          marginTop: '10px'
        }}
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSizeOptions={['10', '20', '50', '100', '500']}
        defaultPageSize={50}
        showSizeChanger={true}
        onChange={(pageGroups, pageSizeGroups) => {
          if (pageSizeGroups !== pageSize) {
            setPageSize(pageSizeGroups);
            let sort;
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined
              };
            }
            refetch({
              input: {
                filter: {
                  priority: priority ? priority : undefined,
                  edge_type: 'group',
                  ids: searchId?.length ? searchId : undefined,
                  level: level ? level : undefined
                },
                sort,
                limit: pageSizeGroups || 50,
                skip: (pageSizeGroups || 50) * (pageGroups - 1 || 0)
              }
            });
          }
          if (pageGroups !== currentPage) {
            let sort;
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined
              };
            }
            setCurrentPage(pageGroups);
            refetch({
              input: {
                filter: {
                  priority: priority ? priority : undefined,
                  edge_type: 'group',
                  ids: searchId?.length ? searchId : undefined,
                  level: level ? level : undefined
                },
                sort,
                limit: pageSizeGroups || 50,
                skip: (pageSizeGroups || 50) * (pageGroups - 1 || 0)
              }
            });
          }
        }}
      />
      <GroupModal
        loadingUpdate={loadingUpdate}
        type={type}
        group={group}
        handleUpdateGroup={handleUpdateGroup}
        mutationLoading={mutationLoading}
        handleCreateSource={handleCreateSource}
        isGroupPopup={isGroupPopup}
        setIsGroupPopup={setIsGroupPopup}
      />
      <AddMutipleModal
        type={'group'}
        handleUpdateGroup={handleUpdateGroup}
        mutationLoading={mutationLoading}
        handleCreateSource={handleCreateSource}
        isGroupPopup={isAddMutiplePopup}
        setIsGroupPopup={setIsAddMutiplePopup}
      />
      <ChangeTypeModal
        type={'group'}
        refetch={refetch}
        setSelectedAccount={setSelectedAccount}
        setDeletesGroups={setDeletesGroups}
        ids={deletesGroups}
        isChangeTypePopup={isChangeTypePopup}
        setIsChangeTypePopup={setIsChangeTypePopup}
      />
      <DetailSourceModal
        type={'Group'}
        group={group}
        setIsDetailPopup={setIsDetailPopup}
        isDetailPopup={isDetailPopup}
      />
      <ReactTooltip id="description" place="top" effect="solid" multiline={true} />
    </UserWrapper>
  );
};

export default Profiles;
