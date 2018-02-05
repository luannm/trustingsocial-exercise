import React, { Component } from 'react';
import { Row, Card } from 'antd';
import PropTypes from 'prop-types';
import Pagination from '../../components/Pagination';
import NewsCard from '../../components/NewsCard';
import NewsModal from '../../components/NewsModal';
import './index.less';

export class NewsList extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      disablePrevious: true,
      showModal: false,
      modalData: {}
    };
    this.openNewsModal = this.openNewsModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentPage } = nextProps;
    this.setState({
      currentPage,
      disablePrevious: currentPage === 1
    });
  }

  openNewsModal(data) {
    this.setState({
      showModal: true,
      modalData: data
    });
  }

  handleModalClose() {
    this.setState({
      showModal: false
    });
  }

  _renderList(data) {
    return data.map(item => (
      <NewsCard
        data={item}
        key={item._id}
        handleCardClick={this.openNewsModal}
      />
    ));
  }

  render() {
    const {
      data,
      isLoading,
      handleNextClick,
      handlePreviousClick
    } = this.props;
    const { currentPage, disablePrevious, showModal, modalData } = this.state;
    return (
      <div className="news-list">
        {isLoading ? <Card loading>Loading</Card> : this._renderList(data)}
        <Row type="flex" justify="center">
          <Pagination
            className="news-list__pagination"
            currentPage={currentPage}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
            disablePrevious={disablePrevious}
          />
        </Row>
        <NewsModal
          visible={showModal}
          data={modalData}
          onCancel={this.handleModalClose}
        />
      </div>
    );
  }
}

NewsList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  currentPage: PropTypes.number,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func
};

NewsList.defaultProps = {
  data: [],
  isLoading: false
};

export default NewsList;
