// @flow
export interface Option {
  isDefined(): boolean;

  isEmpty(): boolean;
}

class None implements Option {
  isDefined(): boolean {
    return false;
  }

  isEmpty(): boolean {
    return true;
  }
}

class Some implements Option {
  isDefined(): boolean {
    return true;
  }

  isEmpty(): boolean {
    return false;
  }
}

function none(): None {
  return new None();
}

function some(): Some {
  return new Some();
}

export { none, some };
