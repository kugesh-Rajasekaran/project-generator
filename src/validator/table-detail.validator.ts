import { TableDetails } from "../models/project-detail.model";
import { validateInput } from './validate-string.validator';

export function tableDetailValidator(tableDetail: TableDetails, errors: string[]){
  try{
  validateInput(tableDetail['tableName'], 'string','tableName', 'tableDetail', errors);
  validateInput(tableDetail['primaryKeyName'], 'string', 'primaryKeyName', 'tableDetail', errors);
  validateInput(tableDetail['primaryKeyType'], 'string', 'primaryKeyType', 'tableDetail', errors);
  } catch(e){
   throw new Error(e);
  }
}

