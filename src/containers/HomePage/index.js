import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, notification } from 'antd';
import NewsList from '../NewsList';
import { getNews } from '../../actions/news';
import Logo from '../../assets/images/logo.png';
import './index.less';

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false,
      currentPage: 0
    };
    this.fetchNews = this.fetchNews.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  componentWillReceiveProps(nextProps) {
    const { data, isLoading, error, currentPage } = nextProps;
    const newState = {
      data: [],
      isLoading,
      currentPage
    };

    if (error) {
      notification['error']({
        message: 'Something Wrong',
        description: 'Please try again later.'
      });
    }

    if (!isLoading) {
      newState.data = data ? data.response.docs : [];
    }

    this.setState(newState);
  }

  fetchNews(params = {}) {
    this.props
      .getNews(params)
      .catch(err => console.log('=== getNews Error ===: ', err));
  }

  goToNextPage() {
    const { currentPage } = this.state;
    this.fetchNews({
      page: currentPage + 1
    });
  }

  goToPreviousPage() {
    const { currentPage } = this.state;
    this.fetchNews({
      page: currentPage - 1
    });
  }

  render() {
    const { isLoading, data, currentPage } = this.state;
    return (
      <div className="homepage">
        <Row type="flex" justify="center">
          <Col md={8} sm={20}>
            <img src={Logo} alt="Logo" className="homepage__logo" />
          </Col>
        </Row>
        <Row type="flex" className="homepage__content">
          <Col span={24}>
            <NewsList
              data={data}
              isLoading={isLoading}
              currentPage={currentPage + 1}
              handleNextClick={this.goToNextPage}
              handlePreviousClick={this.goToPreviousPage}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

HomePage.propTypes = {
  getNews: PropTypes.func,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
  currentPage: PropTypes.number
};

const mapStateToProps = ({ news }) => ({
  data: news.data,
  isLoading: news.isLoading,
  error: news.error,
  currentPage: news.currentPage
});

export default connect(mapStateToProps, { getNews })(HomePage);
