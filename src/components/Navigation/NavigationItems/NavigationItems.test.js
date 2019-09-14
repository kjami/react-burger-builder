import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('Navigation Items Component', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should return two navigation item components', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should return three navigation item components', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated={true}/>);
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should return logout when authenticated is true', () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});

