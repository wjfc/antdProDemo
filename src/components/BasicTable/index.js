import React, { PureComponent, Fragment, Children } from 'react';
import { Table, Alert } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}
@connect()
class BasicTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data = {}, subTitle, dispatch, children, rowKey, ...rest } = this.props;

    const { list = [], pagination } = data;
    const _list = JSON.parse(JSON.stringify(list));
    const totalMount = 0;
    // _list
    //   .slice(
    //     (pagination.current - 1) * pagination.pageSize,
    //     pagination.current * pagination.pageSize
    //   )
    //   .forEach(v => {
    //     totalMount += v.money;
    //   });
    list &&
      dispatch({
        type: 'global/saveAmount',
        payload: totalMount,
      });
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showLessItems: true,
      ...pagination,
    };

    return (
      <div className={styles.BasicTable}>
        {subTitle ? <div className={styles.subtitle}>{subTitle}</div> : ''}
        {children || ''}
        <Table
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default BasicTable;
