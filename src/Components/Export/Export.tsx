import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery } from '@apollo/client';
import dayjs from 'dayjs';
import { Button, Popconfirm, Tooltip } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import * as FileSaver from 'file-saver';
import { FB_SOURCES } from '../../graphqls/Queries/Query';
import * as XLSX from 'xlsx';
// import './Filter.scss'

interface Props {
  total: number;
  type: string;
}

const Export: React.FC<Props> = (props) => {
  const { total, type } = props;
  const [isExport, setExport] = useState<boolean>(false);
  const [sources, setSources] = useState<any>([]);

  const [loadFbSources, { called, loading, data }] = useLazyQuery(FB_SOURCES, {
    variables: {
      input: {
        filter: {
          edge_type: type
        },
        limit: total > 5000 ? 15000 : total,
        skip: 0
      }
    },
    fetchPolicy: 'network-only'
  });

  const exportCSV = (fileName, dataSource) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const csvData = dataSource.map((item) => ({
      Name: item.name,
      ID: item.id ? item.id : '',
      Priority: item.priority,
      Privacy: item.privacy,
      'Edge Type': item.edge_type,
      'Last Updated Time': Number(item.last_updated_time)
        ? dayjs(Number(item.last_updated_time)).format('DD/MM/YYYY')
        : '',
      'last Crawled Time': Number(item.last_crawled_time)
        ? dayjs(Number(item.last_crawled_time)).format('DD/MM/YYYY')
        : '',
      'Created Time': Number(item.created_time) ? dayjs(Number(item.created_time)).format('DD/MM/YYYY') : '',
      'Last Edited Time': Number(item.last_edited_time) ? dayjs(Number(item.last_edited_time)).format('DD/MM/YYYY') : ''
    }));
    const ws = [XLSX.utils.json_to_sheet(csvData)];
    const wb = {
      Sheets: { Groups: ws[0] },
      SheetNames: ['Groups']
    };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${type}s_${fileName}` + fileExtension);
  };

  useEffect(() => {
    const dataGroups = data?.getFbSources?.data?.source || [];
    if (dataGroups.length && !loading) {
      // setSources(dataGroups);
      exportCSV(dayjs(new Date()).format('YYYYMMDDHHmm'), dataGroups);
      setExport(false);
    }
  }, [data, loading]);

  return (
    <Popconfirm
      title="Are you sure？"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      disabled={loading}
      onConfirm={() => {
        loadFbSources();
        setExport(true);
      }}
    >
      <Tooltip placement="top" title={'Export'}>
        <Button
          loading={loading}
          disabled={loading}
          onClick={() => {}}
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
