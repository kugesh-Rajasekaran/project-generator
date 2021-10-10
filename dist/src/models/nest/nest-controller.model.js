"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControllerCode = void 0;
const project_detail_validator_1 = require("../../validator/project-detail.validator");
function getControllerCode(dbName, tableDetails) {
    const tableName = tableDetails['tableName'];
    return ` import { Logger, Controller, Get, Post, Body } from '@nestjs/common';
import { ${tableName}Service } from './${project_detail_validator_1.changeToRouteFormat(tableName)}.service';
import { ${tableName} } from '../../entity/${project_detail_validator_1.changeToRouteFormat(dbName)}.entity.ts';

@Controller('${tableDetails['tableName']}')
export class ${tableDetails['tableName']}Controller{
   private logger: Logger;

   constructor(private service: ${tableName}Service){
     this.logger = new Logger('${tableName.toUpperCase()}_CONTROLLER');
   }

 @Post('create${tableName}')
 async create${tableName}(@Body() createData: ${tableName}){
try{
   return this.service.create${tableName}(createData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }


 @Post('read${tableName}')
 async read${tableName}(@Body() readData: {id: string}){
try{
   return this.service.read${tableName}(readData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

@Post('delete${tableName}')
 async delete${tableName}(@Body() deleteData: {id: string}){
try{
   return this.service.delete${tableName}(deleteData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

@Post('update${tableName}')
 async update${tableName}(@Body() updateData: ${tableName}){
try{
   return this.service.create${tableName}(updateData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }
}
`;
}
exports.getControllerCode = getControllerCode;
//# sourceMappingURL=nest-controller.model.js.map