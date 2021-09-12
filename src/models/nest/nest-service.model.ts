import { TableDetails } from '../project-detail.model';

export function getServiceCode(dbName: string, tableDetails: TableDetails) {
  const tableName = tableDetails['tableName'];
  return ` import { injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ${tableName} } from '../../entity/${dbName}.entity.ts';
@Injectable()
class ${tableName}Service{
 private logger: Logger;

 constructor(private repository: ${tableName}Repository){
  this.logger = new Logger('${tableName.toUpperCase()}_SERVICE');
 }

 async create${tableName}(createObj: ${tableName}){
  this.logger.log("from create${tableName} method");
  try{
   const dbObj = new ${tableName};
   ${initialiseNewObj(tableDetails)}
   return dbObj.save(); 
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

 async read${tableName}(id: ${tableDetails['primaryKeyType']}){
 try{
   return dbObj.findOne({${tableDetails['primaryKeyName']}: id });
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

 async update${tableName}(updateObj: ${tableName}){
 try{
   return this.repository.save(updateObj);
  } catch(e){
   this.logger.error(e['message']);
   return e['message'];
  }
 }

 async delete${tableName}(id: string){
  try{
   return this.repository.delete({${tableDetails['primaryKeyName']}: id});
  } catch(e){
  this.logger.error(e['message']);
   return e['message'];
 }
 }


}`;
}

function initialiseNewObj(tableDetails: TableDetails){
  const properties = tableDetails['tableProperties'].map((tableProperty) => `const dbObj.${tableProperty['propertyName']} = createObj.${tableProperty['propertyName']}`
  );
  return properties.join('\n');
}
