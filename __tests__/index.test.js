// @flow
import { some, none, option, None, Some } from '../src/index';

describe('Option', () => {
  test('option constructor', () => {
    expect(option(null)).toBeInstanceOf(None);
    expect(option(undefined)).toBeInstanceOf(None);
    expect(option(2)).toBeInstanceOf(Some);
    expect(option(true)).toBeInstanceOf(Some);
    expect(option('foo')).toBeInstanceOf(Some);
    expect(option([1, 2, 3, 4])).toBeInstanceOf(Some);
    expect(option({ foo: 'bar' })).toBeInstanceOf(Some);
    expect(option(none())).toBeInstanceOf(Some);
    expect(option(none())).toBeInstanceOf(Some);
    expect(option(0)).toBeInstanceOf(Some);
    expect(option(false)).toBeInstanceOf(Some);
    expect(option('')).toBeInstanceOf(Some);
    expect(option([])).toBeInstanceOf(Some);
    expect(option({})).toBeInstanceOf(Some);
  });

  test('isDefined', () => {
    expect(none().isDefined()).toBe(false);
    expect(some(2).isDefined()).toBe(true);
    expect(option(0).isDefined()).toBe(true);
    expect(option(false).isDefined()).toBe(true);
  });

  test('isEmpty', () => {
    expect(none().isEmpty()).toBe(true);
    expect(some(2).isEmpty()).toBe(false);
    expect(option(0).isEmpty()).toBe(false);
    expect(option(false).isEmpty()).toBe(false);
  });

  test('get', () => {
    expect(some(2).get()).toBe(2);
    expect(none().get).toThrowError('NO VALUE');
    expect(option('foobar').get()).toBe('foobar');
    expect(option(undefined).get).toThrowError('NO VALUE');
    expect(option(null).get).toThrowError('NO VALUE');
  });
});
