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
exports.KugeshTable2Controller = void 0;
const common_1 = require("@nestjs/common");
let KugeshTable2Controller = class KugeshTable2Controller {
    constructor(service) {
        this.service = service;
        this.logger = new common_1.Logger('KUGESHTABLE2_CONTROLLER');
    }
    createKugeshTable2(createData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.createKugeshTable2(createData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    readKugeshTable2(readData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.readKugeshTable2(readData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    deleteKugeshTable2(deleteData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.deleteKugeshTable2(deleteData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    updateKugeshTable2(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.service.createKugeshTable2(updateData);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
};
__decorate([
    common_1.Post('createKugeshTable2'),
    __param(0, common_1.Body())
], KugeshTable2Controller.prototype, "createKugeshTable2", null);
__decorate([
    common_1.Post('readKugeshTable2'),
    __param(0, common_1.Body())
], KugeshTable2Controller.prototype, "readKugeshTable2", null);
__decorate([
    common_1.Post('deleteKugeshTable2'),
    __param(0, common_1.Body())
], KugeshTable2Controller.prototype, "deleteKugeshTable2", null);
__decorate([
    common_1.Post('updateKugeshTable2'),
    __param(0, common_1.Body())
], KugeshTable2Controller.prototype, "updateKugeshTable2", null);
KugeshTable2Controller = __decorate([
    common_1.Controller('KugeshTable2')
], KugeshTable2Controller);
exports.KugeshTable2Controller = KugeshTable2Controller;
//# sourceMappingURL=kugesh-table2.controller.js.map