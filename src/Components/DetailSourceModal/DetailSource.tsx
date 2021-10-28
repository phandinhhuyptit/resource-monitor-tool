import React from 'react';
import { Modal, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import loGet from 'lodash/get';
import moment from 'moment';
import dayjs from 'dayjs';
import DetailModal from './DetailSource.styled';
// import './BookingModal.scss'

const DetailSource = (props: any) => {
  const { group, setIsDetailPopup, isDetailPopup, type } = props;
  return (
    <DetailModal title={'Detail Source'} visible={isDetailPopup} footer={null} onCancel={() => setIsDetailPopup(false)}>
      <div className="detail-booking">
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">
              {' '}
              {type} Name:{' '}
              <a rel="noreferrer" target="_blank" href={`https://www.fb.com/${group?.id ? group?.id : ''}`}>{`${loGet(
                group,
                ['name'],
                ''
              )}`}</a>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">
              Last post time:{' '}
              {Number(group?.last_updated_time) ? dayjs(Number(group?.last_updated_time)).format('DD/MM/YYYY') : ''}
            </h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">
              Created time: {Number(group?.created_time) ? dayjs(Number(group.created_time)).format('DD/MM/YYYY') : ''}
            </h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">Created by: {`${loGet(group, ['created_by'], '')}`}</h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">
              Last edit time:{' '}
              {Number(group?.last_edited_time) ? dayjs(Number(group.last_edited_time)).format('DD/MM/YYYY') : ''}
            </h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">Editted by: {`${loGet(group, ['edited_by'], '')}`}</h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">List Tag: {`${loGet(group, ['tag'], '')}`}</h5>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h5 className="detail-booking__title-customer">Status: {`${loGet(group, ['status'], '')}`}</h5>
          </Col>
        </Row>
      </div>
    </DetailModal>
  );
};

export default DetailSource;
