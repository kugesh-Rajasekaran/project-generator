import { TableDetails } from '../project-detail.model';

export function getControllerCode(dbName: string, tableDetails: TableDetails){
const tableName = tableDetails['tableName'];

return ` import { Logger, Controller, Get } from '@nestjs/common';
import { ${tableName}Service } from './${tableName}.service';
import { ${tableName} } from '../../entity/${dbName}.entity.ts';

@Controller('${tableDetails['tableName']}')
export class ${tableDetails['tableName']}Controller{

   constructor(private service: ${tableName}Service){
     this.logger = new Logger('${tableName.toUpperCase()}_CONTROLLER');
   }

 @Post('create${tableName}')
 async create${tableName}(@Body() createData: ${tableName}){
try{
   return service.create${tableName}(createData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }


 @Post('read${tableName}')
 async read${tableName}(@Body() readData: {id: string}){
try{
   return service.create${tableName}(readData.id);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

@Post('delete${tableName}')
 async delete${tableName}(@Body() deletData: {id: string}){
try{
   return service.delete${tableName}(deleteData.id);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

@Post('update${tableName}')
 async update${tableName}(@Body() updateData: ${tableName}){
try{
   return service.create${tableName}(updateData);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }
}
`;
}
