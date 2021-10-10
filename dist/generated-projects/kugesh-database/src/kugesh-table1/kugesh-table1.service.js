"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.KugeshTable1Service = void 0;
const common_1 = require("@nestjs/common");
let KugeshTable1Service = class KugeshTable1Service {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger('KUGESHTABLE1_SERVICE');
    }
    createKugeshTable1(createObj) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log("from createKugeshTable1 method");
            try {
                const dbObj = new KugeshTable1();
                dbObj.kugeshProperty1 = createObj.kugeshProperty1;
                dbObj.kugeshProperty2 = createObj.kugeshProperty2;
                dbObj.kugeshProperty3 = createObj.kugeshProperty3;
                dbObj.kugeshProperty4 = createObj.kugeshProperty4;
                return dbObj.save();
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    readKugeshTable1(readObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.repository.findOne({ id: readObj.id });
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    updateKugeshTable1(updateObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.repository.save(updateObj);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
    deleteKugeshTable1(deleteObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.repository.delete({ id }, deleteObj.id);
            }
            catch (e) {
                this.logger.error(e['message']);
                return e['message'];
            }
        });
    }
};
KugeshTable1Service = __decorate([
    common_1.Injectable()
], KugeshTable1Service);
exports.KugeshTable1Service = KugeshTable1Service;
//# sourceMappingURL=kugesh-table1.service.js.map