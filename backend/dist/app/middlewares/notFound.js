"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_ts_1 = require("http-status-ts");
const notFound = (req, res, next) => {
    return res.status(http_status_ts_1.HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'API Not Found !!',
        error: '',
    });
};
exports.default = notFound;
