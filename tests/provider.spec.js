import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { configure, shallow } from 'enzyme';

import Provider from '../src/provider';

configure({ adapter: new Adapter() });

describe('watchElement/provider', () => {
  it('component should not be in dom', () => {
    class MutationObserver {
      constructor() {
        this.observe = jest.fn();
        this.disconnect = jest.fn();
      }
    }

    Object.defineProperty(
      window,
      'MutationObserver',
      {
        writable: true,
        value: MutationObserver,
      },
    );
    const Child = () => <div className="child" />;
    const wrapper = shallow(<Provider><Child /></Provider>);
    expect(wrapper.instance().watchElement).toEqual(jasmine.any(Function));
    expect(wrapper.instance().getChildContext()).toEqual({
      watchElement: wrapper.instance().watchElement,
    });
  });
});
