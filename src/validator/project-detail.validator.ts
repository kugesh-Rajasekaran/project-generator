import { ProjectDetails } from '../models/project-detail.model';
import { validateInput } from './validate-string.validator';

export function projectDetailValidator(projectDetail: ProjectDetails, errors: string[]){
  try{
   validateInput(projectDetail['dbName'], 'string', 'dbName', 'projectDetail', errors);
  } catch(e){
   throw new Error(e);
  }
}

function checkDbName(dbName: string){
  try{
    let errors = ``;
    if(!dbName.length)
      errors += `invalid database name`;
    else if(typeof dbName == 'string')
     errors += `Database name type mismatch expected string but found ${typeof dbName}`;
    if(errors.length)
      throw new Error(errors);
    return '';
  } catch(e){
     console.log(`ERROR -> ${e}`);  
     return e;
  }
}
