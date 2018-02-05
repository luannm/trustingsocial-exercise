import React from 'react';
import { mount } from 'enzyme';
import { Card } from 'antd';
import { NewsList } from './index';
import Pagination from '../../components/Pagination';
import NewsCard from '../../components/NewsCard';

describe('NewsList Container', () => {
  it('should render correctly', () => {
    const wrapper = mount(<NewsList />);
    expect(wrapper.find(Pagination).exists()).toEqual(true);
  });

  it('should render loading Card', () => {
    const wrapper = mount(<NewsList isLoading />);
    expect(wrapper.find(Card).prop('loading')).toEqual(true);
  });

  it('should render news cards', () => {
    const wrapper = mount(<NewsList data={['a', 'b']} />);
    expect(wrapper.find(NewsCard).exists()).toEqual(true);
  });
});
