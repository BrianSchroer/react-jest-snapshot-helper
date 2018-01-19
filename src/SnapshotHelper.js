import React from 'react';
import renderer from 'react-test-renderer';

/**
 * React component Jest snapshot helper
 */
export default class SnapshotHelper {
  /**
   * Create new SnapshotHelper instance
   * @param {*} component - React component
   */
  constructor(component) {
    this.component = component.type;
    this.props = component.props;
    this.adjustProps = (props, propsAdjustments) =>
      Object.assign({}, props, propsAdjustments);
  }

  /**
   * Fluent syntax helper to specify a callback function to be called by the test() function
   * to assign propsAdjustments to the props passed that were passed via the constructor.
   * (Defaults to assigning top-level props only.)
   */
  withPropsAdjuster = propsAdjuster => {
    this.adjustProps = propsAdjuster;
    return this;
  };

  /**
   * Adjust props that were passed to the constructor with propsAdjustments,
   * then create JSON string snapshot for the component.
   */
  getSnapshot = propsAdjustments => {
    const Component = this.component;
    const props = this.adjustProps(this.props, propsAdjustments);

    return renderer.create(<Component {...props} />).toJSON();
  };

  /**
   * Adjust props that were passed to the constructor with propsAdjustments, then create
   * snapshot and assert that it matches previously accepted screenshot.
   */
  test = propsAdjustments => {
    expect(this.getSnapshot(propsAdjustments)).toMatchSnapshot();
  };

  /**
   * Get JSON string snapshot for the component.
   * @param {*} component - React component
   */
  static getSnapshot(component) {
    return new SnapshotHelper(component).getSnapshot();
  }

  /**
   * Create snapshot and assert that it matches previously accepted screenshot.
   * @param {*} component - React component1
   */
  static test(component) {
    new SnapshotHelper(component).test();
  }
}
