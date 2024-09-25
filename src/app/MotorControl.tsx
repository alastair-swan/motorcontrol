"use server"

const native = __non_webpack_require__('../../../build/Release/native.node')

export const registerList = {
    CP_LOW: { command: 'CP_LOW', readable: true, writable: false, type: 'boolean'},
    TSD: { command: 'TSD', readable: true, writable: false, type: 'boolean'},
    ISD: { command: 'ISD', readable: true, writable: false, type: 'boolean'},
    OV_SPD: { command: 'OV_SPD', readable: true, writable: false, type: 'boolean'},
    OU_SPD: { command: 'OU_SPD', readable: true, writable: false, type: 'boolean'},
    ST_FAIL: { command: 'ST_FAIL', readable: true, writable: false, type: 'boolean'},
    USERID: { command: 'USERID', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0},
    NOSTOP: { command: 'NOSTOP', readable: true, writable: true, type: 'boolean', default: false},
    STOPDUTY: { command: 'STOPDUTY', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 0},
    STARTDUTY: { command: 'STARTDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0},
    CHANGEDUTY: { command: 'CHANGEDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 120},
    MAXDUTY: { command: 'MAXDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 255},
    STARTRPM: { command: 'STARTRPM', readable: true, writable: true, type: 'number', min: 0, max: 4095, default: 857},
    MAXDUTYHYS: { command: 'MAXDUTYHYS', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 3},
    SPEEDSLOP: { command: 'SPEEDSLOP', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 815},
    MAXOPEN: { command: 'MAXOPEN', readable: true, writable: true, type: 'boolean', default: false},
    MAXOFF: { command: 'MAXOFF', readable: true, writable: true, type: 'boolean', default: false},
    SPEEDSLOP2: { command: 'SPEEDSLOP2', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 1795},
    VCP_MASK: { command: 'VCP_MASK', readable: true, writable: true, type: 'boolean', default: false},
    OPENLOOP: { command: 'OPENLOOP', readable: true, writable: true, type: 'boolean', default: false},
    KIX: { command: 'KIX', readable: true, writable: true, type: 'boolean', default: false},
    KI: { command: 'KI', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 40},
    KPX: { command: 'KPX', readable: true, writable: true, type: 'boolean', default: false},
    KP: { command: 'KP', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 30},
    STBY_MODE: { command: 'STBY_MODE', readable: true, writable: true, type: 'boolean', default: false},
    DIR: { command: 'DIR', readable: true, writable: true, type: 'boolean', default: true},
    POLEPAIR: { command: 'POLEPAIR', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 6},
    MAXSPEED: { command: 'MAXSPEED', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0},
    FG_ON: { command: 'FG_ON', readable: true, writable: true, type: 'boolean', default: false},
    TSPSEL: { command: 'TSPSEL', readable: true, writable: true, type: 'boolean', default: false},
    SPDINV: { command: 'SPDINV', readable: true, writable: true, type: 'boolean', default: false},
    LATCH: { command: 'LATCH', readable: true, writable: true, type: 'boolean', default: false},
    OCPMASK: { command: 'OCPMASK', readable: true, writable: true, type: 'boolean', default: false},
    LOCKDIS: { command: 'LOCKDIS', readable: true, writable: true, type: 'boolean', default: false},
    DUTYCHGLIMIT: { command: 'DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3},
    STARTCURRENT: { command: 'STARTCURRENT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2},
    OCPDIS: { command: 'OCPDIS', readable: true, writable: true, type: 'boolean', default: false},
    SS_ADD_SEL: { command: 'SS_ADD_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1},
    SS_UP_SEL: { command: 'SS_UP_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1},
    SS_DUTYCHGLIMIT: { command: 'SS_DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2},
    DUTY_UP_TIME: { command: 'DUTY_UP_TIME', readable: true, writable: true, type: 'boolean', default: false},
    RPMLIMIT: { command: 'RPMLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2},
    BRK_INV: { command: 'BRK_INV', readable: true, writable: true, type: 'boolean', default: false},
    ISD_MASK: { command: 'ISD_MASK', readable: true, writable: true, type: 'boolean', default: false},
    RS_SEL: { command: 'RS_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0},
    ANTITHROUGH: { command: 'ANTITHROUGH', readable: true, writable: true, type: 'boolean', default: false},
    WAIT_TIME: { command: 'WAIT_TIME', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2},
    WAIT_MODE: { command: 'WAIT_MODE', readable: true, writable: true, type: 'boolean', default: false},
    WAIT_CON: { command: 'WAIT_CON', readable: true, writable: true, type: 'boolean', default: false},
    LOCK_BRK: { command: 'LOCK_BRK', readable: true, writable: true, type: 'boolean', default: false},
    ALERTINV: { command: 'ALERTINV', readable: true, writable: true, type: 'boolean', default: true},
    TSD_MASK: { command: 'TSD_MASK', readable: true, writable: true, type: 'boolean', default: false},
    TRE: { command: 'TRE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 1},
    PRE_TIP: { command: 'PRE_TIP', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2},
    TIP: { command: 'TIP', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3},
    LA: { command: 'LA', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 12},
    FMAX: { command: 'FMAX', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2},
    FST: { command: 'FST', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0},
    FPWM: { command: 'FPWM', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 7},
    DEADTIME: { command: 'DEADTIME', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1},
    ISD_LVL: { command: 'ISD_LVL', readable: true, writable: true, type: 'boolean', default: true},
    OCP_LVL: { command: 'OCP_LVL', readable: true, writable: true, type: 'boolean', default: true},
    SOURCE: { command: 'SOURCE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0},
    SINK: { command: 'SINK', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0},
    COMP_HYS: { command: 'COMP_HYS', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1},
    SPD: { command: 'SPD', readable: true, writable: true, type: 'number', min: 0, max: 512, default: 0},
    HZ_CNT: { command: 'HZ_CNT', readable: true, writable: false, type: 'number'}
}

export async function UpdateParam(motorNumber: number, paramName: string, paramValue: number | string | boolean): Promise<string> {
    const result = native.setParam(motorNumber, paramName, paramValue)
    console.log('update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue + ' with result: ' + result)
    return result
}

export async function GetParam(motorNumber: number, paramName: string): Promise<number> {
    const result = native.getParam(motorNumber, paramName)
    console.log('readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
    return result
}