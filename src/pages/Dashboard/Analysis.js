import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import BasicTable from '@/components/BasicTable';
import BasicCarousel from '@/components/BasicCarousel';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));

@connect(props => {
  return {
    chart: props.chart,
    rule: props.rule,
    rule2: props.rule2,
    loading: props.loading.effects['chart/fetch'],
  };
})
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  columns1 = [
    {
      title: '序号',
      dataIndex: 'key',
      render: val => `${val}`,
    },
    {
      title: '客户',
      dataIndex: 'owner',
      render: val => <span style={{ color: '#1890ff' }}>{val}</span>,
    },
    {
      title: '参考成本',
      dataIndex: 'callNo',
      render: val => `${val} 万`,
      // mark to display a total number
      needTotal: true,
    },
    {
      title: '已使用分钟数',
      dataIndex: 'usedTime',
      sorter: true,
      render: val => `${val}`,
    },
    {
      title: '剩余可用分钟数',
      dataIndex: 'lastTime',
      sorter: true,
      render: val => `${val}`,
    },
  ];

  columns2 = [
    {
      title: '序号',
      dataIndex: 'key',
    },
    {
      title: '客户',
      dataIndex: 'owner',
      render: val => <span style={{ color: '#1890ff' }}>{val}</span>,
    },
    {
      title: '参考成本',
      dataIndex: 'callNo',
      render: val => `${val} 万`,
      sorter: true,

      // mark to display a total number
      needTotal: true,
    },
    {
      title: '剩余可用天数',
      dataIndex: 'lastDays',
      render: val => `${val} `,
      sorter: true,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      dispatch({
        type: 'rule/fetch',
      });
      dispatch({
        type: 'rule2/fetch',
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.reqRef);
  }

  handleBasicTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleBasicTableChange2 = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule2/fetch',
      payload: params,
    });
  };

  render() {
    const { chart, rule, rule2, loading } = this.props;

    const { visitData } = chart;

    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={visitData} />
        </Suspense>
        <Suspense>
          <BasicCarousel subTitle="消息通知" />
        </Suspense>
        <Suspense>
          <Row gutter={16}>
            <Col span={12}>
              <BasicTable
                loading={loading}
                data={rule.data}
                columns={this.columns1}
                onChange={this.handleBasicTableChange}
                subTitle="视频对讲使用情况"
              />
            </Col>
            <Col span={12}>
              <BasicTable
                loading={loading}
                data={rule2.data}
                columns={this.columns2}
                onChange={this.handleBasicTableChange2}
                subTitle="微信采集使用情况"
              />
            </Col>
          </Row>
        </Suspense>
      </GridContent>
    );
  }
}

export default Analysis;
