"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KugeshTable1_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KugeshTable1 = void 0;
const common_1 = require("@nestjs/common");
const kugesh_table1_kugesh_table2_controller_1 = require("./kugesh-table1,kugesh-table2.controller");
Object.defineProperty(exports, "KugeshTable1", { enumerable: true, get: function () { return kugesh_table1_kugesh_table2_controller_1.KugeshTable1; } });
const kugesh_table1_kugesh_table2_service_1 = require("./kugesh-table1,kugesh-table2.service");
let KugeshTable1 = KugeshTable1_1 = class KugeshTable1 {
};
KugeshTable1 = KugeshTable1_1 = __decorate([
    common_1.Module({
        controllers: [KugeshTable1_1, kugesh_table1_kugesh_table2_controller_1.kugeshTable2Controller],
        providers: [KugeshTable1_1, kugesh_table1_kugesh_table2_service_1.kugeshTable2Service]
    })
], KugeshTable1);
exports.KugeshTable1 = KugeshTable1;
kugeshTable2Module;
{ }
//# sourceMappingURL=kugesh-table1,kugesh-table2.module.js.map