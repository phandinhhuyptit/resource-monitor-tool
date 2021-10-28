import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Menu, Button, Checkbox, Row, Col, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import FilterWrapper from "./styles";
// import './Filter.scss'

const Filter = (props) => {
  const { filters, onReset } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       visible: false,
  //     }
  //   }

  const handleVisibleChange = () => {
    setIsVisible(() => !isVisible);
  };

  const handleCheck = (id) => {
    const { onSelect } = props;
    onSelect(id);
  };

  const renderSectionFilter = (data) => (
    <Row>
      <Col span={24} xxl={10} lg={10} md={10} sm={10} xs={10}>
        {data.label}
      </Col>
      <Col span={24} xxl={14} lg={14} md={14} sm={14} xs={14}>
        {data.component}
      </Col>
    </Row>
  );

  const filtersSelected = filters.filter((filter) => filter.isChecked);

  const menuChil = (
    <Menu>
      {filters.map((filter) => (
        <Menu.Item key={`child_${filter.id}`}>
          <Checkbox
            checked={filter.isChecked}
            onChange={() => handleCheck(filter.id)}
          >
            {filter.label}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menu = (
    <Menu>
      {filtersSelected.length === 0 ? <Menu.Item>No filter</Menu.Item> : null}
      {filtersSelected.map((data) => (
        <Menu.Item key={`parent_${data.id}`}>
          {renderSectionFilter(data)}
        </Menu.Item>
      ))}

      <Menu.Item>
        <Row>
          <Col span={24} xxl={12} lg={12} md={12} sm={12} xs={12}>
            <Dropdown trigger={["click"]} overlay={menuChil}>
              <Button>Filter</Button>
            </Dropdown>
          </Col>
          <Col
            span={24}
            xxl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className="d-flex justify-content-end"
          >
            <Button onClick={onReset}>Reset</Button>
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );

  return (
    <FilterWrapper>
      <Tooltip placement="top" title={"Filter"}>
        <Dropdown
          overlayStyle={{
            width: "300px",
          }}
          overlay={menu}
          trigger={["click"]}
          onVisibleChange={handleVisibleChange}
          visible={isVisible}
          placement="bottomRight"
          overlayClassName="filter-container"
        >
          <Button
            style={{
              marginRight: "5px",
            }}
            shape="round"
            className={filtersSelected.length > 0 ? "btn-success" : ""}
          >
            <FilterOutlined />
            {filtersSelected.length === 0
              ? Filter
              : `Filtering ${filtersSelected.length} Field`}
          </Button>
        </Dropdown>
      </Tooltip>
    </FilterWrapper>
  );
};

export default Filter;
