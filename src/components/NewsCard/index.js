import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'antd';
import moment from 'moment';
import './index.less';

const ASSET_ENDPOINT = process.env.REACT_APP_NYTIMES_ASSET_ENDPOINT;

class NewsCard extends PureComponent {
  render() {
    const {
      data: { snippet, source, pub_date: pubDate, multimedia },
      handleCardClick
    } = this.props;
    const thumbnail =
      multimedia &&
      multimedia.length > 0 &&
      multimedia.find(x => x.subtype === 'thumbnail');
    return (
      <Card
        className="news-card"
        hoverable
        onClick={() => handleCardClick && handleCardClick(this.props.data)}
      >
        <Row>
          <Col md={3} sm={24}>
            {thumbnail && (
              <img
                className="news-card__thumbnail"
                src={`${ASSET_ENDPOINT}/${thumbnail.url}`}
                alt="Thumbnail"
              />
            )}
          </Col>
          <Col span={21}>
            <p className="news-card__snippet">{snippet}</p>
            <div>
              <span className="news-card__source">By {source}</span>
              <span className="news-card__date">
                {moment(pubDate).format('YYYY-MM-DD HH:mm:ss')}
              </span>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

NewsCard.propTypes = {
  data: PropTypes.shape({
    snippet: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    pub_date: PropTypes.string.isRequired,
    multimedia: PropTypes.array
  }),
  handleCardClick: PropTypes.func
};

export default NewsCard;
