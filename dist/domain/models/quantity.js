"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quantity = void 0;
class Quantity {
    constructor(_value) {
        this._value = _value;
        if (!Number.isInteger(_value))
            throw new Error('Quantity must be integer');
        if (_value <= 0)
            throw new Error('Quantity must be positive');
    }
    get value() {
        return this._value;
    }
    getValue() {
        return this._value;
    }
}
exports.Quantity = Quantity;
