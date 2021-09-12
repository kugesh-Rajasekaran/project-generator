"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectDetailValidator = void 0;
const validate_string_validator_1 = require("./validate-string.validator");
function projectDetailValidator(projectDetail, errors) {
    try {
        validate_string_validator_1.validateInput(projectDetail['dbName'], 'string', 'dbName', 'projectDetail', errors);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.projectDetailValidator = projectDetailValidator;
function checkDbName(dbName) {
    try {
        let errors = ``;
        if (!dbName.length)
            errors += `invalid database name`;
        else if (typeof dbName == 'string')
            errors += `Database name type mismatch expected string but found ${typeof dbName}`;
        if (errors.length)
            throw new Error(errors);
        return '';
    }
    catch (e) {
        console.log(`ERROR -> ${e}`);
        return e;
    }
}
//# sourceMappingURL=project-detail.validator.js.map