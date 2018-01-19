import React from 'react';
import renderer from 'react-test-renderer';
import { SnapshotHelper } from '../src';

/* eslint-disable react/prop-types */

const TestComponent = ({ className, text, details }) => (
  <div className={className}>
    <p>{text}</p>
    <p>{details.description}</p>
  </div>
);

describe('SnapshotHelper', () => {
  const testComponentInstance = (
    <TestComponent
      className="test-class-name"
      text="test text"
      details={{ description: 'detail description' }}
    />
  );

  const defaultProps = testComponentInstance.props;
  const snapshotHelper = new SnapshotHelper(testComponentInstance);

  it('static .getSnapshot() should return expected JSON', () => {
    const expected = renderer.create(testComponentInstance).toJSON();
    const actual = SnapshotHelper.getSnapshot(testComponentInstance);
    expect(actual).toEqual(expected);
  });

  it('static .test() should save expected snapshot', () => {
    SnapshotHelper.test(testComponentInstance);
  });

  it('.getSnapshot() with no overrides should return expected JSON', () => {
    const expected = renderer.create(testComponentInstance).toJSON();
    const actual = snapshotHelper.getSnapshot();
    expect(actual).toEqual(expected);
  });

  it('.getSnapshot() with overrides should return expected JSON', () => {
    const instance = (
      <TestComponent
        className="different-class-name"
        text="different text"
        details={{ description: 'different description' }}
      />
    );
    const expected = renderer.create(instance).toJSON();

    const actual = snapshotHelper.getSnapshot({
      className: 'different-class-name',
      text: 'different text',
      details: { description: 'different description' }
    });

    expect(actual).toEqual(expected);
  });

  it('.getSnapshot() with overrides should not permanently update component from constructor', () => {
    const snapshotBefore = snapshotHelper.getSnapshot();

    snapshotHelper.getSnapshot({ text: 'different text' });

    const snapshotAfter = snapshotHelper.getSnapshot();
    expect(snapshotAfter).toEqual(snapshotBefore);
  });

  it('.test() with no overrides should save expected snapshot', () => {
    snapshotHelper.test();
  });

  it('.test() with overrides should not permanently update component from constructor', () => {
    const snapshotBefore = snapshotHelper.getSnapshot();

    snapshotHelper.test({
      className: 'different-class-name',
      text: 'different text',
      details: { description: 'different description' }
    });

    const snapshotAfter = snapshotHelper.getSnapshot();
    expect(snapshotAfter).toEqual(snapshotBefore);
  });

  describe('withPropsAdjuster', () => {
    const adjustedHelper = new SnapshotHelper(
      <TestComponent {...defaultProps} />
    ).withPropsAdjuster((props, adjustments) => ({
      className: defaultProps.className,
      text: defaultProps.text,
      details: Object.assign({}, props.details, adjustments)
    }));

    it('.withPropsAdjuster().getSnapshot() with no overrides should return expected JSON', () => {
      const expected = renderer.create(testComponentInstance).toJSON();
      const actual = adjustedHelper.getSnapshot();
      expect(actual).toEqual(expected);
    });

    it('.withPropsAdjuster().getSnapshot() with overrides should return expected JSON', () => {
      const instance = (
        <TestComponent
          className={defaultProps.className}
          text={defaultProps.text}
          details={{ description: 'different description' }}
        />
      );

      const expected = renderer.create(instance).toJSON();

      const actual = adjustedHelper.getSnapshot({
        description: 'different description'
      });

      expect(actual).toEqual(expected);
    });
  });
});
