# react-jest-snapshot-helper

Helper class to simplify Jest snapshot testing of React components with a variety of props.

## Install

`npm install --save-dev react-jest-snapshot-helper`

...or...

`yarn add --dev react-jest-snapshot-helper`

## Usage

```javascript
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  // constructor "remembers" component type and props
  const snapshotHelper = new SnapshotHelper(
    <MyComponent
      text="test text"
      isImportant={false}
      withImage={true}
      className="my-class-name"
    />
  );

  it('should render properly with image when isImportant is false', () => {
    // test() without arguments tests snapshot for constructor-supplied props
    snapshotHelper.test();
  });

  // test() with propAdjustments argument creates new component instance
  // with adjustments assigned to the constructor-supplied props
  // and tests snapshot
  it('should render properly when isImportant is true', () => {
      snapshotHelper.test({ isImportant: true });
    });
  );

  it('should render properly when important without image' () => {
    snapshotHelper.test({ isImportant: true, withImage: false});
  });
});
```

### getSnapshot()

...returns a JSON snapshot string for the component. As with the **test** function,
it accepts an optional _propAdjustments_ argument:

```javascript
const snapshotHelper = new SnapshotHelper(<MyComponent {...props} />);

const snapshot1 = snapshotHelper.getSnapshot();
const snapshot2 = snapshotHelper.getSnapshot({ withImage: false });
```

### withPropsAdjuster()

**SnapshotHelper** has an **adjustProps** function that is called when _propsAdjustments_ are passed to **test()** or **getSnapshot()**. By default, this function does an Object.assign against the constructor-supplied "top-level" props properties, e.g.:

_adjustedProps =_ Object.assign({}, this.props, propsAdjustments);`

withPropsAdjuster() is a fluent syntax convenience function for overriding the default **adjustProps** function. This is useful for simpler syntax for overriding only part of a hierarchial props object.

```javascript
describe('MyComponent', () => {
  const snapshotHelper = new SnapshotHelper(
    <StudentDetails
      withImage
      student: { name: 'Brian', level: 'Senior', grade: 'A' }
    />
  )
  .withPropsAdjuster((props, overrides) => {
    withImage: props.withImage,
    student: Object.assign({}, props.student, overrides)
  }));

// Override adjustor to override "student" properties, not parent props:

  ['A', 'B', 'C', 'D', 'F'].forEach(grade => {
    it(`should render properly for grade "${grade}"`, () => {
      snapshotHelper.test({grade: grade });
    })
  });
```
