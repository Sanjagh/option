// @flow
export interface Option<+T> {
  /* eslint-disable no-undef */
  isDefined(): boolean;

  isEmpty(): boolean;

  get(): T;

  getOrElse<U>(defaultValue: U): T | U;

  default<U>(defaultValue: U): T | U;

  getOrNull(): T | null;

  getOrUndefined(): T | void;

  map<U>(m: (T) => U): Option<U>;

  filter(p: (T) => boolean): Option<T>;

  reject(p: (T) => boolean): Option<T>;

  bind<U>(m: (T) => Option<U>): Option<U>;
  /* eslint-enable */
}

class None implements Option<empty> {
  isDefined(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return true;
  }

  get() {
    throw new Error('NO VALUE');
  }

  getOrElse<U>(defaultValue: U): U {
    return defaultValue;
  }

  default<U>(defaultValue: U): U {
    return this.getOrElse(defaultValue);
  }

  getOrNull(): null {
    return null;
  }

  getOrUndefined(): void {
    return undefined;
  }

  map(): None {
    return new None();
  }

  filter(): None {
    return new None();
  }

  reject(): None {
    return new None();
  }

  bind(): None {
    return new None();
  }
}

class Some<T> implements Option<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  isDefined(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return false;
  }

  get(): T {
    return this.value;
  }

  getOrElse(): T {
    return this.get();
  }

  default(): T {
    return this.getOrElse();
  }

  getOrNull(): T {
    return this.get();
  }

  getOrUndefined(): T {
    return this.get();
  }

  map<U>(m: (T) => U): Some<U> {
    return new Some(m(this.get()));
  }

  filter(p: (T) => boolean): Option<T> {
    return p(this.get()) ? new Some(this.get()) : new None();
  }

  reject(p: (T) => boolean): Option<T> {
    return this.filter((x: T) => !p(x));
  }

  bind<U>(m: (T) => Option<U>): Option<U> {
    return m(this.get());
  }
}

function none(): None {
  return new None();
}

function some<T>(value: T): Some<T> {
  return new Some(value);
}

function option<T>(value: T): Option<T> {
  return value == null ? none() : some(value);
}

const Opt = {
  None,
  Some,
  none,
  some,
  option,
};

export { None, Some, none, some, option, Opt as default };
