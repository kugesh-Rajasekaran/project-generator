"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateString = void 0;
function validateString(stringToValidate, inputName, categoryName, errors) {
    if (typeof stringToValidate != 'string')
        errors.push(`type mismatch - ${inputName} in ${categoryName}`);
    if (!stringToValidate)
        errors.push(`${inputName} for ${categoryName} not provided`);
    if (!stringToValidate.length)
        errors.push(`enter valid ${inputName} for ${categoryName}`);
    return;
}
exports.validateString = validateString;
//# sourceMappingURL=validate-input.validator.js.map