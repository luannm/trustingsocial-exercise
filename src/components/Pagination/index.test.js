import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './index';

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Pagination currentPage={1} />);
    expect(wrapper.find('.pagination').exists()).toEqual(true);
    expect(wrapper.find('.pagination__page').text()).toEqual('Page 1');
    expect(wrapper.find('.pagination__btnPrevious').prop('disabled')).toEqual(true);
    expect(wrapper.find('.pagination__btnNext').prop('disabled')).toEqual(false);
  });

  it('should enable previous button', () => {
    const wrapper = shallow(<Pagination currentPage={1} disablePrevious={false} />);
    expect(wrapper.find('.pagination').exists()).toEqual(true);
    expect(wrapper.find('.pagination__btnPrevious').prop('disabled')).toEqual(false);
  });

  it('should disable next button', () => {
    const wrapper = shallow(<Pagination currentPage={1} disableNext />);
    expect(wrapper.find('.pagination').exists()).toEqual(true);
    expect(wrapper.find('.pagination__btnNext').prop('disabled')).toEqual(true);
  });
});
