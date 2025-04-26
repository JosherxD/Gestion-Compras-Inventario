export class Quantity {
    constructor(private readonly _value: number) {
      if (!Number.isInteger(_value)) throw new Error('Quantity must be integer');
      if (_value <= 0) throw new Error('Quantity must be positive');
    }

    get value(): number {
      return this._value;
    }

    public getValue(): number {
      return this._value;
    }
  }