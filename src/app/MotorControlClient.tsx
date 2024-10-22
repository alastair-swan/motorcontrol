"use client"

import { Register } from "./ClientComponents"
import { CP_LOW, HZ_CNT, ISD, UD_SPD, OV_SPD, ST_FAIL, TSD } from "./ClientComponents/Register"
import * as Server from './MotorControl'
export type MotorParams = {
    CP_LOW: boolean,
    TSD: boolean,
    ISD: boolean,
    OV_SPD: boolean,
    UD_SPD: boolean,
    ST_FAIL: boolean,
    USERID: number,
    NOSTOP: boolean,
    STOPDUTY: number,
    STARTDUTY: number,
    CHANGEDUTY: number,
    MAXDUTY: number,
    STARTRPM: number,
    MAXDUTYHYS: number,
    SPEEDSLOP: number,
    MAXOPEN: boolean,
    MAXOFF: boolean,
    SPEEDSLOP2: number,
    VCP_MASK: boolean,
    OPENLOOP: boolean,
    KIX: boolean,
    KI: number,
    KPX: boolean,
    KP: number,
    STBY_MODE: boolean,
    DIR: boolean,
    POLEPAIR: number,
    MAXSPEED: number,
    FG_ON: boolean,
    TSPSEL: boolean,
    SPDINV: boolean,
    LATCH: boolean,
    OCPMASK: number,
    LOCKDIS: boolean,
    DUTYCHGLIMIT: number,
    STARTCURRENT: number,
    OCPDIS: boolean,
    SS_ADD_SEL: number,
    SS_UP_SEL: number,
    SS_DUTYCHGLIMIT: number,
    DUTY_UP_TIME: boolean,
    RPMLIMIT: number,
    BRK_INV: boolean,
    ISD_MASK: boolean,
    RS_SEL: number,
    ANTITHROUGH: boolean,
    WAIT_TIME: number,
    WAIT_MODE: boolean,
    WAIT_CON: boolean,
    LOCK_BRK: boolean,
    ALERTINV: boolean,
    TSD_MASK: boolean,
    TRE: number,
    PRE_TIP: number,
    TIP: number,
    LA: number,
    FMAX: number,
    FST: number,
    FPWM: number,
    DEADTIME: number,
    ISD_LVL: boolean,
    OCP_LVL: boolean,
    SOURCE: number,
    SINK: number,
    COMP_HYS: number,
    SLAVE_ADRS: number,
    SPD: number,
    hz_cnt: number
}

export function UpdateParam(motorNumber: number, paramName: string | Register, paramValue: number | string | boolean): Promise<string> {
    var command
    if (typeof(paramName) === 'string'){
        command = paramName
    }
    else{
        command = paramName.command
    }
    const result = Server.UpdateParam(motorNumber, command, paramValue)
    console.log('update: ' + command + ' on Motor: ' + motorNumber + ' to ' + paramValue + ' with result: ' + result)
    return result
}

export function GetParam(motorNumber: number, paramName: string | Register): Promise<number> {
    var command
    if (typeof(paramName) === 'string'){
        command = paramName
    }
    else{
        command = paramName.command
    }
    const result = Server.GetParam(motorNumber, command)
    console.log('readback: ' + command + ' from Motor: ' + motorNumber + ' with result: ' + result)
    return result
}