import { ProjectDetails } from './models/project-detail.model'; 
import { initialiseProject } from "./executor/nest-init"; 
import { projectDetailValidator, conventionalize, changeToRouteFormat } from './validator/project-detail.validator';
import { tableDetailValidator } from './validator/table-detail.validator';
import { tablePropertyValidator } from './validator/table-property.validator';
import * as fs from 'fs';

export function main(projectDetails: ProjectDetails){
  try{

    console.log('[main] entered');
    const errors : string[] = [];
    sanitiseInput(projectDetails, errors); 
    console.log("ERRORS -> "+errors);
    if(errors.length)
      throw new Error(errors.join(', '));
    const conventionalizedProjectDetails: ProjectDetails = conventionalize(projectDetails);
    console.log("conventionalized --> "+ JSON.stringify(conventionalizedProjectDetails));
    initialiseProject(conventionalizedProjectDetails);
    console.log('[main] ended');
  } catch(e){
    console.log(e);
    throw new Error(e['message']);
  }
}

function sanitiseInput(projectDetail: ProjectDetails, errors: string[]){
  try{
    console.log('[sanitiseInput] sanitization starts');
    checkProjectNameAlreadyPresent(projectDetail['dbName']);
    projectDetailValidator(projectDetail, errors);
    if(!projectDetail['tables'].length)
      errors.push(`table details not provided`);
    projectDetail['tables'].forEach((tableDetail) => {
      tableDetailValidator(tableDetail, errors);       
      if(!tableDetail['tableProperties'].length)
        errors.push(`table property details not provided`)
      tableDetail['tableProperties'].forEach((tableProperty) => tablePropertyValidator(tableProperty, errors));
    });
  } catch(e){
    throw new Error(e['message']);
  }
}

function checkProjectNameAlreadyPresent(dbName: string){
  if(!dbName)
    throw new Error('database name is empty - please provide valid database name');
  console.debug("exist or not --> "+ fs.existsSync(`./generated-projects/${changeToRouteFormat(dbName)}`));
  if(fs.existsSync(`./generated-projects/${changeToRouteFormat(dbName)}`))
    throw new Error('given project/database name already present - please provide another name');
}

function conventionalizeInput(projectDetail: ProjectDetails){
  try{
    return conventionalize(projectDetail);
  } catch(e){
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
      servicesRequired: {create: true, read: true, update: true, delete: true}
    }
  ],
})

