import React from 'react';
import { shallow } from 'enzyme';
import NewsModal from './index';

describe('NewsModal Component', () => {
  const FAKE_DATA = {
    snippet: 'Test',
    source: 'NYTimes',
    pub_date: '2018-02-01T16:03:34+0000'
  };

  it('should render correctly', () => {
    const wrapper = shallow(<NewsModal data={FAKE_DATA} />);
    expect(wrapper.find('.news-modal').exists()).toEqual(true);
    expect(wrapper.find('.news-modal__snippet').text()).toEqual(FAKE_DATA.snippet);
    expect(wrapper.find('.news-modal__source').text()).toEqual(`By ${FAKE_DATA.source}`);
    expect(wrapper.find('.news-modal__date').text()).toEqual('2018-02-01 23:03:34');
    expect(wrapper.find('.news-modal__image').exists()).toEqual(false);
  });

  it('should render image if have data', () => {
    const FAKE_MULTIMEDIA = [{
      subtype: 'xlarge',
      url: 'abc/def'
    }];
    FAKE_DATA.multimedia = FAKE_MULTIMEDIA;
    const wrapper = shallow(<NewsModal data={FAKE_DATA} />);
    expect(wrapper.find('.news-modal').exists()).toEqual(true);
    expect(wrapper.find('.news-modal__image').exists()).toEqual(true);
  });
});
