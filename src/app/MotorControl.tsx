"use server"

import { register } from "./ClientComponents"

//const native = require('/home/alastair/git/motorcontrol/build/Release/native.node')
const native = __non_webpack_require__('../../../build/Release/native.node')

export async function UpdateParam(motorNumber: number, paramName: string | register, paramValue: number | string | boolean): Promise<string> {
    var command
    if (typeof(paramName) === 'string'){
        command = paramName
    }
    else{
        command = (paramName as register).command
    }
    const result = native.setParam(motorNumber, command, paramValue)
    console.log('update: ' + command + ' on Motor: ' + motorNumber + ' to ' + paramValue + ' with result: ' + result)
    return result
}

export async function GetParam(motorNumber: number, paramName: string | register): Promise<number> {
    var command
    if (typeof(paramName) === 'string'){
        command = paramName
    }
    else{
        command = (paramName as register).command
    }
    const result = native.getParam(motorNumber, command)
    console.log('readback: ' + command + ' from Motor: ' + motorNumber + ' with result: ' + result)
    return result
}