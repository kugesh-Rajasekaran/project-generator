"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTypeInput = exports.validateInput = void 0;
const data_type_model_1 = require("../models/nest/data-type.model");
/**
 *  Validates the given input
 *  If error occurs, it will pushes the error into the given array based on the given information
 * */
function validateInput(inputToValidate, expectedType, inputName, categoryName, errors) {
    if (typeof inputToValidate != expectedType)
        errors.push(`type mismatch, expected ${expectedType} but found ${typeof inputToValidate} - ${inputName} in ${categoryName}`);
    if (!inputToValidate)
        errors.push(`${inputToValidate} for ${categoryName} not provided`);
    if (!inputToValidate.length)
        errors.push(`enter valid ${inputToValidate} for ${categoryName}`);
    return;
}
exports.validateInput = validateInput;
/**
 *
 * */
function validateTypeInput(inputString, inputName, categoryName, errors) {
    if (!data_type_model_1.dataType.includes(inputString))
        errors.push(`${inputString} is invalid in ${inputName} under ${categoryName}`);
    return;
}
exports.validateTypeInput = validateTypeInput;
//# sourceMappingURL=validate-string.validator.js.map