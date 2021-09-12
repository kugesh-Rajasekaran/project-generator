import { ProjectDetails } from './models/project-detail.model'; 
import { initialiseProject } from "./executor/nest-init"; 
import { projectDetailValidator } from './validator/project-detail.validator';
import { tableDetailValidator } from './validator/table-detail.validator';
import { tablePropertyValidator } from './validator/table-property.validator';

export function main(projectDetails: ProjectDetails){
  try{

    console.log('[main] entered');
    const errors : string[] = [];
    sanitiseInput(projectDetails, errors); 
    console.log(" ----> "+errors);
    if(errors.length)
      throw new Error(errors.join(', '));
    initialiseProject(projectDetails);
    console.log('[main] ended');
  } catch(e){
    console.log(e);
    throw new Error(e);
  }
}

function sanitiseInput(projectDetail: ProjectDetails, errors: string[]){
  try{
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
