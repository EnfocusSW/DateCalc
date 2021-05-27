"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
async function jobArrived(s, flowElement, job) {
    //async function jobArrived(s, flowElement, job) {
    let startDate = await (await flowElement.getPropertyStringValue("Date")).toString();
    let delta = parseInt(await (await flowElement.getPropertyStringValue("Delta")).toString());
    let endDate = dayjs_1.default(startDate).add(delta, 'day').format('YYYY-MM-DD');
    await job.log(LogLevel.Info, "Setting private data newdate to " + endDate);
    await job.setPrivateData("newdate", endDate);
    job.sendToSingle();
}
async function validateProperties(s, flowElement, tags) {
    let retValues = [];
    let tag, value;
    for (let i = 0; i < tags.length; i++) {
        tag = tags[i];
        value = await (await flowElement.getPropertyStringValue(tag)).toString();
        if (tag == "Date") {
            let re = /^\d{4}\-\d{2}\-\d{2}$/;
            if (value.match(re) == null) {
                await flowElement.log(LogLevel.Error, "The value %1 is invalid for property %2, format should be YYYY-MM-DD", [value, tag]);
                retValues.push({ tag: tag, valid: false });
            }
            else {
                await flowElement.log(LogLevel.Info, "The value %1 is valid for property %2", [value, tag]);
                retValues.push({ tag: tag, valid: true });
            }
        }
    }
    return retValues;
}
//# sourceMappingURL=main.js.map