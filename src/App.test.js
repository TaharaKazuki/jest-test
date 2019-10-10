import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'

import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter()})

const setUp = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />)
  if (state) wrapper.setState(state)
  return wrapper
}

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`)
}

test('renders without error', () => {
  const wrapper = setUp()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent.length).toBe(1)
})

test('renders increment button', () => {
  const wrapper = setUp()
  const button = findByTestAttr(wrapper, 'increment-button')
  expect(button.length).toBe(1)
})

test('counter starts at 0', () => {
  const wrapper = setUp()
  const initialCounterState = wrapper.state('counter')
  expect(initialCounterState).toBe(0)
})

test('clicking button increments counter display', () => {
  const counter = 7
  const wrapper = setUp(null, { counter })

  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')

  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  console.log(counterDisplay.text())
  expect(counterDisplay.text()).toContain(counter + 1)
})