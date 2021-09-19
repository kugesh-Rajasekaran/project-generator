"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.initialiseProject = void 0;
const nest_controller_model_1 = require("../models/nest/nest-controller.model");
const nest_service_model_1 = require("../models/nest/nest-service.model");
const nest_entity_model_1 = require("../models/nest/nest-entity.model");
const nest_environment_model_1 = require("../models/nest/nest-environment.model");
const nest_dto_model_1 = require("../models/nest/nest-dto.model");
const project_detail_validator_1 = require("../validator/project-detail.validator");
const { execSync } = require("child_process");
const fs = require("fs");
function initialiseProject(projectDetail) {
    try {
        const projectName = projectDetail['dbName'];
        const moduleNames = projectDetail['tables'].map((tableDetail) => tableDetail['tableName']);
        const routeFolder = `${process.cwd()}/generated-projects`;
        console.log("[initialise-project] nest initiation started");
        const initResponse = execSync(`sh ../src/shell-files/nest-init.sh ${projectName} ${moduleNames}`, { input: 'npm', encoding: 'utf-8', cwd: routeFolder });
        console.log("[initialise-project] nest modules generate started");
        const modulesResponse = execSync(`sh ../../src/shell-files/nest-modules-generate.sh ${projectName} ${moduleNames.join(' ')}`, { input: 'npm', encoding: 'utf-8', cwd: `${routeFolder}/${project_detail_validator_1.changeToRouteFormat(projectName)}` });
        generateCode(projectDetail);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.initialiseProject = initialiseProject;
function generateCode(projectDetail) {
    try {
        const dir = `${process.cwd()}/generated-projects/${project_detail_validator_1.changeToRouteFormat(projectDetail['dbName'])}`;
        const entityRoute = `${dir}/src/entity/${project_detail_validator_1.changeToRouteFormat(projectDetail['dbName'])}.entity.ts`;
        const environmentRoute = `${dir}/environments/environment.ts`;
        console.log('[generate-code] file creation started');
        fileCreation([`${dir}/src/entity`, `${dir}/environments`, `${dir}/src/dto`]);
        console.log('[generate-code] generating code for entity files');
        generateCodeForFiles(entityRoute, [projectDetail['tables']], nest_entity_model_1.getEntityCode);
        console.log('[generate-code] generating code for environment');
        generateCodeForFiles(environmentRoute, [projectDetail], nest_environment_model_1.getEnvironmentCode);
        projectDetail.tables.forEach((tableEntity) => {
            const tableName = project_detail_validator_1.changeToRouteFormat(tableEntity['tableName']);
            const controllerRoute = `${dir}/src/${tableName}/${tableName}.controller.ts`;
            const serviceRoute = `${dir}/src/${tableName}/${tableName}.service.ts`;
            const dtoRoute = `${dir}/src/dto/${tableName}.dto.ts`;
            console.log('[generate-code] generating code for controller files');
            generateCodeForFiles(controllerRoute, [projectDetail['dbName'], tableEntity], nest_controller_model_1.getControllerCode);
            console.log('[generate-code] generating code for service files');
            generateCodeForFiles(serviceRoute, [projectDetail['dbName'], tableEntity], nest_service_model_1.getServiceCode);
            console.log('[generate-code] generating code for dto files');
            generateCodeForFiles(dtoRoute, [tableEntity], nest_dto_model_1.getDtoCode);
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.generateCode = generateCode;
function fileCreation(routeArr) {
    console.log("from fileCreation method");
    try {
        routeArr.forEach((route) => makeDirectory(route));
    }
    catch (e) {
        throw new Error(e);
    }
}
function generateCodeForFiles(dir, args, fnToGenerateCode) {
    console.log("[generateCodeFiles] with data -> " + JSON.stringify(args));
    try {
        fs.open(dir, "w", function (err, fd) {
            if (err)
                throw new Error("following directory not created -> " + dir);
            const codeToWrite = fnToGenerateCode(args[0], args[1]);
            fs.write(fd, codeToWrite, 0, "UTF-8", (error, noOfBytesWritten) => {
                console.log(`[${dir}] no of bytes written -> ${noOfBytesWritten}`);
            });
        });
    }
    catch (e) {
        console.log("ERROR -> " + e);
        throw new Error(e);
    }
}
function makeDirectory(dir) {
    try {
        fs.mkdirSync(dir);
    }
    catch (e) {
        throw new Error(e);
    }
}
//# sourceMappingURL=nest-init.js.map