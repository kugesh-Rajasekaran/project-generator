"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableDetailValidator = void 0;
const validate_string_validator_1 = require("./validate-string.validator");
/**
 *  This is the validator function which validates table related information
 *  validates -> table name, primary key name, primary key type
 * */
function tableDetailValidator(tableDetail, errors) {
    try {
        validate_string_validator_1.validateInput(tableDetail['tableName'], 'string', 'tableName', 'tableDetail', errors);
        validate_string_validator_1.validateInput(tableDetail['primaryKeyName'], 'string', 'primaryKeyName', 'tableDetail', errors);
        validate_string_validator_1.validateInput(tableDetail['primaryKeyType'], 'string', 'primaryKeyType', 'tableDetail', errors);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.tableDetailValidator = tableDetailValidator;
//# sourceMappingURL=table-detail.validator.js.map