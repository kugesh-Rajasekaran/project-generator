import { changeToRouteFormat } from '../../validator/project-detail.validator';
export function getCodeForModules(dbName: string, tableName: string){
  return `import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ${tableName}Controller  } from './${changeToRouteFormat(tableName)}.controller';
  import { ${tableName}Service  } from './${changeToRouteFormat(tableName)}.service';
  import { ${tableName}Repository } from '../entity/${changeToRouteFormat(dbName)}.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([${tableName}Repository])],
    controllers: [${tableName}Controller],
    providers: [${tableName}Service]
  })
  export class ${tableName}Module {}
  `;
}

export function getCodeForAppModule(code: string){
   const importContent = `import { TypeOrmModule } from '@nestjs/typeorm';
   import { environment } from '../environments/environment';
    `;
  const provideObjToImport = `TypeOrmModule.forRoot(environment.databaseConfig), `;

  return code.slice(0, code.indexOf('@Module')) + importContent + code.slice(code.indexOf('@Module'), code.indexOf('[') + 1) + provideObjToImport + code.slice(code.indexOf('[') + 1)
}
