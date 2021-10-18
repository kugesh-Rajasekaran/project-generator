import { TableDetails, TableProperties } from '../project-detail.model';
export function getEntityCode(tableDetails: TableDetails[]){

  return `import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    EntityRepository,
    Repository,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

${generateEntityCode(tableDetails)}
`
}

function generateEntityCode(tableDetails: TableDetails[]){
  console.log("--- from entity code generation ---");
  console.log(tableDetails);

  const entityCode = tableDetails.map((tableEntity) => {
    return `@Entity()
    export class ${tableEntity['tableName']} extends BaseEntity{
     @PrimaryGeneratedColumn("uuid")
     ${tableEntity['primaryKeyName']}: ${tableEntity['primaryKeyType']};
     ${propertyGenerator(tableEntity['tableProperties'])}
    }
    @EntityRepository(${tableEntity['tableName']})
    export class ${tableEntity['tableName']}Repository extends Repository<${tableEntity['tableName']}>{}
    `;
  });

  return entityCode.join("\n");
}

function propertyGenerator(tableProperties: TableProperties[]){

  if(!tableProperties.length)
   return ;
  const propertiesCode = tableProperties.map((propertyEntity) => {
   return `@Column()  ${propertyEntity['propertyName']}:  ${propertyEntity['propertyType']};`;
  });
  return propertiesCode.join("\n"); 
}
