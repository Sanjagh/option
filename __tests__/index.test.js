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

  test('getOrElse', () => {
    expect(some(2).getOrElse()).toBe(2);
    expect(none().getOrElse(7)).toBe(7);
    expect(option('foobar').getOrElse('baz')).toBe('foobar');
    expect(option(undefined).getOrElse('baz')).toBe('baz');
    expect(option(null).getOrElse('baz')).toBe('baz');
  });

  test('default', () => {
    expect(some(2).default()).toBe(2);
    expect(none().default(7)).toBe(7);
    expect(option('foobar').default('baz')).toBe('foobar');
    expect(option(undefined).default('baz')).toBe('baz');
    expect(option(null).default('baz')).toBe('baz');
  });

  test('getOrNull', () => {
    expect(some(2).getOrNull()).toBe(2);
    expect(none().getOrNull()).toBe(null);
    expect(option('foobar').getOrNull()).toBe('foobar');
    expect(option(undefined).getOrNull()).toBe(null);
    expect(option(null).getOrNull()).toBe(null);
  });

  test('getOrUndefined', () => {
    expect(some(2).getOrUndefined()).toBe(2);
    expect(none().getOrUndefined()).toBe(undefined);
    expect(option('foobar').getOrUndefined()).toBe('foobar');
    expect(option(undefined).getOrUndefined()).toBe(undefined);
    expect(option(null).getOrUndefined()).toBe(undefined);
  });

  test('map', () => {
    expect(some(2).map((x) => x)).toEqual(some(2));
    expect(some(2).map((x) => x * 2)).toEqual(some(4));
    expect(some(2).map((x) => [x, x * 3, x - 2])).toEqual(some([2, 6, 0]));
    expect(some(['foo', 'bar', 'baz']).map((x) => x.join(''))).toEqual(some('foobarbaz'));
    expect(none().map((x) => x * 2)).toEqual(none());
    expect(option('foobar').map((x) => x.split(''))).toEqual(option(['f', 'o', 'o', 'b', 'a', 'r']));
    expect(option(undefined).map((x) => x)).toEqual(none());
    expect(option(null).map((x) => x + 2)).toEqual(none());

    class Foo {
      get() {
        return 'foo';
      }
    }

    class Bar {
      toFoo() {
        return new Foo();
      }
    }

    expect(
      option(new Bar())
        .map((x) => x.toFoo())
        .map((x) => x.get()),
    ).toEqual(option('foo'));
  });

  test('filter', () => {
    const isEven = (x) => x % 2 === 0;

    expect(some(2).filter(isEven)).toEqual(some(2));
    expect(some(3).filter(isEven)).toEqual(none());
    expect(option(null).filter(() => true)).toEqual(none());
    expect(option(undefined).filter(() => true)).toEqual(none());
  });

  test('reject', () => {
    const isEven = (x) => x % 2 === 0;

    expect(some(2).reject(isEven)).toEqual(none());
    expect(some(3).reject(isEven)).toEqual(some(3));
    expect(option(null).reject(() => false)).toEqual(none());
    expect(option(undefined).reject(() => false)).toEqual(none());
  });

  test('bind', () => {
    expect(some(5).bind((n) => some('*'.repeat(n)))).toEqual(some('*****'));
    expect(option(null).bind(() => some('2'))).toEqual(none());
    expect(option(undefined).bind(() => some('2'))).toEqual(none());
  });

  test('flatMap', () => {
    expect(some(5).flatMap((n) => some('*'.repeat(n)))).toEqual(some('*****'));
    expect(option(null).flatMap(() => some('2'))).toEqual(none());
    expect(option(undefined).flatMap(() => some('2'))).toEqual(none());
  });

  test('fold', () => {
    expect(some(5).fold('foobar', (x) => x * 2)).toBe(10);
    expect(option(null).fold('foobar', () => 2)).toBe('foobar');
    expect(option(undefined).fold('foobar', () => 2)).toBe('foobar');
  });

  test('foldLeft', () => {
    expect(option(5).foldLeft(2, (acc, curr) => acc - curr)).toBe(-3);
    expect(option(null).foldLeft('foobar', (_acc, _curr) => 2)).toBe('foobar');
    expect(option(undefined).foldLeft('foobar', (_acc, _curr) => 2)).toBe('foobar');
  });

  test('foldRight', () => {
    expect(option(5).foldRight(2, (acc, curr) => acc - curr)).toBe(3);
    expect(option(null).foldRight('foobar', (_acc, _curr) => 2)).toBe('foobar');
    expect(option(undefined).foldRight('foobar', (_acc, _curr) => 2)).toBe('foobar');
  });

  test('forEach', () => {
    const cb = jest.fn();
    some(5).forEach(cb);
    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith(5);
    cb.mockClear();

    option(null).forEach(cb);
    expect(cb).toBeCalledTimes(0);
    cb.mockClear();

    option(undefined).forEach(cb);
    expect(cb).toBeCalledTimes(0);
    cb.mockClear();
  });

  test('toArray', () => {
    expect(option(5).toArray()).toEqual([5]);
    expect(option(null).toArray()).toEqual([]);
    expect(option(undefined).toArray()).toEqual([]);
  });

  describe('monad laws', () => {
    test('left identity', () => {
      const f = (x: number) => some(x);
      const value = 2;

      expect(some(value).bind(f)).toEqual(f(value));
    });

    test('right identity', () => {
      const m = some(2);

      expect(m.bind(some)).toEqual(m);
    });

    test('associativity', () => {
      const m = some(2);
      const f = (x) => some(x * 5);
      const g = (x) => some(x - 4);

      expect(m.bind(f).bind(g)).toEqual(m.bind((x) => f(x).bind(g)));
    });
  });
});
