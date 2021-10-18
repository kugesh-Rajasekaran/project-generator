import { TableDetails, TableProperties } from '../project-detail.model';

export function getDtoCode(tableDetail: TableDetails){
  console.log('--- from getDtoCode method ---');
  console.log(JSON.stringify(tableDetail));
  return `  export class Create${tableDetail['tableName']}RequestDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
   ${getDtoEntity(tableDetail)}
  }

  export class Read${tableDetail['tableName']}RequestDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
  }

  export class Update${tableDetail['tableName']}RequestDto extends Create${tableDetail['tableName']}RequestDto{}

  export class Delete${tableDetail['tableName']}RequestDto extends Read${tableDetail['tableName']}RequestDto{}

  export class Create${tableDetail['tableName']}ResponseDto{
   ${tableDetail['primaryKeyName']}: ${tableDetail['primaryKeyType']};
   ${getDtoEntity(tableDetail)}
  }

  export class Read${tableDetail['tableName']}ResponseDto extends Create${tableDetail['tableName']}RequestDto{}

  export class Update${tableDetail['tableName']}ResponseDto extends Create${tableDetail['tableName']}RequestDto{}

  export class Delete${tableDetail['tableName']}ResponseDto extends Update${tableDetail['tableName']}RequestDto{}
`;
}

function getDtoEntity(tableDetail: TableDetails){
  console.log('--- from getDtoEntity ---');
  const dtoCode = tableDetail.tableProperties.map((tableProperty) => {
    return `${tableProperty['propertyName']}: ${tableProperty['propertyType']};`;
  });
  return dtoCode.join("\n");
}
