import React, { useState, useEffect } from 'react';
import { UserWrapper } from './Keywords.styles';
import { Table, Tag, Radio, Space, message, Popconfirm, Pagination, Select, Input, Row, Tooltip } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { KEY_WORDS } from '../../graphqls/Queries/Query';
import { CREATE_KEYWORD, DELETE_KEYWORDS, EDIT_KEYWORD } from '../../graphqls/Mutations/mutation';
import dayjs from 'dayjs';
import {
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import ChangeTypeModal from '../../Components/ChangeTypeModal';
import { Button } from 'antd';
import Filter from '../../Components/Filter';
import KeywordModal from '../../Components/KeywordModal';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import Export from '../../Components/ExportKeywords';
import useDebounce from '../../Hooks/useDebounce';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

interface Keyword {
  _id: string;
  key?: string | number | undefined;
  domain: string | null;
  keyword: string;
  last_edit_time: string;
  last_facebook_search_crawl_time: string;
  last_google_search_crawl_time: string;
  last_youtube_search_crawl_time: string;
  search_type: Array<string>;
}

interface Params {
  pageSize: number;
  currentPage: number;
  types?: string;
  searchKeyword?: string;
  sortType?: string;
  sortBy?: string;
}

const defaultTypes = ['google_search', 'facebook_search', 'linkedin_search'];
const defaultSortTypes = ['ASC', 'DESC'];
const defaultSortBy = [
  'last_edit_time',
  'last_google_search_crawl_time',
  'last_facebook_search_crawl_time',
  'last_youtube_search_crawl_time'
];
const { Option } = Select;

const Users = () => {
  const [isKeywordPopup, setIsKeywordPopup] = useState<boolean>(false);
  const [isChangeTypePopup, setIsChangeTypePopup] = useState<boolean>(false);
  const [dataKeywords, setDataKeywords] = useState<Array<any>>([]);
  const [keyword, setKeyword] = useState(null);
  const [selectedAccounts, setSelectedAccounts] = useState<Array<Keyword>>([]);
  const [deletesKeywords, setDeletesKeywords] = useState<Array<string>>([]);
  const [type, setType] = useState('');
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [pageSize, setPageSize] = useState<any>(50);
  const [types, setTypes] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<Array<string>>([]);
  const [sortType, setSortType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [totalData, setTotalData] = useState<any>(null);

  const [filtersIndentify, setFiltersIndentify] = useState<any>([
    { id: uuidv4(), param: 'types', isChecked: false },
    // { id: uuidv4(), param: 'searchKeyword', isChecked: false },
    { id: uuidv4(), param: 'sort', isChecked: false }
  ]);
  const debounceKeyword = useDebounce(searchKeyword, 1000);

  const { data, loading, error, refetch } = useQuery<any>(KEY_WORDS, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        limit: 50,
        skip: 0
      }
    }
  });

  const [editKeyword, { loading: mutationEditLoading }] = useMutation(EDIT_KEYWORD, {
    update(cache, { data: { editKeyword } }) {
      if (editKeyword) {
        NotificationManager.success('Success create', '', 4000);
        setIsKeywordPopup(false);
        refetch();
      }
    }
  });

  const [createKeyword, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_KEYWORD, {
    update(cache, { data: { createKeyword } }) {
      if (createKeyword) {
        NotificationManager.success('Success create', '', 4000);
        setIsKeywordPopup(false);
        refetch();
      }
    }
  });

  const [deleteKeywords, { loading: mutationLoadingKeywords, error: mutationErrorKeywords }] = useMutation(
    DELETE_KEYWORDS,
    {
      update(cache, { data: { deleteKeywords } }) {
        if (deleteKeywords && deleteKeywords.status === 200) {
          NotificationManager.success('Success delete', '', 4000);
          refetch();
        }
      }
    }
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      setSelectedAccounts(selectedRows);
      const keywords = selectedRows.reduce((acc, value) => {
        acc.push(value._id);
        return acc;
      }, []);

      setDeletesKeywords(keywords);
    }
    // getCheckboxProps: (record: Keyword) => ({
    //   disabled: record.name === "Disabled User", // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const handleCreateKeyWord = (input, reset) => {
    createKeyword({
      variables: {
        input: {
          keyword: input.keyword,
          search_type: input.search_type
        }
      }
    });
    if (reset) {
      reset();
    }
  };

  const handleDeleteKeywords = (id: any) => {
    deleteKeywords({
      variables: {
        input: {
          _ids: [id]
        }
      }
    });
  };

  const handleDeletesKeywords = (ids: any) => {
    deleteKeywords({
      variables: {
        input: {
          _ids: ids
        }
      }
    }).then((res) => {
      if (res?.data?.deleteKeywords?.status === 200) {
        setSelectedAccounts([]);
      }
    });
  };

  const handleUpdateKeyword = (input) => {
    editKeyword({
      variables: {
        input: input
      }
    }).catch((error) => {
      const _error = error && error.graphQLErrors && error.graphQLErrors.length > 0 && error.graphQLErrors[0];
      if (_error) {
        NotificationManager.error(_error.message, '', 4000);
      }
    });
  };

  const hanldeChangeStatus = (value) => {
    setTypes(value);
  };
  const hanldeChangeSortBy = (value) => {
    setSortBy(value);
  };
  const hanldeChangeSortType = (value) => {
    setSortType(value);
  };

  const defineTypes = (type: string) => {
    return type === 'google_search' ? 'google' : type === 'facebook_search' ? 'facebook' : 'linkedin';
  };
  const defineSort = (type: string) => {
    return type === 'last_edit_time'
      ? 'Edit time'
      : type === 'last_google_search_crawl_time'
      ? 'Google crawl time'
      : type === 'last_facebook_search_crawl_time'
      ? 'Facebook crawl time'
      : 'Youtbe crawl time';
  };

  const fetchData = ({ pageSize, currentPage, types, searchKeyword, sortType, sortBy }: Params) => {
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
          search_type: types ? types : undefined,
          keywords: searchKeyword?.length ? searchKeyword : undefined
        },
        sort
      }
    });
  };

  const renderSelectTypes = () => {
    return (
      <Select
        value={types}
        onChange={hanldeChangeStatus}
        placeholder={'Select status'}
        allowClear
        style={{ width: '100%' }}
      >
        {defaultTypes.map((type) => (
          <Option key={`keyword_${type}`} value={type}>
            {defineTypes(type)}
          </Option>
        ))}
        <Option key={`keyword_all`} value="">
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

  const renderSearchKeyword = () => {
    return (
      <Select
        mode="tags"
        value={searchKeyword}
        onChange={(value) => {
          setSearchKeyword(value);
        }}
        suffixIcon={<SearchOutlined />}
        style={{ width: '100%' }}
        filterOption={false}
        allowClear={true}
        tokenSeparators={[',']}
        showArrow={false}
      />
    );
  };

  const createFilterData = () => {
    return filtersIndentify.map((item) => {
      if (item.param === 'types') {
        return {
          id: item.id,
          label: 'Types',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectTypes()
        };
      }
      if (item.param === 'searchKeyword') {
        return {
          id: item.id,
          label: 'Search keyword',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSearchKeyword()
        };
      }

      if (item.param === 'sort') {
        return {
          id: item.id,
          label: 'Sort',
          isChecked: item.isChecked,
          param: item.param,
          component: renderSelectSort()
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
      const resetValue = filtersIndentify[index].param === 'types' ? defaultTypes : undefined;
      console.log('newFiltersIndentify', newFiltersIndentify);
      setFiltersIndentify([...newFiltersIndentify]);
      // this.setState({
      //   filtersIndentify,
      //   [filtersIndentify[index].param]: resetValue,
      // });

      if (!filtersIndentify[index].isChecked) {
        fetchData({ pageSize, currentPage, types });
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
    setTypes('');
    setSearchKeyword([]);
    setSortBy('');
    setSortType('');
    fetchData({ pageSize, currentPage, types: '', searchKeyword: '' });
  };

  // useEffect(() => {
  //   const _error =
  //     error &&
  //     error.graphQLErrors &&
  //     error.graphQLErrors.length > 0 &&
  //     error.graphQLErrors[0];
  //   console.log(_error);
  //   if (_error) {
  //     NotificationManager.error(_error.message, "", 4000);
  //   }
  // }, [error]);

  const exportCSV = (fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const csvData = dataKeywords.map((keyword) => ({
      Domain: keyword.domain,
      Keyword: keyword.keyword,
      'Last Edit Time': Number(keyword.last_edit_time)
        ? dayjs(Number(keyword.last_edit_time)).format('DD/MM/YYYY')
        : '',
      'Last Facebook Search Crawl Time': Number(keyword.last_facebook_search_crawl_time)
        ? dayjs(Number(keyword.keyword.last_facebook_search_crawl_time)).format('DD/MM/YYYY')
        : '',
      'Last Google Search Crawl Time': Number(keyword.last_google_search_crawl_time)
        ? dayjs(Number(keyword.last_google_search_crawl_time)).format('DD/MM/YYYY')
        : '',

      'Last Youtube Search Crawl Time': Number(keyword.last_youtube_search_crawl_time)
        ? dayjs(Number(keyword.last_youtube_search_crawl_time)).format('DD/MM/YYYY')
        : '',
      'Search Type': keyword.search_type.toString()
    }));
    const ws = [XLSX.utils.json_to_sheet(csvData)];
    const wb = {
      Sheets: { Keywords: ws[0] },
      SheetNames: ['Keywords']
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `keywords_${fileName}` + fileExtension);
  };

  useEffect(() => {
    if (data && data?.getKeywords?.data) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      fetchData({
        pageSize,
        currentPage,
        types,
        searchKeyword: debounceKeyword,
        sortType,
        sortBy
      });
      setCurrentPage(1);
    }
  }, [types, debounceKeyword, sortType, sortBy]);

  useEffect(() => {
    const dataKeywords = data?.getKeywords?.data?.keywords || [];
    setDataKeywords(dataKeywords);
  }, [data]);

  useEffect(() => {
    const total = data?.getKeywords?.data?.total || 0;

    setTotalData(total);
  }, [data]);

  const newDataKeywords = dataKeywords.length
    ? dataKeywords.reduce((acc, value) => {
        const newValue = Object.assign({}, value, {
          key: value._id
        });
        acc.push(newValue);
        return acc;
      }, [])
    : [];
  const total = data?.getKeywords?.data?.total;
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'No.',
      align: 'center' as const,
      render: (value: any, item: any, index: any) => <a>{index + 1 + (currentPage - 1) * pageSize}</a>,
      width: '5%'
    },
    {
      title: 'Name',
      dataIndex: 'keyword',
      key: 'keyword',
      width: '20%',
      align: 'center' as const
    },
    {
      title: 'Last Crawl Facebook',
      key: 'facebook',
      dataIndex: 'last_facebook_search_crawl_time',
      align: 'center' as const,
      render: (facebook: any) => {
        const date = Number(facebook) ? dayjs(Number(facebook)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Last Crawl Google',
      key: 'google',
      dataIndex: 'last_google_search_crawl_time',
      align: 'center' as const,
      render: (google: any) => {
        const date = Number(google) ? dayjs(Number(google)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Last Crawl Youtube',
      key: 'youtube',
      dataIndex: 'last_youtube_search_crawl_time',
      align: 'center' as const,
      render: (youtube: any) => {
        const date = Number(youtube) ? dayjs(Number(youtube)).format('DD/MM/YYYY') : '';
        return <span>{date}</span>;
      }
    },
    {
      title: 'Edit',
      key: 'edit',
      align: 'center' as const,
      render: (text: string, record: any) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              setType('edit');
              setKeyword(record);
              setIsKeywordPopup(true);
            }}
            style={{ fontSize: '20px', color: '#ffc107', cursor: 'pointer' }}
          />
        </Space>
      ),
      width: '5%'
    },
    {
      title: 'Remove',
      key: 'remove',
      align: 'center' as const,
      render: (text: string, record: any) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
              handleDeleteKeywords(record._id);
            }}
          >
            <DeleteOutlined style={{ fontSize: '20px', color: '#dc3545' }} />
          </Popconfirm>
        </Space>
      ),
      width: '8%'
    }
  ];
  const filters = createFilterData();
  return (
    <UserWrapper>
      <div className="header">
        <div className="menu-left">
          <p> Total Keywords: {totalData} </p>
        </div>
        <div className="menu-middle">
          <p className="text-search"> Search Keywords</p>
          <Select
            mode="tags"
            value={searchKeyword}
            onChange={(value) => {
              setSearchKeyword(value);
            }}
            suffixIcon={<SearchOutlined />}
            style={{ width: '80%' }}
            filterOption={false}
            allowClear={true}
            tokenSeparators={[',']}
            showArrow={false}
          />
        </div>
        <div className="menu-right">
          <Tooltip placement="top" title={'Export'}>
            <Export total={totalData} />
          </Tooltip>
          <Filter filters={filters} onSelect={(key) => onSelectFilter(key)} onReset={onResetFilter} />
          {/* <Button
          onClick={() => {
            setIsChangeTypePopup(true);
          }}
          type="primary"
          className={`change ${selectedAccounts.length < 2 ? "disable" : ""}`}
          shape="round"
          disabled={selectedAccounts.length < 2}
        >
          Change Type
        </Button> */}
          <Popconfirm
            title="Are you sure？"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            disabled={selectedAccounts.length < 2}
            onConfirm={() => {
              handleDeletesKeywords(deletesKeywords);
            }}
          >
            <Button type="primary" className="delete-all" danger shape="round" disabled={selectedAccounts.length < 2}>
              Delete All
            </Button>
          </Popconfirm>

          <Button
            onClick={() => {
              setType('create');
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
        style={{
          border: '1px solid #f0f0f0'
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        loading={loading}
        scroll={{ y: 600 }}
        columns={columns}
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
            let filter, sort;
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined
              };
            }
            if (types || searchKeyword) {
              filter = {
                search_type: types ? types : undefined,
                keywords: searchKeyword.length ? searchKeyword : undefined
              };
            }
            setPageSize(pageSizeGroups);
            refetch({
              input: {
                sort,
                filter,
                limit: pageSizeGroups || 50,
                skip: (pageSizeGroups || 50) * (pageGroups - 1 || 0)
              }
            });
          }
          if (pageGroups !== currentPage) {
            let filter, sort;
            if (sortType || sortBy) {
              sort = {
                by: sortBy ? sortBy : undefined,
                type: sortType ? sortType : undefined
              };
            }
            if (types || searchKeyword) {
              filter = {
                search_type: types ? types : undefined,
                keywords: searchKeyword.length ? searchKeyword : undefined
              };
            }
            setCurrentPage(pageGroups);
            refetch({
              input: {
                sort,
                filter,
                limit: pageSizeGroups || 50,
                skip: (pageSizeGroups || 50) * (pageGroups - 1 || 0)
              }
            });
          }
        }}
      />
      <KeywordModal
        type={type}
        keyword={keyword}
        handleUpdateKeyword={handleUpdateKeyword}
        mutationLoading={mutationLoading}
        handleCreateKeyWord={handleCreateKeyWord}
        isKeywordPopup={isKeywordPopup}
        setIsKeywordPopup={setIsKeywordPopup}
      />
      <ChangeTypeModal isChangeTypePopup={isChangeTypePopup} setIsChangeTypePopup={setIsChangeTypePopup} />
    </UserWrapper>
  );
};

export default Users;
