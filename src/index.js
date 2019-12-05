// @flow
export interface Option<+T> {
  /* eslint-disable no-undef */
  isDefined(): boolean;

  isEmpty(): boolean;

  get(): T;

  getOrElse<U>(U): T | U;

  default<U>(U): T | U;

  getOrNull(): T | null;

  getOrUndefined(): T | void;

  map<U>((T) => U): Option<U>;

  filter((T) => boolean): Option<T>;

  reject((T) => boolean): Option<T>;

  bind<U>((T) => Option<U>): Option<U>;

  flatMap<U>((T) => Option<U>): Option<U>;

  fold<U>(U, (T) => U): U;

  foldLeft<U>(U, (U, T) => U): U;

  foldRight<U>(U, (T, U) => U): U;

  forEach((T) => void): void;

  toArray(): $ReadOnlyArray<T>;
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

  fold<U>(initialValue: U, f: (any) => U): U {
    return this.map(f).getOrElse(initialValue);
  }

  foldLeft<U>(initialValue: U, _f: (U, any) => U): U {
    return initialValue;
  }

  foldRight<U>(initialValue: U, _f: (any, U) => U): U {
    return initialValue;
  }

  forEach(_f: any): void {}

  toArray() {
    return [];
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

  fold<U>(initialValue: U, f: (T) => U): U {
    return this.map(f).getOrElse(initialValue);
  }

  foldLeft<U>(initialValue: U, f: (U, T) => U): U {
    return f(initialValue, this.get());
  }

  foldRight<U>(initialValue: U, f: (T, U) => U): U {
    return f(this.get(), initialValue);
  }

  forEach(f: (T) => void): void {
    f(this.get());
  }

  toArray(): Array<T> {
    return [this.get()];
  }
}

function none(): None {
  return new None();
}

function some<T>(value: T): Some<T> {
  return new Some(value);
}

function option<T>(value: ?T): Option<T> {
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
