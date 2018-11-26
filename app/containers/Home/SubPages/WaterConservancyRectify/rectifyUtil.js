// 需要渲染的按钮
const optCach = {};
export function getOperationBtns(role, status) {
    if (optCach[role+"-"+status]) {
        return optCach[role+"-"+status];
    }
    let report = {key: "report", name: "汇报"};
    let inRectify = {key: "inRectify", name: "内部整改"};
    let review = {key: "review", name: "复核"};
    let rectify = {key: "rectify", name: "整改"};
    let confirm = {key: "confirm", name: "确认"};
    let startRectify = {key: "startRectify", name: "开始整改"};
    // let resultFeedback = {key: "resultFeedback", name: "结果反馈"};
    let submitRectify = {key: "submitRectify", name: "提交整改"};
    let inSubmitRectify = {key: "inSubmitRectify", name: "内部提交整改"};
    let sureRectify = {key: "sureRectify", name: "确认整改"};
    let finishRectify = {key: "finishRectify", name: "完成整改"};
    let inFinishRectify = {key: "inFinishRectify", name: "内部完成整改"};
    let cancel = {key: "cancel", name: "撤销"};
    let reject = {key: "reject", name: "驳回"};
    let inReject = {key: "inReject", name: "内部驳回"};

    let options = null;
    switch (role * 1) {
        case 6200: options = [report, inRectify, review, rectify, startRectify, submitRectify,inSubmitRectify, sureRectify, finishRectify, inFinishRectify, reject,inReject, cancel]; break; // 超级管理员
        case 6201: options = [rectify, cancel, finishRectify, reject]; break;// 管理员
        case 6202: options = [review, cancel, sureRectify, reject]; break; // 监理员
        case 6203: options = [startRectify, inSubmitRectify, submitRectify]; break; // 巡查员
        case 6204: options = [report, inRectify, cancel, startRectify, submitRectify, inSubmitRectify, finishRectify,inFinishRectify, rectify, inReject]; break; // 站长
        case 6205: options = [startRectify, submitRectify]; break; // 养护人员
        default: options = [report, review, rectify, startRectify, submitRectify, sureRectify, finishRectify, reject, cancel];
    }
    let stateOpts = null;
    switch (status *1) {
        case 3001: stateOpts = [report, inRectify, cancel]; break; // 待站长处理
        case 3002: stateOpts = [review, cancel]; break;// 待监理复核
        case 3003: stateOpts = [rectify, cancel]; break; // 待整改
        case 3004: stateOpts = [startRectify]; break; // 整改下发
        case 3005: stateOpts = [submitRectify]; break; // 整改中
        case 3006: stateOpts = [sureRectify, reject]; break; // 提交整改
        case 3007: stateOpts = [finishRectify, reject]; break; // 问题确认
        case 3008: stateOpts = []; break; // 整改完成
        case 3009: stateOpts = []; break; // 已撤销
        case 3010: stateOpts = [submitRectify]; break; // 整改驳回
        case 3015: stateOpts = [inSubmitRectify]; break; // 内部整改中
        case 3016: stateOpts = [inFinishRectify, inReject]; break; // 内部整改提交
        default: stateOpts = [];
    }
    let otps = stateOpts.filter((item) => {
        let flag = false;
        for (var i = 0; i < options.length; i++) {
            let roleOpt = options[i];
            if (item === roleOpt) {
                flag = true;
                break;
            }
        }
        return flag;
    });
    optCach[role+"-"+status] = otps;
    return otps;
}