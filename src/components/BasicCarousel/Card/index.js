import React, { Component } from 'react';
import moment from 'moment';
import Ellipsis from '@/components/Ellipsis';
import { Row, Col } from 'antd';
import infoImg from '@/assets/iconImg/u417.png';
import styles from './index.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
};
function CardItem(props) {
  const { data } = props;
  return (
    <div className="cardItem">
      <div style={{ flex: 1 }} className="cardLeft">
        <img src={infoImg} alt="" style={{ width: 48 }} />
      </div>
      <div style={{ flex: 4, display: 'flex', flexDirection: 'column' }} className="cardRight">
        <div style={{ display: 'flex', height: 26, lineHeight: '26px' }}>
          <h3 style={{ marginRight: 10 }}>{data.title}</h3>
          <p>{moment(data.updatedAt).format('YYYY-MM-DD')}</p>
        </div>
        <Ellipsis lines={2}>
          <div style={{ fontSize: 12 }} style={{ textAlign: 'left', fontSize: 13 }}>
            {data.desc}
          </div>
        </Ellipsis>
      </div>
    </div>
  );
}

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dataSource } = this.props;

    return (
      <div className={styles.cardBox}>
        <Row gutter={20}>
          {dataSource.map(v => {
            return (
              <Col span={8} key={v.key} {...topColResponsiveProps}>
                <CardItem data={v} />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default Card;
