import {getControllerCode} from "../models/nest/nest-controller.model";
import {getServiceCode} from "../models/nest/nest-service.model";
import { getEntityCode } from "../models/nest/nest-entity.model";
import { getEnvironmentCode } from "../models/nest/nest-environment.model";
import { getDtoCode } from '../models/nest/nest-dto.model';
import { getCodeForModules, getCodeForAppModule } from '../models/nest/nest-module.model';
import { changeToRouteFormat } from '../validator/project-detail.validator';
const { execSync } = require("child_process");
const fs = require("fs");

export function initialiseNestProject(projectDetail){
  try{
    const projectName = projectDetail['dbName'];
    const moduleNames = projectDetail['tables'].map((tableDetail) => tableDetail['tableName']);
    const routeFolder = `${process.cwd()}/generated-projects`;
    console.log("[initialise-project] nest initiation started");
    const initResponse = execSync(`sh ../src/shell-files/nest/nest-init.sh ${projectName} ${moduleNames}`, { input: 'npm', encoding: 'utf-8', cwd: routeFolder });
    console.log("[initialise-project] nest modules generate started");
    const modulesResponse = execSync(`sh ../../src/shell-files/nest/nest-modules-generate.sh ${projectName} ${moduleNames.join(' ')}`, {input: 'npm', encoding: 'utf-8', cwd: `${routeFolder}/${changeToRouteFormat(projectName)}`});
    generateCode(projectDetail);
  } catch(e){
    throw new Error(e);
  }
}

export function generateCode(projectDetail){
  try{
    const dir = `${process.cwd()}/generated-projects/${changeToRouteFormat(projectDetail['dbName'])}`;
    const entityRoute = `${dir}/src/entity/${changeToRouteFormat(projectDetail['dbName'])}.entity.ts`;
    const environmentRoute = `${dir}/environments/environment.ts`;
    const moduleRoute = `${dir}/src/app.module.ts`;
    console.log('[generate-code] file creation started'); 
    fileCreation([`${dir}/src/entity`, `${dir}/environments`, `${dir}/src/dto`]);
    console.log('[generate-code] generating code for entity files'); 
    generateCodeForFiles(entityRoute, [projectDetail['tables']], getEntityCode);
    console.log('[generate-code] generating code for environment');
    generateCodeForFiles(environmentRoute, [projectDetail], getEnvironmentCode);
    console.log('[generate-code] generating code for app.module');
    generateCodeForModule(moduleRoute);
    projectDetail.tables.forEach((tableEntity) => {
      const tableName = changeToRouteFormat(tableEntity['tableName']);
      const tableNameRoute = `${dir}/src/${tableName}/${tableName}`;
      const controllerRoute = `${tableNameRoute}.controller.ts`;
      const serviceRoute = `${tableNameRoute}.service.ts`;
      const moduleRoute = `${tableNameRoute}.module.ts`;
      const dtoRoute = `${dir}/src/dto/${tableName}.dto.ts`;
      console.log('[generate-code] generating code for controller files');
      generateCodeForFiles(controllerRoute, [projectDetail['dbName'], tableEntity], getControllerCode);
      console.log('[generate-code] generating code for service files');
      generateCodeForFiles(serviceRoute, [projectDetail['dbName'], tableEntity], getServiceCode);
      console.log('[generate-code] generating code for module files');
      generateCodeForFiles(moduleRoute, [projectDetail['dbName'], tableEntity['tableName']], getCodeForModules);
      console.log('[generate-code] generating code for dto files');
      generateCodeForFiles(dtoRoute, [tableEntity], getDtoCode);
    });
  } catch(e){
    throw new Error(e);
  }
}

function fileCreation(routeArr: string[]){
  console.log("from fileCreation method");
  try{
    routeArr.forEach((route) => makeDirectory(route))
  } catch(e){
    throw new Error(e);
  }
}

function generateCodeForFiles(dir, args, fnToGenerateCode){
  console.log("[generateCodeFiles] with data -> "+ JSON.stringify(args));
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

function generateCodeForModule(route: string){
 console.log('[generateCodeForModule] with routeName -> '+ route);
 try{
   const codeToModify = fs.readFileSync(route, 'utf8');
   const codeToWrite = getCodeForAppModule(codeToModify);
   fs.open(route, 'w', function(err, fd) {
    fs.write(fd, codeToWrite, 0, 'UTF-8', (error, noOfBytesWritten) => {
      console.log(`[${route}] no of bytes written -> ${noOfBytesWritten}`);
    })
   })
 } catch(e){

 }
}

function makeDirectory(dir: string){
  try{
    fs.mkdirSync(dir);
  } catch(e){
    throw new Error(e);
  }
}
