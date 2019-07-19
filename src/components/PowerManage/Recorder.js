import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Tabs, DatePicker, Button } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Recorder.less';

import BasicTable from '@/components/BasicTable';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function tableBox(salesData, columns, totalAmount, handleBasicTableChange) {
  return (
    <TabPane tab="成本支出记录" key="consts">
      <BasicTable data={salesData} columns={columns} onChange={handleBasicTableChange}>
        <div className={styles.tableHeader}>
          <Button type="dashed" className={styles.btnsize}>
            +支出
          </Button>
          <div className={styles.amount}>
            <span>查询结果汇总</span>
            <span>{`￥${numeral(totalAmount).format('0,0')}`}</span>
          </div>
        </div>
      </BasicTable>
    </TabPane>
  );
}
@connect(({ loading, chart, global }) => ({
  chart,
  totalAmount: global.totalAmount,
  submitting: loading.effects['form/submitRegularForm'],
}))
class Recorder extends PureComponent {
  columns = [
    {
      title: '支出金额',
      dataIndex: 'money',
      render: val => `${val}元`,
    },
    {
      title: '续费操作人',
      dataIndex: 'owner',
    },
    {
      title: '续费操作时间',
      dataIndex: 'createdAt',
      render: val => moment(val).format('YYYY-MM-DD'),
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
            {tableBox(salesData, this.columns, totalAmount, handleBasicTableChange)}
          </Tabs>
        </div>
      </Card>
    );
  }
}

export default Recorder;
