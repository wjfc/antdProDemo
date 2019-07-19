import { Skeleton, Switch, Card, Icon, Avatar } from 'antd';
import { connect } from 'dva';

const { Meta } = Card;
@connect()
class EditCard extends React.Component {
  render() {
    return (
      <div>
        <Card>
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="视频对讲能力"
          />
        </Card>
      </div>
    );
  }
}

export default EditCard;
