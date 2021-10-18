"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeForAppModule = exports.getCodeForModules = void 0;
const project_detail_validator_1 = require("../../validator/project-detail.validator");
function getCodeForModules(dbName, tableName) {
    return `import { Module } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { ${tableName}Controller  } from './${project_detail_validator_1.changeToRouteFormat(tableName)}.controller';
  import { ${tableName}Service  } from './${project_detail_validator_1.changeToRouteFormat(tableName)}.service';
  import { ${tableName}Repository } from '../entity/${project_detail_validator_1.changeToRouteFormat(dbName)}.entity';

  @Module({
    imports: [TypeOrmModule.forFeature([${tableName}Repository])],
    controllers: [${tableName}Controller],
    providers: [${tableName}Service]
  })
  export class ${tableName}Module {}
  `;
}
exports.getCodeForModules = getCodeForModules;
function getCodeForAppModule(code) {
    const importContent = `import { TypeOrmModule } from '@nestjs/typeorm';
   import { environment } from '../environments/environment';
    `;
    const provideObjToImport = `TypeOrmModule.forRoot(environment.databaseConfig), `;
    return code.slice(0, code.indexOf('@Module')) + importContent + code.slice(code.indexOf('@Module'), code.indexOf('[') + 1) + provideObjToImport + code.slice(code.indexOf('[') + 1);
}
exports.getCodeForAppModule = getCodeForAppModule;
//# sourceMappingURL=nest-module.model.js.map