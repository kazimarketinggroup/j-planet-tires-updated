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
exports.Url = void 0;
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required'],
    },
    originalUrl: {
        type: String,
        required: [true, 'Original URL is required'],
        trim: true,
    },
    shortCode: {
        type: String,
        required: [true, 'Short code is required'],
        unique: true,
        index: true,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// ✅ Static: check short code exists
urlSchema.statics.isShortCodeExist = function (shortCode) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ shortCode });
    });
};
exports.Url = (0, mongoose_1.model)('Url', urlSchema);
