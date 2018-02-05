import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './index.less';

class Pagination extends PureComponent {
  render() {
    const {
      currentPage,
      disableNext,
      disablePrevious,
      handleNextClick,
      handlePreviousClick
    } = this.props;
    return (
      <div className="pagination">
        <Button
          className="pagination__btnPrevious"
          icon="left"
          disabled={disablePrevious}
          onClick={handlePreviousClick}
        />
        <span className="pagination__page">Page {currentPage}</span>
        <Button
          icon="right"
          className="pagination__btnNext"
          disabled={disableNext}
          onClick={handleNextClick}
        />
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  disableNext: PropTypes.bool,
  disablePrevious: PropTypes.bool,
  handleNextClick: PropTypes.func,
  handlePreviousClick: PropTypes.func
};

Pagination.defaultProps = {
  currentPage: 1,
  disableNext: false,
  disablePrevious: true
};

export default Pagination;
