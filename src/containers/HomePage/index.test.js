import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { HomePage } from './index';
import NewsList from '../NewsList';

describe('HomePage Container', () => {
  const fakeGetNews = sinon.stub().resolves({});

  it('should render correctly', () => {
    const wrapper = mount(<HomePage getNews={fakeGetNews} />);
    expect(wrapper.find('.homepage').exists()).toEqual(true);
    expect(wrapper.find('.homepage__logo').exists()).toEqual(true);
    expect(wrapper.find('.homepage__content').exists()).toEqual(true);
    expect(wrapper.find(NewsList).exists()).toEqual(true);
  });

  it('should call getNews action in componentDidMount', () => {
    const spyFetchNews = sinon.spy(HomePage.prototype, 'fetchNews');
    mount(<HomePage getNews={fakeGetNews} />);
    expect(spyFetchNews.called).toEqual(true);
    expect(fakeGetNews.called).toEqual(true);
    spyFetchNews.restore();
  });

  it('should update state correctly when receive props', () => {
    const wrapper = mount(<HomePage getNews={fakeGetNews} />);
    const fakeProps = {
      isLoading: false,
      data: {
        response: {
          docs: ['a', 'b']
        }
      },
      currentPage: 2
    };
    wrapper.setProps(fakeProps);
    expect(wrapper.state('currentPage')).toEqual(fakeProps.currentPage);
    expect(wrapper.state('data')).toEqual(['a', 'b']);
    expect(wrapper.state('isLoading')).toEqual(fakeProps.isLoading);
  });
});
