"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = exports.useLocalStorage = exports.sortProgram = exports.EscolaLMSContext = exports.SCORMPlayer = exports.EscolaLMSContextProvider = exports.Image = void 0;
var Image_1 = require("./components/Image");
Object.defineProperty(exports, "Image", { enumerable: true, get: function () { return __importDefault(Image_1).default; } });
var API = __importStar(require("./types/api"));
exports.API = API;
var index_1 = require("./context/index");
Object.defineProperty(exports, "EscolaLMSContextProvider", { enumerable: true, get: function () { return index_1.EscolaLMSContextProvider; } });
Object.defineProperty(exports, "SCORMPlayer", { enumerable: true, get: function () { return index_1.SCORMPlayer; } });
Object.defineProperty(exports, "EscolaLMSContext", { enumerable: true, get: function () { return index_1.EscolaLMSContext; } });
Object.defineProperty(exports, "sortProgram", { enumerable: true, get: function () { return index_1.sortProgram; } });
var useLocalStorage_1 = require("./hooks/useLocalStorage");
Object.defineProperty(exports, "useLocalStorage", { enumerable: true, get: function () { return useLocalStorage_1.useLocalStorage; } });
