"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./src/main");
var main_2 = require("./src/main");
Object.defineProperty(exports, "generateProject", { enumerable: true, get: function () { return main_2.generateProject; } });
main_1.generateProject({
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
//# sourceMappingURL=index.js.map