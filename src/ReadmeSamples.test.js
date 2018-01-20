import React from 'react';
import SnapshotHelper from '../src';
import FacultyMember from './components/FacultyMember';

const ROLE_TEACHER = 'x';
const ROLE_PRINCIPAL = 'x';
const ROLE_COUNSELOR = 'x';
const ROLE_TEACHING_ASSISTANT = 'x';

// constructor "remembers" component type and props
const snapshotHelper = new SnapshotHelper(
  (
    <FacultyMember
      name="Test Name"
      role={ROLE_TEACHER}
      speciality={{ name: 'Math', accredited: true }}
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
