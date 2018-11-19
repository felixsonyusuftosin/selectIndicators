/**
 * @file - tests for 400 page
 */
// tslint:disable:no-angle-bracket-type-assertion
import { mount, render, shallow } from "enzyme";
import * as enzyme from 'enzyme';
import * as React from "react";
import { errorDefs } from '../../types/enum';
import { tableViewTests } from '../../types/enum';
import { ErrorComponent } from './500';

// tslint:disable-next-line:no-var-requires
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });



it(tableViewTests.renderStatic, () => {
  const component = shallow(
    // tslint:disable-next-line:jsx-no-lambda
    <ErrorComponent statusMessage={errorDefs.ERROR_5XX} otherMessage={'This is just a test'}/>
  );
  // expect(component).toMatchSnapshot();
});