"use server"

import { CP_LOW, HZ_CNT, ISD, UD_SPD, OV_SPD, ST_FAIL, TSD } from "./ClientComponents/Register"

//const native = require('/home/alastair/git/motorcontrol/build/Release/native.node')
const native = __non_webpack_require__('../../../build/Release/native.node')

const simulate = true

export type updateValues = {
    HZ_CNT: number,
    CP_LOW: boolean,
    TSD: boolean,
    ISD: boolean,
    OV_SPD: boolean,
    UD_SPD: boolean,
    ST_FAIL: boolean
}

export async function getData(motorNumber: number): Promise<updateValues>{
    return {
        HZ_CNT: await GetParam(motorNumber, HZ_CNT.command),
        CP_LOW: (await GetParam(motorNumber, CP_LOW.command)) === 1,
        TSD: (await GetParam(motorNumber, TSD.command)) === 1,
        ISD: (await GetParam(motorNumber, ISD.command)) === 1,
        OV_SPD: (await GetParam(motorNumber, OV_SPD.command)) === 1,
        UD_SPD: (await GetParam(motorNumber, UD_SPD.command)) === 1,
        ST_FAIL: (await GetParam(motorNumber, ST_FAIL.command)) === 1
    } as updateValues
}

export async function UpdateParam(motorNumber: number, paramName: string, paramValue: number | string | boolean): Promise<string> {
    if (simulate){
        console.log('simulated update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue)
        return 'simulated update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue
    }
    else{
        const result = native.setParam(motorNumber, paramName, paramValue)
        console.log('update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue + ' with result: ' + result)
        return result
    }

}

export async function GetParam(motorNumber: number, paramName: string): Promise<number> {
    if (simulate){
        if (paramName === HZ_CNT.command){
            const result = 10001-((new Date().getTime()) % 10000)
            console.log('simulated readback: ' + paramName + ' from Motor: ' + motorNumber + " with result: " + result)
            return result
        }
        else {
            const result = native.getParam(motorNumber, paramName)
            console.log('simulated readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
            return result
        }
    }
    else{
        const result = native.getParam(motorNumber, paramName)
        console.log('readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
        return result
    }
}