import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('Burger Builder Component', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder 
                    resetIngredientsLoader={() => { }} 
                    getIngredients={() => { }} 
                    getIngredientPrices={() => { }}
                    />);
    });

    it('should contain build controls when loaded property is 2.', () => {
        wrapper.setProps({ loaded: 2 });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});

