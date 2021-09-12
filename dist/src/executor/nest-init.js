"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.initialiseProject = void 0;
const nest_controller_model_1 = require("../models/nest/nest-controller.model");
const nest_service_model_1 = require("../models/nest/nest-service.model");
const nest_entity_model_1 = require("../models/nest/nest-entity.model");
const nest_environment_model_1 = require("../models/nest/nest-environment.model");
const { execSync } = require("child_process");
const fs = require("fs");
function initialiseProject(projectDetail) {
    try {
        const projectName = projectDetail['dbName'];
        const moduleNames = projectDetail['tables'].map((tableDetail) => tableDetail['tableName']);
        console.log("[initialise-project] nest initiation started");
        const initResponse = execSync(`sh src/shell-files/nest-init.sh ${projectName} ${moduleNames}`, { input: 'npm', encoding: 'utf-8', cwd: process.cwd() });
        console.log(JSON.stringify(initResponse));
        console.log("[initialise-project] nest modules generate started");
        const modulesResponse = execSync(`sh ../src/shell-files/nest-modules-generate.sh ${projectName} ${moduleNames.join(' ')}`, { input: 'npm', encoding: 'utf-8', cwd: `${process.cwd()}/${projectName}` });
        generateCode(projectDetail);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.initialiseProject = initialiseProject;
function generateCode(projectDetail) {
    try {
        const dir = `${process.cwd()}/${projectDetail['dbName']}`;
        const entityRoute = `${dir}/src/entity/${projectDetail['dbName']}.entity.ts`;
        const environmentRoute = `${dir}/environments/environment.ts`;
        console.log('[generate-code] file creation started');
        fileCreation(`${dir}/src/entity`, `${dir}/environments`);
        console.log('[generate-code] generate code for entity started');
        generateCodeForFiles(entityRoute, [projectDetail['tables']], nest_entity_model_1.getEntityCode);
        console.log('[generate-code] geneate code for environment started');
        generateCodeForFiles(environmentRoute, [projectDetail], nest_environment_model_1.getEnvironmentCode);
        projectDetail.tables.forEach((tableEntity) => {
            const controllerRoute = `${dir}/src/${tableEntity['tableName']}/${tableEntity['tableName']}.controller.ts`;
            const serviceRoute = `${dir}/src/${tableEntity['tableName']}/${tableEntity['tableName']}.service.ts`;
            console.log('[generate-code] geneate code for controller started');
            generateCodeForFiles(controllerRoute, [projectDetail['dbName'], tableEntity], nest_controller_model_1.getControllerCode);
            console.log('[generate-code] geneate code for service started');
            generateCodeForFiles(serviceRoute, [projectDetail['dbName'], tableEntity], nest_service_model_1.getServiceCode);
        });
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.generateCode = generateCode;
function fileCreation(entityRoute, environmentRoute) {
    console.log("from fileCreation method");
    try {
        const makeDir = fs.mkdirSync;
        makeDir(entityRoute);
        makeDir(environmentRoute);
    }
    catch (e) {
        throw new Error("");
    }
}
function generateCodeForFiles(dir, args, fnToGenerateCode) {
    console.log("[generateCodeFiles] with data -> " + args);
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
//# sourceMappingURL=nest-init.js.map