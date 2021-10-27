import { ProjectDetails } from '../models/project-detail.model';
import { validateInput } from './validate-string.validator';

/**
 *  This is the validator function which validates database name related information
 *  validates -> database name
 * */
export function projectDetailValidator(projectDetail: ProjectDetails, errors: string[]){
  try{
    validateInput(projectDetail['dbName'], 'string', 'dbName', 'projectDetail', errors);
  } catch(e){
    throw new Error(e);
  }
}

/**
 *  Conventionalize's the input which is suitable for generating code (iterates the input and calls conventionalizeInput)
 *  For example,
 *              Database name - profile table -> ProfileTable
 * */
export function conventionalize(projectDetail: ProjectDetails){
  console.log("conventionalize "+JSON.stringify(projectDetail));
  return {
    projectType: projectDetail['projectType'],
    dbName: conventionalizeInput(projectDetail['dbName'], 'class'),
    tables: projectDetail['tables'].map((tableDetail) => {
      return {
        tableName: conventionalizeInput(tableDetail['tableName'], 'class'),
        tableProperties: tableDetail['tableProperties'].map((tableProperty) => {
          return {
            propertyName: conventionalizeInput(tableProperty['propertyName'], 'property'),
            propertyType: conventionalizeInput(tableProperty['propertyType'], 'property')
          }
        }),
        primaryKeyName: conventionalizeInput(tableDetail['primaryKeyName'], 'property'),
        primaryKeyType: conventionalizeInput(tableDetail['primaryKeyType'], 'property'),
        servicesRequired: tableDetail['servicesRequired']
      }
    })
  }
}

/**
 *  Conventionalize's the given input which is suitable for generating code
 * */
function conventionalizeInput(propertyValue: string , propertyType: string){
  const propertyValueLowerCased = propertyValue.toLowerCase();
  let conventionalizedString = '';
  let itr = 0;
  console.log("property value --> "+propertyValue);
  const sanitizedVal = propertyValue.trim().replace(/\s\s+/g, ' ');
  console.log("After sanitized ---> "+sanitizedVal);
  if(propertyType == 'class')
    conventionalizedString += sanitizedVal[itr++].toUpperCase(); 
  const strLength = sanitizedVal.length;
  while(itr < strLength)
  {
    if(sanitizedVal[itr] == ' ' || sanitizedVal[itr] == '-')
      conventionalizedString += sanitizedVal[++itr].toUpperCase();
    else
      conventionalizedString += sanitizedVal[itr];
    itr++;
  }
  console.log("output property value --> "+conventionalizedString);
  return conventionalizedString;
}

/**
 *  Transforms the give input to route format. 
 *  Used when we want to create file with the conventionalized name (we can't create a file with conventionalized name).
 *  So, we can simply call this function and get route formatted name
 * */
export function changeToRouteFormat(value: string){
  const strLength = value.length;
  let itr = 1;
  let routeFormattedString = value[0];
  while(itr < strLength){
    if(value[itr] >= 'A' && value[itr] <= 'Z')
      routeFormattedString += '-' + value[itr].toLowerCase();
    else
    routeFormattedString +=  value[itr];;
    itr++;
  }
  return routeFormattedString.toLowerCase();
}
