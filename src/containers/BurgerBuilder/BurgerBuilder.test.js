import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import buildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onIngredientsFetched={() => {}} />);
  });

  it("Should render <BuildControls />, on receiving ingredients", () => {
    wrapper.setProps({ ingredients: { salad: 0 } });
    expect(wrapper.find(buildControls)).toHaveLength(1);
  });
});
