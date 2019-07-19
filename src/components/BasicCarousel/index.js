import React, { PureComponent, Children } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Carousel } from 'antd';
import Card from './Card/index';
import styles from './index.less';

@connect(props => {
  return {
    rule2: props.rule2,
  };
})
class BasicCarousel extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'rule2/fetch',
      });
    });
  }

  render() {
    const { subTitle, rule2, ...reset } = this.props;
    const itemData = _.chunk(rule2.data.list, 6);
    return (
      <div className={styles.basicCarousel}>
        <div className={styles.subtitle}>{subTitle}</div>
        <Carousel autoplay={false} className={styles.mycarousel} dots>
          {itemData.map((v, i) => {
            return (
              <div key={i}>
                <Card dataSource={v} />
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default BasicCarousel;
