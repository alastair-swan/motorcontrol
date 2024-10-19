"use server"

const native = require('/build/Release/native.node')

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