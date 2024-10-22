"use server"

import { ServerRegister } from "./ClientComponents"
import { HZ_CNT, MAXSPEED } from "./ClientComponents/Register"


//const native = require('/home/alastair/git/motorcontrol/build/Release/native.node')
const native = __non_webpack_require__('../../../build/Release/native.node')

const simulate = true

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
            const result = Math.random() * 32768
            console.log('simulated readback: ' + paramName + ' from Motor: ' + motorNumber + " with result: " + result)
            return result
        }
        else {
            const result = native.getParam(motorNumber, paramName)
            console.log('readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
            return result
        }
    }
    else{
        const result = native.getParam(motorNumber, paramName)
        console.log('readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
        return result
    }
}