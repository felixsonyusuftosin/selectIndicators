/**
 * @file - test definition for ontology component 
 */
// tslint:disable:no-angle-bracket-type-assertion
import { mount, render, shallow } from "enzyme";
import * as enzyme from 'enzyme';
import * as React from "react";
import store from '../../store/store';
import { tableViewTests } from "../../types/enum";
import Ontology from './index';

// tslint:disable-next-line:no-var-requires
const Adapter = require('enzyme-adapter-react-16');
enzyme.configure({ adapter: new Adapter() });

it(tableViewTests.renderOntology, () => {
  const ontologyComponent = shallow(<Ontology store={store}/>);
  const componentInstance = ontologyComponent.instance()
  componentInstance.componentDidMount();
      expect(ontologyComponent.state('hasError')).toBeFalsy();
      expect(ontologyComponent).toMatchSnapshot();
    });
