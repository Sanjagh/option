// @flow
export interface Option<+T> {
  isDefined(): boolean;

  isEmpty(): boolean;

  get(): T;
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
