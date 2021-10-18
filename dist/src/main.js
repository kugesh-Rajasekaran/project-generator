"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const nest_init_1 = require("./executor/nest-init");
const project_detail_validator_1 = require("./validator/project-detail.validator");
const table_detail_validator_1 = require("./validator/table-detail.validator");
const table_property_validator_1 = require("./validator/table-property.validator");
const fs = __importStar(require("fs"));
function main(projectDetails) {
    try {
        console.log('[main] entered');
        const errors = [];
        sanitiseInput(projectDetails, errors);
        console.log("ERRORS -> " + errors);
        if (errors.length)
            throw new Error(errors.join(', '));
        const conventionalizedProjectDetails = project_detail_validator_1.conventionalize(projectDetails);
        console.log("conventionalized --> " + JSON.stringify(conventionalizedProjectDetails));
        nest_init_1.initialiseProject(conventionalizedProjectDetails);
        console.log('[main] ended');
    }
    catch (e) {
        console.log(e);
        throw new Error(e['message']);
    }
}
exports.main = main;
function sanitiseInput(projectDetail, errors) {
    try {
        console.log('[sanitiseInput] sanitization starts');
        checkProjectNameAlreadyPresent(projectDetail['dbName']);
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
        throw new Error(e['message']);
    }
}
function checkProjectNameAlreadyPresent(dbName) {
    if (!dbName)
        throw new Error('database name is empty - please provide valid database name');
    console.debug("exist or not --> " + fs.existsSync(`./generated-projects/${project_detail_validator_1.changeToRouteFormat(dbName)}`));
    if (fs.existsSync(`./generated-projects/${project_detail_validator_1.changeToRouteFormat(dbName)}`))
        throw new Error('given project/database name already present - please provide another name');
}
function conventionalizeInput(projectDetail) {
    try {
        return project_detail_validator_1.conventionalize(projectDetail);
    }
    catch (e) {
        throw new Error(e);
    }
}
/* example data to generate a nest project */
main({
    dbName: "kugesh-database",
    tables: [{
            tableName: 'kugesh table1',
            tableProperties: [{
                    propertyName: "kugesh property 1",
                    propertyType: "string"
                },
                {
                    propertyName: "kugesh property 2",
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