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
exports.generateProject = void 0;
const nest_init_1 = require("./executor/nest-init");
const project_detail_validator_1 = require("./validator/project-detail.validator");
const table_detail_validator_1 = require("./validator/table-detail.validator");
const table_property_validator_1 = require("./validator/table-property.validator");
const fs = __importStar(require("fs"));
/**
 *  This will be the start of the application.
 *  To generate project you should call this function.
 *  Ex. import { generateProject } from 'path_of_this_library';
 *      generateProject(input_data);
 * */
function generateProject(projectDetails) {
    try {
        console.log('[main] entered');
        const errors = [];
        sanitiseInput(projectDetails, errors);
        console.log("ERRORS -> " + errors);
        const initProject = chooseProjectType(projectDetails['projectType'], errors);
        if (errors.length)
            throw new Error(errors.join(', '));
        const conventionalizedProjectDetails = project_detail_validator_1.conventionalize(projectDetails);
        console.log("conventionalized -> " + JSON.stringify(conventionalizedProjectDetails));
        initProject(conventionalizedProjectDetails);
        console.log('[main] ended');
    }
    catch (e) {
        console.log(e);
        throw new Error(e['message']);
    }
}
exports.generateProject = generateProject;
/**
 *  Sanitise the input provided by the user.
 *  If the input is in the wrong format then this function will throw error.
 * */
function sanitiseInput(projectDetail, errors) {
    try {
        console.log('[sanitiseInput] sanitization starts');
        checkProjectNameAlreadyPresent(projectDetail['dbName'], errors);
        project_detail_validator_1.projectDetailValidator(projectDetail, errors);
        if (!projectDetail['tables'].length)
            errors.push(`table details not provided - please provide atleast one`);
        projectDetail['tables'].forEach((tableDetail) => {
            table_detail_validator_1.tableDetailValidator(tableDetail, errors);
            if (!tableDetail['tableProperties'].length)
                errors.push(`table property details not provided - please provide atleast one for each table`);
            tableDetail['tableProperties'].forEach((tableProperty) => table_property_validator_1.tablePropertyValidator(tableProperty, errors));
        });
    }
    catch (e) {
        throw new Error(e['message']);
    }
}
/**
 *  Checks a project already present with the given name.
 *  If it is, then error will be thrown.
 * */
function checkProjectNameAlreadyPresent(dbName, errors) {
    if (!dbName)
        errors.push('database name is empty - please provide valid database name');
    if (fs.existsSync(`./generated-projects/${project_detail_validator_1.changeToRouteFormat(dbName)}`))
        errors.push('given project/database name already present - please provide another name or delete the existing one');
}
/**
 *  Conventionalizes the input to proper format.
 *  The library uses this method's o/p to generate project.
 * */
function conventionalizeInput(projectDetail) {
    try {
        return project_detail_validator_1.conventionalize(projectDetail);
    }
    catch (e) {
        throw new Error(e);
    }
}
/**
 *  Returns the method reference based on the given project type.
 *  If new project type got added (ex. mangoDB) then we just have to add a case
 *  and return it's method's reference
 * */
function chooseProjectType(projectType, errors) {
    if (!projectType)
        errors.push('project type needed - please choose a valid one');
    switch (projectType) {
        case 'nest':
            return nest_init_1.initialiseNestProject;
        default:
            errors.push('invalid project type - please select valid project type');
    }
}
/* example data to generate a nest project */
/*generateProject({
  projectType: 'nest',
  dbName: "kugesh-database",
  tables: [{
    tableName: 'kugesh-table-1',
    tableProperties: [{
      propertyName: "kugesh-property-1",
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
    servicesRequired: {create: true, read: true, update: true, delete: true}
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
      servicesRequired: {create: false, read: false, update: true, delete: true}
    }
  ],
})
*/
//# sourceMappingURL=main.js.map