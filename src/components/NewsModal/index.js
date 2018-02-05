import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Modal } from 'antd';
import './index.less';

const ASSET_ENDPOINT = process.env.REACT_APP_NYTIMES_ASSET_ENDPOINT;

class NewsModal extends PureComponent {
  render() {
    const {
      data: {
        snippet,
        source,
        pub_date: pubDate,
        multimedia
      },
      ...modalProps
    } = this.props;
    const newsImg =
      multimedia &&
      multimedia.length > 0 &&
      multimedia.find(x => x.subtype === 'xlarge');
    return (
      <Modal {...modalProps} className="news-modal">
        <div>
          {newsImg && (
            <img className="news-modal__image" src={`${ASSET_ENDPOINT}/${newsImg.url}`} alt="News" />
          )}
        </div>
        <p className="news-modal__snippet">{snippet}</p>
        <div>
          <span className="news-modal__source">By {source}</span>
          <span className="news-modal__date">
            {moment(pubDate).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        </div>
      </Modal>
    );
  }
}

NewsModal.propTypes = {
  data: PropTypes.shape({
    snippet: PropTypes.string,
    source: PropTypes.string,
    pub_date: PropTypes.string,
    multimedia: PropTypes.array
  }),
};

export default NewsModal;
