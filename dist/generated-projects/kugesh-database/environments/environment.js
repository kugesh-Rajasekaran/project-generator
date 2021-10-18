"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const kugesh_database_entity_1 = require("../src/entity/kugesh-database.entity");
const postgresLocalConfig = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'surfpay-checkout',
    entities: [kugesh_database_entity_1.KugeshTable1, kugesh_database_entity_1.KugeshTable2],
    autoLoadEntities: true,
    synchronize: true
};
exports.environment = {
    production: false,
    databaseConfig: postgresLocalConfig
};
//# sourceMappingURL=environment.js.map