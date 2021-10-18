"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KugeshTable2Module = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const kugesh_table2_controller_1 = require("./kugesh-table2.controller");
const kugesh_table2_service_1 = require("./kugesh-table2.service");
const kugesh_database_entity_1 = require("../entity/kugesh-database.entity");
let KugeshTable2Module = class KugeshTable2Module {
};
KugeshTable2Module = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([kugesh_database_entity_1.KugeshTable2Repository])],
        controllers: [kugesh_table2_controller_1.KugeshTable2Controller],
        providers: [kugesh_table2_service_1.KugeshTable2Service]
    })
], KugeshTable2Module);
exports.KugeshTable2Module = KugeshTable2Module;
//# sourceMappingURL=kugesh-table2.module.js.map