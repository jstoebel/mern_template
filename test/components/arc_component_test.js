import React from 'react';
import d3 from 'd3';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';
import Arc from '../../public/js/components/polls/arc';
import factory from '../factories';
import sinon from 'sinon';
import _ from 'underscore'

// https://github.com/airbnb/enzyme/issues/341
import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

describe("<Arc />", () => {

  var arcProps;

  beforeEach(done => {

    arcProps = {
      data:
       { data: { value: 2, label: 'first option: 2' },
         value: 2,
         startAngle: 0,
         endAngle: 6.283185307179586,
         padAngle: 0 },
      innerRadius: 50,
      outerRadius: 100,
      color: '#000000'
    }
    done();
  })

  describe("updateD3", () => {

    before(done => {
      sinon.spy(Arc.prototype, 'updateD3');
      done();
    })

    beforeEach( done => {
      // reset called count
      Arc.prototype.updateD3.reset();
      done();
    })

    it("updates on mount", done => {
      const wrapper = shallow(<Arc {...arcProps}/>);
      expect(Arc.prototype.updateD3.calledOnce).to.equal(true);
      done();
    })

    it("updates on new props", done => {
      const wrapper = shallow(<Arc {...arcProps} />);
      wrapper.setProps({
        color: "#000001"
      })
      expect(Arc.prototype.updateD3.callCount).to.equal(2);
      done();
    })

  }) // updateD3

  it("has a path at root", done=> {
    const wrapper = shallow(<Arc {...arcProps} />);
    expect(wrapper.find('path')).to.have.length(1)
    done();
  })

  it("has d attr based on props", done => {
    const arc = d3.svg.arc();
    arc.innerRadius(arcProps.innerRadius)
    arc.outerRadius(arcProps.outerRadius)
    const wrapper = mount(<Arc {...arcProps} />);
    expect(wrapper.find('path').prop('d')).to.equal(arc(wrapper.props().data))
    done();
  })

  it("has style based on props", done => {
    const wrapper = shallow(<Arc {...arcProps} />);
    expect(wrapper.find('path').prop('style')).to.eql({fill: arcProps.color})
    done();
  })

});
