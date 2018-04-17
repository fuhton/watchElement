import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { configure, shallow } from 'enzyme';

import hoc from '../src/hoc';

configure({ adapter: new Adapter() });

const QUERY = '.query_string';
const CLASSNAME = 'CLASSNAME';
let NewComp;
let HocComp;
let watchElement;


describe('watchElement/hoc', () => {
  beforeEach(() => {
    NewComp = props => <div className={CLASSNAME} {...props} />;
    HocComp = hoc(QUERY)(NewComp);
    watchElement = jest.fn();
  });

  it('component should have watchElement in context', () => {
    const wrapper = shallow(<HocComp />, { context: { watchElement } });
    expect(wrapper.context().watchElement).toEqual(jasmine.any(Function));
  });

  it('component should not be in dom', () => {
    const wrapper = shallow(<HocComp />, { context: { watchElement } });
    expect(wrapper.html()).toBe(null);
  });

  it('component should be in dom', () => {
    const wrapper = shallow(<HocComp />, { context: { watchElement } });
    const updated = wrapper.setState({ inView: true });

    expect(updated.html()).not.toBe(null);
  });
});
