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
        projectType: projectDetail['projectType'],
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
    let conventionalizedString = '';
    let itr = 0;
    console.log("property value --> " + propertyValue);
    const sanitizedVal = propertyValue.trim().replace(/\s\s+/g, ' ');
    console.log("After sanitized ---> " + sanitizedVal);
    if (propertyType == 'class')
        conventionalizedString += sanitizedVal[itr++].toUpperCase();
    const strLength = sanitizedVal.length;
    while (itr < strLength) {
        if (sanitizedVal[itr] == ' ' || sanitizedVal[itr] == '-')
            conventionalizedString += sanitizedVal[++itr].toUpperCase();
        else
            conventionalizedString += sanitizedVal[itr];
        itr++;
    }
    console.log("output property value --> " + conventionalizedString);
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