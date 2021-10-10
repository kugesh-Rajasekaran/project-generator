"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const KugeshDatabase_entity_1 = require("../../entity/KugeshDatabase.entity");
const postgresLocalConfig = {
    type: 'postgres',
    host: '127.0.0.1',
    port: 8080,
    username: 'postgres',
    password: 'root',
    database: 'KugeshDatabase',
    entities: [KugeshDatabase_entity_1.KugeshTable1, KugeshDatabase_entity_1.KugeshTable2],
    autoLoadEntities: true,
    synchronize: true
};
exports.environment = {
    production: false,
    databaseConfig: postgresLocalConfig
};
//# sourceMappingURL=environment.js.map