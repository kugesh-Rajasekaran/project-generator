"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tablePropertyValidator = void 0;
const validate_string_validator_1 = require("./validate-string.validator");
function tablePropertyValidator(tableProperty, errors) {
    try {
        console.log(JSON.stringify(tableProperty));
        validate_string_validator_1.validateInput(tableProperty['propertyName'], 'string', 'propertyName', 'TableProperty', errors);
        validate_string_validator_1.validateInput(tableProperty['propertyType'], 'string', 'propertyName', 'TableProperties', errors);
        validate_string_validator_1.validateTypeInput(tableProperty['propertyType'], 'propertyName', 'TableProperties', errors);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.tablePropertyValidator = tablePropertyValidator;
//# sourceMappingURL=table-property.validator.js.map