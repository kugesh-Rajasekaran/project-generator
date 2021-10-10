"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityCode = void 0;
function getEntityCode(tableDetails) {
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
`;
}
exports.getEntityCode = getEntityCode;
function generateEntityCode(tableDetails) {
    console.log("--- from entity code generation ---");
    console.log(tableDetails);
    const entityCode = tableDetails.map((tableEntity) => {
        return `@Entity()
    export class ${tableEntity['tableName']}{
     @PrimaryColumn()
     ${tableEntity['primaryKeyName']}: ${tableEntity['primaryKeyType']};
     ${propertyGenerator(tableEntity['tableProperties'])}
    }
    @EntityRepository(${tableEntity['tableName']})
    export class ${tableEntity['tableName']}Repository extends Repository<${tableEntity['tableName']}>{}
    `;
    });
    return entityCode.join("\n");
}
function propertyGenerator(tableProperties) {
    if (!tableProperties.length)
        return;
    const propertiesCode = tableProperties.map((propertyEntity) => {
        return `@Column()  ${propertyEntity['propertyName']}:  ${propertyEntity['propertyType']};`;
    });
    return propertiesCode.join("\n");
}
//# sourceMappingURL=nest-entity.model.js.map