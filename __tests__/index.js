// @flow
import { none, some } from '../src/index';

describe('Option', () => {
  test('isDefined', () => {
    const myNone = none();
    expect(myNone.isDefined()).toBe(false);

    const mySome = some();
    expect(mySome.isDefined()).toBe(true);
  });

  test('isEmpty', () => {
    const myNone = none();
    expect(myNone.isEmpty()).toBe(true);

    const mySome = some();
    expect(mySome.isEmpty()).toBe(false);
  });
});
