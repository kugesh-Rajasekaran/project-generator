import {getControllerCode} from "../models/nest/nest-controller.model";
import {getServiceCode} from "../models/nest/nest-service.model";
import { getEntityCode } from "../models/nest/nest-entity.model";
import { getEnvironmentCode } from "../models/nest/nest-environment.model";
const { execSync } = require("child_process");
const fs = require("fs");

export function initialiseProject(projectDetail){
  try{
    const projectName = projectDetail['dbName'];
    const moduleNames = projectDetail['tables'].map((tableDetail) => tableDetail['tableName']);
    console.log("[initialise-project] nest initiation started");
    const initResponse = execSync(`sh src/shell-files/nest-init.sh ${projectName} ${moduleNames}`, {input: 'npm', encoding: 'utf-8', cwd: process.cwd() });
    console.log(JSON.stringify(initResponse));
    console.log("[initialise-project] nest modules generate started");
    const modulesResponse = execSync(`sh ../src/shell-files/nest-modules-generate.sh ${projectName} ${moduleNames.join(' ')}`, {input: 'npm', encoding: 'utf-8', cwd: `${process.cwd()}/${projectName}`});
    generateCode(projectDetail);
  } catch(e){
    throw new Error(e);
  }
}

export function generateCode(projectDetail){
  try{
    const dir = `${process.cwd()}/${projectDetail['dbName']}`;
    const entityRoute = `${dir}/src/entity/${projectDetail['dbName']}.entity.ts`;
    const environmentRoute = `${dir}/environments/environment.ts`;
   console.log('[generate-code] file creation started'); 
    fileCreation(`${dir}/src/entity`, `${dir}/environments`);
   console.log('[generate-code] generate code for entity started'); 
    generateCodeForFiles(entityRoute, [projectDetail['tables']], getEntityCode);
    console.log('[generate-code] geneate code for environment started');
    generateCodeForFiles(environmentRoute, [projectDetail], getEnvironmentCode);
    projectDetail.tables.forEach((tableEntity) => {
      const controllerRoute = `${dir}/src/${tableEntity['tableName']}/${tableEntity['tableName']}.controller.ts`;
      const serviceRoute = `${dir}/src/${tableEntity['tableName']}/${tableEntity['tableName']}.service.ts`  
    console.log('[generate-code] geneate code for controller started');
      generateCodeForFiles(controllerRoute, [projectDetail['dbName'], tableEntity], getControllerCode);
    console.log('[generate-code] geneate code for service started');
      generateCodeForFiles(serviceRoute, [projectDetail['dbName'], tableEntity], getServiceCode);
    });
  } catch(e){
    throw new Error(e);
  }
}

function fileCreation(entityRoute: string, environmentRoute: string){
  console.log("from fileCreation method");
  try{
    const makeDir = fs.mkdirSync;
    makeDir(entityRoute);
    makeDir(environmentRoute);
  } catch(e){
    throw new Error("");
  }
}

function generateCodeForFiles(dir, args, fnToGenerateCode){
  console.log("[generateCodeFiles] with data -> "+args);
  try{
    fs.open(dir, "w", function(err, fd) {
      if(err)
        throw new Error("following directory not created -> "+dir);
      const codeToWrite = fnToGenerateCode(args[0], args[1]); 
      fs.write(fd, codeToWrite, 0, "UTF-8", (error, noOfBytesWritten) => {
        console.log(`[${dir}] no of bytes written -> ${noOfBytesWritten}`);
      })
    });
  } catch(e){
    console.log("ERROR -> "+e);
    throw new Error(e);
  } 
}
