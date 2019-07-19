import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Tabs, DatePicker, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './VideoRecorder.less';

import BasicTable from '@/components/BasicTable';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function tableBox(salesData, columns, handleBasicTableChange) {
  return (
    <TabPane
      tab="
    视频对讲详细记录"
      key="consts"
    >
      <BasicTable data={salesData} columns={columns} onChange={handleBasicTableChange}>
        <div className={styles.tableHeader}>
          <Button type="primary" className={styles.btnsize}>
            导出
          </Button>
        </div>
      </BasicTable>
    </TabPane>
  );
}
@connect(({ loading, chart }) => ({
  chart,
  submitting: loading.effects['form/submitRegularForm'],
}))
class Recorder extends PureComponent {
  columns = [
    {
      title: '客户名称',
      dataIndex: 'guest',
      render: val => `${val}`,
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
      render: val => `${val}`,
    },
    ,
    {
      title: '能力名称',
      dataIndex: 'powerName',
      render: val => `${val}`,
    },
    {
      title: '使用时长(分钟)',
      dataIndex: 'usedTime',
      render: val => `${val}`,
      sorter: true,
    },
    {
      title: '接通时间',
      dataIndex: 'createdAt',
      render: val => moment(val).format('YYYY-MM-DD'),
      sorter: true,
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
  ];

  render() {
    const {
      rangePickerValue,
      isActive,
      handleRangePickerChange,
      handleBasicTableChange,
      loading,
      selectDate,
      salesData,
      totalAmount,
    } = this.props;

    return (
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.Recorder}>
          <Tabs
            tabBarExtraContent={
              <div className={styles.salesExtraWrap}>
                <div className={styles.salesExtra}>
                  <a className={isActive('month')} onClick={() => selectDate('month')}>
                    <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                  </a>
                  <a className={isActive('year')} onClick={() => selectDate('year')}>
                    <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                  </a>
                </div>
                <RangePicker
                  value={rangePickerValue}
                  onChange={handleRangePickerChange}
                  style={{ width: 256 }}
                />
              </div>
            }
            size="large"
            tabBarStyle={{ marginBottom: 24 }}
          >
            {tableBox(salesData, this.columns, handleBasicTableChange)}
          </Tabs>
        </div>
      </Card>
    );
  }
}

export default Recorder;
