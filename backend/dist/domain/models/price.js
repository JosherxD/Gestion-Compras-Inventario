"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Price = void 0;
class Price {
    constructor(_value) {
        this._value = _value;
        if (_value <= 0)
            throw new Error('Price must be positive');
    }
    get value() {
        return this._value;
    }
    getValue() {
        return this._value;
    }
}
exports.Price = Price;
