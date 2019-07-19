import React, { Component } from 'react';
import { connect } from 'dva';
import CryptoJS from 'crypto-js/md5';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Modal, Icon, Button, Row, Col, Form, Input } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const FormItem = Form.Item;
const { UserName, Password, Submit, Captcha } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
@Form.create()
class LoginPage extends Component {
  state = {
    type: 'account',
    remberPassword: true,
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          userName: values.userName,
          password: CryptoJS(values.password).toString(),
          code: values.code,
          systemId: 2,
        },
      });
    }
  };

  changeremberPassword = e => {
    this.setState({
      remberPassword: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    // admin or user & ant.design
    const { login, submitting, form } = this.props;
    const { type, remberPassword } = this.state;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div className="loginBox">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage(formatMessage({ id: 'app.login.message-invalid-credentials' }))}
            <UserName
              name="userName"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </div>

          <div>
            <Row gutter={8} className={styles.captcha}>
              <Col span={6}>
                <Checkbox
                  checked={remberPassword}
                  onChange={this.changeremberPassword}
                  className={styles.remberCheck}
                >
                  {formatMessage({ id: 'app.rember.password' })}
                </Checkbox>
              </Col>
              <Col span={18}>
                <Captcha onGetCaptcha={() => console.log('Get captcha!')} name="code" />
              </Col>
            </Row>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
