import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import styles from './Analysis.less';
import { ChartCard, Pie100, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, visitData }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.video-used" defaultMessage="Total Sales" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => numeral(12456).format('0,0')}
        footer={[
          <Field
            label={<FormattedMessage id="app.analysis.total-cost" />}
            value={`￥${numeral(12423).format('0,0')}`}
            key={0}
          />,
          <Field
            label={<FormattedMessage id="app.analysis.total-expend" />}
            value={`￥${numeral(12423).format('0,0')}`}
            key={1}
          />,
        ]}
        contentHeight={46}
      >
        <Trend style={{ marginRight: 16 }} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="app.analysis.wechat-used" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={numeral(356).format('0,0')}
        footer={[
          <Field
            label={<FormattedMessage id="app.analysis.total-cost" />}
            value={`￥${numeral(12423).format('0,0')}`}
            key={0}
          />,
          <Field
            label={<FormattedMessage id="app.analysis.total-expend" />}
            value={`￥${numeral(12423).format('0,0')}`}
            key={1}
          />,
        ]}
        contentHeight={46}
      >
        <Row>
          <Col span={12}>
            <div style={{ marginTop: 60, marginLeft: 10 }}>
              {`${formatMessage({ id: 'app.analysis.use' })}:6/8`}
            </div>
          </Col>
          <Col span={12}>
            <Pie100 height={90} percent={75} />
          </Col>
        </Row>
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
