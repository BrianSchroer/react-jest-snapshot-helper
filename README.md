# react-jest-snapshot-helper

Helper class to simplify Jest snapshot testing of React components with a variety of props combinations.

## Install

`npm install --save-dev react-jest-snapshot-helper`

...or...

`yarn add --dev react-jest-snapshot-helper`

## Usage

```javascript
import SnapshotHelper from 'react-jest-snapshot-helper';
import FacultyMember from './components/FacultyMember';

// constructor "remembers" component type and props
const snapshotHelper = new SnapshotHelper(
  (
    <FacultyMember
      name="Test Name"
      role={ROLE_TEACHER}
      speciality={{ subject: 'Math', accredited: true }}
    />
  )
);

describe('FacultyMember', () => {
  // test() without arguments tests snapshot for constructor-supplied props:
  it('should render ROLE_TEACHER properly', () => snapshotHelper.test());

  // test() with propAdjustments argument tests snapshot of new component
  // instance with adjustments assigned to original constructor-supplied props:
  it('should render ROLE_PRINCIPAL properly', () =>
    snapshotHelper.test({ name: 'Big Cheese', role: ROLE_PRINCIPAL }));
  it('should render ROLE_COUNSELOR properly', () =>
    snapshotHelper.test({ name: 'Deanna Troi', role: ROLE_COUNSELOR }));
  it('should render ROLE_TEACHING_ASSISTANT properly', () =>
    snapshotHelper.test({
      name: 'Snappy Helper',
      role: ROLE_TEACHING_ASSISTANT
    }));
});
```

### getSnapshot()

...returns a JSON snapshot string for the component. As with the **test** function,
it accepts an optional _propAdjustments_ argument:

```javascript
const teacherSnapshot = snapshotHelper.getSnapshot();
const principalSnapshot = snapshotHelper.getSnapshot({ role: ROLE_PRINCIPAL });
```

### withPropsAdjuster()

**SnapshotHelper** has an **adjustProps** function that is called when _propsAdjustments_ are passed to **test()** or **getSnapshot()**. By default, this function does an Object.assign against the constructor-supplied "top-level" props properties, e.g.:

_adjustedProps =_ Object.assign({}, this.props, propsAdjustments);`

withPropsAdjuster() is a fluent syntax convenience function for overriding the default **adjustProps** function. This is useful for simpler syntax for overriding only part of a hierarchial props object.

```javascript
const snapshotHelper = new SnapshotHelper(
  <FacultyMember {...defaultProps} />
).withPropsAdjuster((props, adjustments) =>
  Object.assign({}, props, {
    speciality: Object.assign({}, props.speciality, adjustments)
  })
);

// ^ Override adjustor to override "child" specialty properties, not parent props:

describe('FacultyMember', () => {
  it('should render accredited English teacher properly', () => {
    snapshotHelper.test({ subject: 'English', accredited: true });
  });
  it('should render unaccredited science teacher properly', () => {
    snapshotHelper.test({ subject: 'Science', accredited: false });
  });
});
```

### Static functions

If you don't need the ability to test a variety of props, you can
just use the static **getSnapshot** and **test** methods:

```javascript
describe('FacultyMember', () => {
  const snapshot = SnapshotHelper.getSnapshot(
    <FacultyMember {...defaultProps} />
  );

  it('should render properly', () => {
    SnapshotHelper.test(<FacultyMember {...defaultProps} />);
  });
});
```

(The static calls above are the equivalent of the following:)

```javascript
const snapshot = new SnapshotHelper(
  <FacultyMember {...defaultProps} />
).getSnapshot();

new SnapshotHelper(<FacultyMember {...defaultProps} />).test();
```
