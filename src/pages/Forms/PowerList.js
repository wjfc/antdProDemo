import React, { PureComponent, Suspense } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import { Form, Input, Card, Icon, Tooltip, List, Switch, Avatar, Button, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './style.less';

const { Meta } = Card;

const FormItem = Form.Item;
const Search = Input.Search;
@connect(({ loading, manage }) => ({ manage, loading }))
@Form.create()
class BasicForms extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    requestAnimationFrame(() => {
      dispatch({
        type: 'manage/getPowerManage',
        payload: {},
      });
    });
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  editHandle = item => {
    const id = item ? item.id : '';
    router.push(`/systemRole/edit?id=${id}`);
  };

  analysisHandle = item => {
    router.push('/systemRole/update');
  };

  delHandle = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'manage/delPowerManage',
      payload: { id: item.id },
      callback: res => {
        dispatch({
          type: 'manage/getPowerManage',
          payload: {},
        });
      },
    });
  };

  handleFormSubmit = v => {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'manage/getPowerManageByUsername',
    //   payload: { username: v },
    // });
  };

  render() {
    const { manage } = this.props;

    const list = manage.data ? manage.data.data.recordList : [];
    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入角色名称"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    return (
      <PageHeaderWrapper title="角色管理" content={mainSearch}>
        <Suspense>
          {list && (
            <List
              className={styles.powerWrapper}
              grid={{
                gutter: 10,
                xs: 1,
                sm: 2,
                xl: 3,
              }}
              dataSource={['', ...list]}
              renderItem={item =>
                item ? (
                  <List.Item>
                    <Card
                      actions={[
                        <Switch
                          checkedChildren="启用"
                          unCheckedChildren="关闭"
                          defaultChecked={item.going === 1}
                        />,
                        <a onClick={this.editHandle.bind(this, item)}>编辑</a>,
                        <a onClick={this.analysisHandle.bind(this, item)}>分析</a>,
                        <a onClick={this.delHandle.bind(this, item)}>删除</a>,
                      ]}
                    >
                      <Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={item.title}
                      />
                      <div className={styles.cardInfo}>
                        <ul className={styles.title}>
                          <li>用户名称</li>
                          <li>创建时间</li>
                          <li>修改时间</li>
                        </ul>
                        <ul className={styles.desc}>
                          <li>{item.username}</li>
                          <li>{moment(item.gmtCreate).format('YYYY-MM-DD')}</li>
                          <li>{moment(item.gmtModify).format('YYYY-MM-DD')}</li>
                        </ul>
                      </div>
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button
                      type="dashed"
                      className={styles.newButton}
                      onClick={this.editHandle.bind(this, null)}
                    >
                      <Icon type="plus" /> 新增角色
                    </Button>
                  </List.Item>
                )
              }
            />
          )}
        </Suspense>
      </PageHeaderWrapper>
    );
  }
}

export default BasicForms;
