"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const nest_init_1 = require("./executor/nest-init");
const project_detail_validator_1 = require("./validator/project-detail.validator");
const table_detail_validator_1 = require("./validator/table-detail.validator");
const table_property_validator_1 = require("./validator/table-property.validator");
function main(projectDetails) {
    try {
        console.log('[main] entered');
        const errors = [];
        sanitiseInput(projectDetails, errors);
        console.log(" ----> " + errors);
        if (errors.length)
            throw new Error(errors.join(', '));
        nest_init_1.initialiseProject(projectDetails);
        console.log('[main] ended');
    }
    catch (e) {
        console.log(e);
        throw new Error(e);
    }
}
exports.main = main;
function sanitiseInput(projectDetail, errors) {
    try {
        project_detail_validator_1.projectDetailValidator(projectDetail, errors);
        if (!projectDetail['tables'].length)
            errors.push(`table details not provided`);
        projectDetail['tables'].forEach((tableDetail) => {
            table_detail_validator_1.tableDetailValidator(tableDetail, errors);
            if (!tableDetail['tableProperties'].length)
                errors.push(`table property details not provided`);
            tableDetail['tableProperties'].forEach((tableProperty) => table_property_validator_1.tablePropertyValidator(tableProperty, errors));
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
main({
    dbName: "kugesh-database",
    tables: [{
            tableName: 'kugesh-table1',
            tableProperties: [{
                    propertyName: "kugesh-property-1",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-2",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-3",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-4",
                    propertyType: "string"
                }
            ],
            primaryKeyName: 'id',
            primaryKeyType: 'string',
            servicesRequired: { create: true, read: true, update: true, delete: true }
        },
        {
            tableName: 'kugesh-table2',
            tableProperties: [{
                    propertyName: "kugesh-property-1",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-2",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-3",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh-property-4",
                    propertyType: "string"
                }
            ],
            primaryKeyName: 'id',
            primaryKeyType: 'string',
            servicesRequired: { create: true, read: true, update: true, delete: true }
        }
    ],
});
//# sourceMappingURL=main.js.map