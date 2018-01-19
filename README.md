# react-jest-snapshot-helper

Helper class to simplify Jest snapshot testing of React components with different props.

## Install

`npm install --save-dev react-jest-snapshot-helper`

...or...

`yarn add --dev react-jest-snapshot-helper`

## Usage

```javascript
import { SnapshotHelper } from 'react-jest-snapshot-helper';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  const snapshotHelper = new SnapshotHelper(
    (
      <MyComponent
        text="test text"
        isImportant={false}
        className="my-class-name"
      />
    )
  );

  it('should render properly when isImportant is false', () => {
    snapshotHelper.test();
  });

  it('should render properly when isImportant is true', () => {
      snapshotHelper.test({ isImportant: true });
    });
  );
});
```

The SnapshotHelper constructor accepts a React component and "remembers" its type and props.

When the "test" method is called without arguments, a snapshot is generated and we assert that it matches the previously accepted snapshot for the test (if one exists).

When "test" is called with a "propAdjustments" object argument, a new component is created with the specified adjustments applied to the constructor-supplied props, and a snapshot is created/tested.
