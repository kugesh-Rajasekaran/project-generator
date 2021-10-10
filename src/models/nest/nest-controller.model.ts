import { TableDetails } from '../project-detail.model';
import { changeToRouteFormat } from '../../validator/project-detail.validator';

export function getControllerCode(dbName: string, tableDetails: TableDetails){
const tableName = tableDetails['tableName'];

return ` import { Logger, Controller, Get, Post, Body } from '@nestjs/common';
import { ${tableName}Service } from './${changeToRouteFormat(tableName)}.service';
import { ${tableName} } from '../../entity/${changeToRouteFormat(dbName)}.entity.ts';

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
