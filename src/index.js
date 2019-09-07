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

  flatMap<U>(m: (T) => Option<U>): Option<U>;
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

  map<U>(_m: (any) => U): None {
    return new None();
  }

  filter(_p: (any) => boolean): None {
    return new None();
  }

  reject(_p: (any) => boolean): None {
    return new None();
  }

  bind<U>(_m: (any) => Option<U>): None {
    return new None();
  }

  flatMap<U>(m: (any) => Option<U>): None {
    return this.bind(m);
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

  getOrElse<U>(_defaultValue: U): T {
    return this.get();
  }

  default<U>(_defaultValue: U): T {
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

  flatMap<U>(m: (T) => Option<U>): Option<U> {
    return this.bind(m);
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
