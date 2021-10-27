export interface ProjectDetails{
  projectType: 'nest';
  dbName: string;
  tables: TableDetails[];
}

export interface TableDetails{
  tableName: string
  tableProperties: TableProperties[];
  primaryKeyName: string;
  primaryKeyType: string;
  servicesRequired: ServicesRequired;
} 

export interface TableProperties{
  propertyName: string;
  propertyType: string;
}

export interface ServicesRequired{
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
