import { ProjectDetails } from '../models/project-detail.model';
import { validateInput } from './validate-string.validator';

export function projectDetailValidator(projectDetail: ProjectDetails, errors: string[]){
  try{
    validateInput(projectDetail['dbName'], 'string', 'dbName', 'projectDetail', errors);
  } catch(e){
    throw new Error(e);
  }
}

export function conventionalize(projectDetail: ProjectDetails){
  console.log("conventionalize "+JSON.stringify(projectDetail));
  return {
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

function conventionalizeInput(propertyValue: string , propertyType: string){
  const propertyValueLowerCased = propertyValue.toLowerCase();
  const strLength = propertyValue.length;
  let conventionalizedString = '';
  let itr = 0;   
  if(propertyType == 'class')
    conventionalizedString += propertyValue[itr++].toUpperCase(); 
  while(itr < strLength)
  {
    if(propertyValue[itr] == ' ' || propertyValue[itr] == '-')
      conventionalizedString += propertyValue[++itr].toUpperCase();
    else
      conventionalizedString += propertyValue[itr];
    itr++;
  }
  return conventionalizedString;
}

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
