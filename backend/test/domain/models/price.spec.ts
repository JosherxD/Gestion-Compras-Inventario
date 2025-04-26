export class Price {
    constructor(private readonly _value: number) {
      if (_value <= 0) throw new Error('Price must be positive');
    }
  
    get value(): number {
      return this._value;
    }

    public getValue(): number {
      return this._value;
    }
  }