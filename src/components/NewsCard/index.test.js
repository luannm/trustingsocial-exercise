import React from 'react';
import { shallow } from 'enzyme';
import NewsCard from './index';

describe('NewsCard Component', () => {
  const FAKE_DATA = {
    snippet: 'Test',
    source: 'NYTimes',
    pub_date: '2018-02-01T16:03:34+0000'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<NewsCard data={FAKE_DATA} />);
    expect(wrapper.find('.news-card').exists()).toEqual(true);
    expect(wrapper.find('.news-card__snippet').text()).toEqual(FAKE_DATA.snippet);
    expect(wrapper.find('.news-card__source').text()).toEqual(`By ${FAKE_DATA.source}`);
    expect(wrapper.find('.news-card__date').text()).toEqual('2018-02-01 23:03:34');
    expect(wrapper.find('.news-card__thumbnail').exists()).toEqual(false);
  });

  it('should render thumbnail if have data', () => {
    const FAKE_MULTIMEDIA = [{
      subtype: 'thumbnail',
      url: 'abc/def'
    }];
    FAKE_DATA.multimedia = FAKE_MULTIMEDIA;
    const wrapper = shallow(<NewsCard data={FAKE_DATA} />);
    expect(wrapper.find('.news-card').exists()).toEqual(true);
    expect(wrapper.find('.news-card__thumbnail').exists()).toEqual(true);
  });
});
