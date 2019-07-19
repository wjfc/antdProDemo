import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { getTimeDistance } from '@/utils/utils';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddPower.less';
import { TimelineChart } from '@/components/Charts';

const VideoRecorder = React.lazy(() => import('@/components/PowerManage/VideoRecorder'));
const SalesCard = React.lazy(() => import('@/components/PowerManage/Trend'));
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({ loading, chart, rule3 }) => ({
  chart,
  rule3,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class Anaylsis extends PureComponent {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      dispatch({
        type: 'rule3/fetch',
      });
    });
  }

  // 时间选择器
  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/rule3',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/rule3',
    });
  };

  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

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
      type: 'rule3/fetch',
      payload: params,
    });
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { submitting, loading, rule3, chart } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const { salesData, offlineChartData } = chart;

    const salesData2 = rule3.data;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 3,
        },
        sm: {
          span: 3,
        },
      },
      wrapperCol: {
        xs: {
          span: 14,
        },
        sm: {
          span: 14,
        },
        md: {
          span: 14,
        },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
      },
    };

    return (
      <PageHeaderWrapper title="分析能力" content="分析服务的基础能力">
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={salesData}
            isActive={this.isActive}
            handleRangePickerChange={this.handleRangePickerChange}
            loading={loading}
            selectDate={this.selectDate}
          />
        </Suspense>

        <Card style={{ marginTop: 24 }}>
          <Suspense fallback={null}>
            <VideoRecorder
              rangePickerValue={rangePickerValue}
              salesData={salesData2}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              handleBasicTableChange={this.handleBasicTableChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <Suspense fallback={null}>
            {offlineChartData.length > 0 && (
              <TimelineChart
                height={400}
                data={offlineChartData}
                titleMap={{
                  y1: '成本',
                  y2: '支出',
                }}
              />
            )}
          </Suspense>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Anaylsis;
