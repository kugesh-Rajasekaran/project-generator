"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDtoCode = void 0;
function getDtoCode(tableDetail) {
    console.log('--- from getDtoCode method ---');
    console.log(JSON.stringify(tableDetail));
    return `  export class Create${tableDetail['tableName']}RequestDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
   ${getDtoEntity(tableDetail)}
  }

  export class Read${tableDetail['tableName']}RequestDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
  }

  export class Update${tableDetail['tableName']}RequestDto extends Create${tableDetail['tableName']}Dto{}

  export class Delete${tableDetail['tableName']}RequestDto extends Update${tableDetail['tableName']}Dto{}

  export class Create${tableDetail['tableName']}ResponseDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
   ${getDtoEntity(tableDetail)}
  }

  export class Read${tableDetail['tableName']}ResponseDto extends Create${tableDetail['tableName']}RequestDto{}

  export class Update${tableDetail['tableName']}ResponseDto extends Create${tableDetail['tableName']}Dto{}

  export class Delete${tableDetail['tableName']}ResponseDto extends Update${tableDetail['tableName']}Dto{}
`;
}
exports.getDtoCode = getDtoCode;
function getDtoEntity(tableDetail) {
    console.log('--- from getDtoEntity ---');
    const dtoCode = tableDetail.tableProperties.map((tableProperty) => {
        return `${tableProperty['propertyName']}: ${tableProperty['propertyType']};`;
    });
    return dtoCode.join("\n");
}
//# sourceMappingURL=nest-dto.model.js.map