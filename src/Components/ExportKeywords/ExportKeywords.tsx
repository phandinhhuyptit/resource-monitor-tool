import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Button, Popconfirm, Tooltip } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import { KEY_WORDS } from '../../graphqls/Queries/Query';
import * as XLSX from 'xlsx';
// import './Filter.scss'

interface Props {
  total: number;
}

const Export: React.FC<Props> = (props) => {
  const { total } = props;
  const [isExport, setExport] = useState<boolean>(false);
  const [sources, setSources] = useState<any>([]);

  const [loadKeywords, { called, loading, data }] = useLazyQuery(KEY_WORDS, {
    variables: {
      input: {
        limit: total > 5000 ? 5000 : total,
        skip: 0
      }
    },
    fetchPolicy: 'network-only'
  });

  const exportCSV = (fileName, dataKeywords) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const csvData = dataKeywords.map((keyword) => ({
      Domain: keyword.domain,
      Keyword: keyword.keyword,
      'Last Edit Time': Number(keyword.last_edit_time)
        ? dayjs(Number(keyword.last_edit_time)).format('DD/MM/YYYY')
        : '',
      'Last Facebook Search Crawl Time': Number(keyword.last_facebook_search_crawl_time)
        ? dayjs(Number(keyword.last_facebook_search_crawl_time)).format('DD/MM/YYYY')
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
    const dataKeywords = data?.getKeywords?.data?.keywords || [];
    if (dataKeywords.length && !loading) {
      // setSources(dataGroups);
      exportCSV(dayjs(new Date()).format('YYYYMMDDHHmm'), dataKeywords);
      setExport(false);
    }
  }, [data, loading]);

  return (
    <Popconfirm
      title="Are you sure？"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      disabled={loading}
      onConfirm={() => {
        loadKeywords();
        setExport(true);
      }}
    >
      <Tooltip placement="top" title={'Export'}>
        <Button
          loading={loading}
          disabled={loading}
          style={{
            marginRight: '5px'
          }}
          shape="round"
        >
          <DownloadOutlined />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default Export;
