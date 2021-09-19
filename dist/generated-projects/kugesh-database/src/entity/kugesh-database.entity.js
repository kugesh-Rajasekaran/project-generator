"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KugeshTable2Repository = exports.KugeshTable2 = exports.KugeshTable1Repository = exports.KugeshTable1 = void 0;
const typeorm_1 = require("typeorm");
let KugeshTable1 = class KugeshTable1 {
};
__decorate([
    typeorm_1.PrimaryColumn()
], KugeshTable1.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable1.prototype, "kugeshProperty1", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable1.prototype, "kugeshProperty2", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable1.prototype, "kugeshProperty3", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable1.prototype, "kugeshProperty4", void 0);
KugeshTable1 = __decorate([
    Controller()
], KugeshTable1);
exports.KugeshTable1 = KugeshTable1;
let KugeshTable1Repository = class KugeshTable1Repository extends typeorm_1.Repository {
};
KugeshTable1Repository = __decorate([
    typeorm_1.EntityRepository(KugeshTable1)
], KugeshTable1Repository);
exports.KugeshTable1Repository = KugeshTable1Repository;
let KugeshTable2 = class KugeshTable2 {
};
__decorate([
    typeorm_1.PrimaryColumn()
], KugeshTable2.prototype, "id", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable2.prototype, "kugeshProperty1", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable2.prototype, "kugeshProperty2", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable2.prototype, "kugeshProperty3", void 0);
__decorate([
    typeorm_1.Column()
], KugeshTable2.prototype, "kugeshProperty4", void 0);
KugeshTable2 = __decorate([
    Controller()
], KugeshTable2);
exports.KugeshTable2 = KugeshTable2;
let KugeshTable2Repository = class KugeshTable2Repository extends typeorm_1.Repository {
};
KugeshTable2Repository = __decorate([
    typeorm_1.EntityRepository(KugeshTable2)
], KugeshTable2Repository);
exports.KugeshTable2Repository = KugeshTable2Repository;
//# sourceMappingURL=kugesh-database.entity.js.map