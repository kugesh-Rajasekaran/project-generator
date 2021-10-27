"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentCode = void 0;
const project_detail_validator_1 = require("../../validator/project-detail.validator");
function getEnvironmentCode(projectDetails) {
    const entities = generateTableNames(projectDetails);
    return `import { TypeOrmModuleOptions } from '@nestjs/typeorm';
   import { ${entities} } from '../src/entity/${project_detail_validator_1.changeToRouteFormat(projectDetails['dbName'])}.entity';
  const postgresLocalConfig: TypeOrmModuleOptions={
   type: 'postgres',
   host: '127.0.0.1',
   port: 5432,
   username: 'postgres',
   password: 'root',
   database: '${projectDetails['dbName']}',
   entities: [${entities}],
   autoLoadEntities: true,
   synchronize: true
  }

  export const environment = {
   production: false,
   databaseConfig: postgresLocalConfig
  }
  `;
}
exports.getEnvironmentCode = getEnvironmentCode;
function generateTableNames(projectDetails) {
    return projectDetails['tables'].map((entity) => {
        console.log(`tableNames  --> ${entity} `);
        return entity['tableName'];
    });
}
//# sourceMappingURL=nest-environment.model.js.map