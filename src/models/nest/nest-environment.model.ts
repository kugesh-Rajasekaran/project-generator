import { ProjectDetails } from '../project-detail.model';
import { changeToRouteFormat } from '../../validator/project-detail.validator';

export function getEnvironmentCode(projectDetails :ProjectDetails){
 const entities = generateTableNames(projectDetails);
 return `import { TypeOrmModuleOptions } from '@nestjs/typeorm';
   import { ${entities} } from '../src/entity/${changeToRouteFormat(projectDetails['dbName'])}.entity';
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

function generateTableNames(projectDetails: ProjectDetails){
 return projectDetails['tables'].map((entity) => {
  return entity['tableName']
 })
}
