"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeToRouteFormat = exports.conventionalize = exports.projectDetailValidator = void 0;
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
function conventionalize(projectDetail) {
    console.log("conventionalize " + JSON.stringify(projectDetail));
    return {
        dbName: conventionalizeInput(projectDetail['dbName'], 'class'),
        tables: projectDetail['tables'].map((tableDetail) => {
            return {
                tableName: conventionalizeInput(tableDetail['tableName'], 'class'),
                tableProperties: tableDetail['tableProperties'].map((tableProperty) => {
                    return {
                        propertyName: conventionalizeInput(tableProperty['propertyName'], 'property'),
                        propertyType: conventionalizeInput(tableProperty['propertyType'], 'property')
                    };
                }),
                primaryKeyName: conventionalizeInput(tableDetail['primaryKeyName'], 'property'),
                primaryKeyType: conventionalizeInput(tableDetail['primaryKeyType'], 'property'),
                servicesRequired: tableDetail['servicesRequired']
            };
        })
    };
}
exports.conventionalize = conventionalize;
function conventionalizeInput(propertyValue, propertyType) {
    const propertyValueLowerCased = propertyValue.toLowerCase();
    const strLength = propertyValue.length;
    let conventionalizedString = '';
    let itr = 0;
    if (propertyType == 'class')
        conventionalizedString += propertyValue[itr++].toUpperCase();
    while (itr < strLength) {
        if (propertyValue[itr] == ' ' || propertyValue[itr] == '-')
            conventionalizedString += propertyValue[++itr].toUpperCase();
        else
            conventionalizedString += propertyValue[itr];
        itr++;
    }
    return conventionalizedString;
}
function changeToRouteFormat(value) {
    const strLength = value.length;
    let itr = 1;
    let routeFormattedString = value[0];
    while (itr < strLength) {
        if (value[itr] >= 'A' && value[itr] <= 'Z')
            routeFormattedString += '-' + value[itr].toLowerCase();
        else
            routeFormattedString += value[itr];
        ;
        itr++;
    }
    return routeFormattedString.toLowerCase();
}
exports.changeToRouteFormat = changeToRouteFormat;
//# sourceMappingURL=project-detail.validator.js.map