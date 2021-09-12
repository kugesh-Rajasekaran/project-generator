"use strict";
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
const testing_1 = require("@nestjs/testing");
const kugesh_table1_kugesh_table2_controller_1 = require("./kugesh-table1,kugesh-table2.controller");
describe('KugeshTable1,kugeshTable2Controller', () => {
    let controller, kugeshTable2Controller;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [kugesh_table1_kugesh_table2_controller_1.KugeshTable1, kugeshTable2Controller],
        }).compile();
        controller = module.get(kugesh_table1_kugesh_table2_controller_1.KugeshTable1, kugeshTable2Controller);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=kugesh-table1,kugesh-table2.controller.spec.js.map