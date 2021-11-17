import { generateProject } from './src/main';
export { generateProject } from './src/main';

generateProject({
  dbName: "kugesh-raj-db",
  projectType: 'nest',
  tables: [
    {
     tableName: "kugesh-raj-table",
     tableProperties: [
      {
       propertyName: "kugesh_property",
       propertyType: "string"
      }
     ],
     primaryKeyName: "kugesh_primaryKey",
     primaryKeyType: "string",
     servicesRequired: {
      create: false,
      read: false,
      update: false,
      delete: false
     }
    }
  ]
});
