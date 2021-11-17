"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceCode = void 0;
const project_detail_validator_1 = require("../../validator/project-detail.validator");
function getServiceCode(dbName, tableDetails) {
    const { tableName, servicesRequired } = tableDetails;
    return ` import { Injectable, Logger } from '@nestjs/common';
import { ${tableName}, ${tableName}Repository } from '../entity/${project_detail_validator_1.changeToRouteFormat(dbName)}.entity';
import { Create${tableName}RequestDto, Read${tableName}RequestDto, Delete${tableName}RequestDto, Update${tableName}RequestDto } from '../dto/${project_detail_validator_1.changeToRouteFormat(tableName)}.dto';

@Injectable()
export class ${tableName}Service{
 private logger: Logger;

 constructor(private repository: ${tableName}Repository){
  this.logger = new Logger('${tableName.toUpperCase()}_SERVICE');
 }
  
${servicesRequired.create ?
        `async create${tableName}(createObj: Create${tableName}RequestDto){
    this.logger.log("from create${tableName} method");
    try{
      const dbObj = new ${tableName}();
      ${initialiseNewObj(tableDetails)}
      return dbObj.save(); 
    } catch(e){
      this.logger.error(e['message']);
      return e['message'];
    }
  }`
        : ''}

${servicesRequired.read ?
        `async read${tableName}(readObj: Read${tableName}RequestDto){
    try{
      return this.repository.findOne({${tableDetails['primaryKeyName']}: readObj.${tableDetails['primaryKeyName']} });
    } catch(e){
      this.logger.error(e['message']);
      return e['message'];
    }
  }` : ''}

${servicesRequired.update ?
        `async update${tableName}(updateObj: Update${tableName}RequestDto){
    try{
      return this.repository.save(updateObj);
    } catch(e){
      this.logger.error(e['message']);
      return e['message'];
    }
  }` : ''}

${servicesRequired.delete ?
        `async delete${tableName}(deleteObj: Delete${tableName}RequestDto){
  try{
   return this.repository.delete({${tableDetails['primaryKeyName']}: deleteObj.${tableDetails['primaryKeyName']}});
  } catch(e){
    this.logger.error(e['message']);
    return e['message'];
  }
 }
` : ''}
}`;
}
exports.getServiceCode = getServiceCode;
function initialiseNewObj(tableDetails) {
    const properties = tableDetails['tableProperties'].map((tableProperty) => `dbObj.${tableProperty['propertyName']} = createObj.${tableProperty['propertyName']};`);
    return properties.join('\n');
}
//# sourceMappingURL=nest-service.model.js.map