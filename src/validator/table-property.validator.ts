import { TableProperties } from "../models/project-detail.model";
import { validateInput, validateTypeInput } from './validate-string.validator';

export function tablePropertyValidator(tableProperty: TableProperties, errors: string[]){
try{
  console.log(JSON.stringify(tableProperty));
  validateInput(tableProperty['propertyName'], 'string', 'propertyName', 'TableProperty', errors);
  validateInput(tableProperty['propertyType'], 'string', 'propertyName', 'TableProperties', errors);
  validateTypeInput(tableProperty['propertyType'], 'propertyName', 'TableProperties', errors)
} catch(e){
  throw new Error(e);
}
}
