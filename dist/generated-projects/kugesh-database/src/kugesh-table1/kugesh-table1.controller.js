"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KugeshTable1Controller = void 0;
const common_1 = require("@nestjs/common");
let KugeshTable1Controller = class KugeshTable1Controller {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger('KUGESHTABLE1_CONTROLLER');
    }
    createKugeshTable1(createData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.createKugeshTable1(createData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    readKugeshTable1(readData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.readKugeshTable1(readData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    deleteKugeshTable1(deleteData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.deleteKugeshTable1(deleteData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    updateKugeshTable1(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.createKugeshTable1(updateData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
};
__decorate([
    common_1.Post('createKugeshTable1'),
    __param(0, common_1.Body())
], KugeshTable1Controller.prototype, "createKugeshTable1", null);
__decorate([
    common_1.Post('readKugeshTable1'),
    __param(0, common_1.Body())
], KugeshTable1Controller.prototype, "readKugeshTable1", null);
__decorate([
    common_1.Post('deleteKugeshTable1'),
    __param(0, common_1.Body())
], KugeshTable1Controller.prototype, "deleteKugeshTable1", null);
__decorate([
    common_1.Post('updateKugeshTable1'),
    __param(0, common_1.Body())
], KugeshTable1Controller.prototype, "updateKugeshTable1", null);
KugeshTable1Controller = __decorate([
    common_1.Controller('KugeshTable1')
], KugeshTable1Controller);
exports.KugeshTable1Controller = KugeshTable1Controller;
//# sourceMappingURL=kugesh-table1.controller.js.map