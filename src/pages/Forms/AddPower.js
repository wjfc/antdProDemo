import React, { PureComponent, Suspense } from 'react';
import CryptoJS from 'crypto-js/md5';
import moment from 'moment';
import { connect } from 'dva';
import router from 'umi/router';
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
  message,
} from 'antd';

import { getTimeDistance } from '@/utils/utils';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './AddPower.less';

const Recorder = React.lazy(() => import('@/components/PowerManage/Recorder'));
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const initData = {
  username: '',
  password: '',
  roleName: '',
  expenditure: '',
  cost: '',
  used: '',
  going: 0,
  id: null,
  starttime: '',
  category: 'time',
  remark: '',
  endtime: '',
  ext1: null,
  ext2: null,
};
@connect(({ loading, chart, rule2, manage }) => ({
  chart,
  rule2,
  manage,
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
    id: '',
    showSuccess: false,
  };

  componentDidMount() {
    const { dispatch, location } = this.props;
    const id = location.query.id;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetch',
      });
      dispatch({
        type: 'rule2/fetch',
      });
    });
    if (!id) return false;
    this.setState(
      {
        id,
      },
      () => {
        dispatch({
          type: 'manage/getPowerManageById',
          payload: { id: this.state.id },
        });
      }
    );
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      const { username, password, roleName } = values;
      const parames = {
        id: this.state.id,
        username,
        password: CryptoJS(password).toString(),
        roleVOS: roleName,
      };
      if (parames.id && parames.id != '') {
        // 更新
        dispatch({
          type: 'manage/updatePowerManage',
          payload: parames,
          callback: res => {},
        });
      } else {
        // 添加
        dispatch({
          type: 'manage/addPowerManage',
          payload: parames,
          callback: res => {},
        });
      }
    });
  };

  // 获取选择类型
  getSelectVal(val) {
    switch (val) {
      case 'month':
        return '按包月收费';
      case 'time':
        return '按次收费';
      default:
    }
  }

  getRangePicker(starttime, endtime) {
    if (starttime) {
      return [moment(starttime), moment(endtime)];
    }
    return [];
  }

  // 时间选择器
  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });

    dispatch({
      type: 'chart/rule2',
    });
  };

  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/rule2',
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
      type: 'rule2/fetch',
      payload: params,
    });
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey, showSuccess } = this.state;
    const { submitting, loading, rule2, manage, location } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    if (location.query.id && manage.selectData) {
      var selectData = manage.selectData.data;
    } else {
      var selectData = initData;
    }
    const salesData = rule2.data;
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
      <PageHeaderWrapper title="添加角色" content="添加服务的基础角色">
        {selectData && (
          <Card bordered={false} title="基本信息">
            <Form
              onSubmit={this.handleSubmit}
              hideRequiredMark
              style={{
                marginTop: 8,
              }}
            >
              <Row className={styles.basicRow}>
                <Col span={12}>
                  {/** 名称 */}
                  <FormItem {...formItemLayout} label="用户名">
                    {getFieldDecorator('username', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'validation.username.required' }),
                        },
                      ],
                      initialValue: selectData.username,
                    })(<Input placeholder="登录用户名" />)}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="密码">
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: formatMessage({ id: 'validation.password.required' }),
                        },
                      ],
                      initialValue: selectData.password,
                    })(
                      <Input
                        placeholder="请输入登录密码"
                        type="password"
                        autoComplete="new-password"
                      />
                    )}
                  </FormItem>
                  {/** 日期 */}
                  {/* <FormItem {...formItemLayout} label={<FormattedMessage id="form.date.label" />}>
                  {getFieldDecorator('date', {
                    rules: [
                      {
                        required: false,
                        message: formatMessage({ id: 'validation.date.required' }),
                      },
                    ],

                    initialValue: this.getRangePicker(selectData.starttime, selectData.endtime),
                  })(
                    <RangePicker
                      style={{
                        width: '100%',
                      }}
                      placeholder={[
                        formatMessage({ id: 'form.date.placeholder.start' }),
                        formatMessage({ id: 'form.date.placeholder.end' }),
                      ]}
                    />
                  )}
                    </FormItem> */}
                </Col>
              </Row>
              {/** 能力类型 */}
              <Row>
                <Col span={12}>
                  <FormItem {...formItemLayout} label="角色名称">
                    {getFieldDecorator('roleName', {
                      rules: [
                        {
                          required: false,
                          message: formatMessage({ id: 'validation.roleName.required' }),
                        },
                      ],
                      initialValue: selectData.roleName,
                    })(<Input placeholder="给角色起个名字" />)}
                  </FormItem>
                </Col>
              </Row>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    其他参数1 <em className={styles.optional}> (选填) </em>
                  </span>
                }
              >
                {getFieldDecorator('ext1', { initialValue: selectData.ext1 })(
                  <Input placeholder="请输入参数" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={
                  <span>
                    其他参数2 <em className={styles.optional}> (选填) </em>
                  </span>
                }
              >
                {getFieldDecorator('ext2', { initialValue: selectData.ext2 })(
                  <Input placeholder="请输入参数" />
                )}
              </FormItem>

              <FormItem
                style={{
                  marginTop: 32,
                }}
              >
                <div className={styles.btns}>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    <FormattedMessage id="form.save" />
                  </Button>
                  <Button
                    style={{
                      marginLeft: 8,
                    }}
                    onClick={() => {
                      router.go(-1);
                    }}
                  >
                    <FormattedMessage id="form.back" />
                  </Button>
                </div>
              </FormItem>
            </Form>
          </Card>
        )}
        <Card style={{ marginTop: 24 }}>
          <Suspense fallback={null}>
            <Recorder
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              handleBasicTableChange={this.handleBasicTableChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
