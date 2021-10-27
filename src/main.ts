import { ProjectDetails } from './models/project-detail.model'; 
import { initialiseNestProject } from "./executor/nest-init"; 
import { projectDetailValidator, conventionalize, changeToRouteFormat } from './validator/project-detail.validator';
import { tableDetailValidator } from './validator/table-detail.validator';
import { tablePropertyValidator } from './validator/table-property.validator';
import * as fs from 'fs';

/**
 *  This will be the start of the application.
 *  To generate project you should call this function.
 *  Ex. import { generateProject } from 'path_of_this_library';
 *      generateProject(input_data); 
 * */
export function generateProject(projectDetails: ProjectDetails){
  try{
    console.log('[main] entered');
    const errors : string[] = [];
    sanitiseInput(projectDetails, errors); 
    console.log("ERRORS -> "+errors);
    const initProject = chooseProjectType(projectDetails['projectType'], errors);
    if(errors.length)
      throw new Error(errors.join(', '));
    const conventionalizedProjectDetails: ProjectDetails = conventionalize(projectDetails);
    console.log("conventionalized -> "+ JSON.stringify(conventionalizedProjectDetails));
    initProject(conventionalizedProjectDetails);
    console.log('[main] ended');
  } catch(e){
    console.log(e);
    throw new Error(e['message']);
  }
}

/**
 *  Sanitise the input provided by the user.
 *  If the input is in the wrong format then this function will throw error.
 * */
function sanitiseInput(projectDetail: ProjectDetails, errors: string[]){
  try{
    console.log('[sanitiseInput] sanitization starts');
    checkProjectNameAlreadyPresent(projectDetail['dbName'], errors);
    projectDetailValidator(projectDetail, errors);
    if(!projectDetail['tables'].length)
      errors.push(`table details not provided - please provide atleast one`);
    projectDetail['tables'].forEach((tableDetail) => {
      tableDetailValidator(tableDetail, errors);       
      if(!tableDetail['tableProperties'].length)
        errors.push(`table property details not provided - please provide atleast one for each table`)
      tableDetail['tableProperties'].forEach((tableProperty) => tablePropertyValidator(tableProperty, errors));
    });
  } catch(e){
    throw new Error(e['message']);
  }
}

/**
 *  Checks a project already present with the given name.
 *  If it is, then error will be thrown.
 * */
function checkProjectNameAlreadyPresent(dbName: string, errors: string[]){
  if(!dbName)
    errors.push('database name is empty - please provide valid database name');
  if(fs.existsSync(`./generated-projects/${changeToRouteFormat(dbName)}`))
    errors.push('given project/database name already present - please provide another name or delete the existing one');
}

/**
 *  Conventionalizes the input to proper format.
 *  The library uses this method's o/p to generate project.
 * */
function conventionalizeInput(projectDetail: ProjectDetails){
  try{
    return conventionalize(projectDetail);
  } catch(e){
    throw new Error(e);
  }
}

/**
 *  Returns the method reference based on the given project type.
 *  If new project type got added (ex. mangoDB) then we just have to add a case 
 *  and return it's method's reference 
 * */
function chooseProjectType(projectType: string, errors: string[]){
  if(!projectType)
    errors.push('project type needed - please choose a valid one');
  switch(projectType){
    case 'nest':
      return initialiseNestProject;
    default:
      errors.push('invalid project type - please select valid project type');
  }
}

/* example data to generate a nest project */
generateProject({
  projectType: 'nest',
  dbName: "kugesh-database",
  tables: [{
    tableName: '       kugesh         table 1  ',
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

