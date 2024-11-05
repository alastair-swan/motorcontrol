"use server"

import { CP_LOW, HZ_CNT, ISD, UD_SPD, OV_SPD, ST_FAIL, TSD } from "./ClientComponents/Register"
import { MotorParams } from "./MotorControlClient"
import fs from 'fs';

//const native = require('/home/alastair/git/motorcontrol/build/Release/native.node')
const native = __non_webpack_require__('../../../build/Release/native.node')
//const fs = require('fs');

export async function saveMotorTune(motorState: MotorParams, motorNumber: number){
    const motorSave = {
        motorNumber: motorNumber,
        motorState: {...motorState, SPD: 0}
    }
    const jsonMotorSave = JSON.stringify(motorSave, null, 2);
    fs.writeFile(process.cwd() + '/src/MotorI2C/motorTunes/motor' + motorNumber + 'tune.json', jsonMotorSave, {encoding: 'utf8', flag: 'w'}, (err) => {console.log(err)})
}

export async function loadMotorTune(motorNumber: number): Promise<MotorParams> {
    const loadedMotorStateData = fs.readFileSync (process.cwd() + '/src/MotorI2C/motorTunes/motor' + motorNumber + 'tune.json', {encoding:'utf-8'});
    const loadedMotorState = JSON.parse(loadedMotorStateData) as { motorNumber: number, motorState: MotorParams}
    return loadedMotorState.motorState
}

export async function loadMotorDefault(): Promise<MotorParams> {
    const loadedMotorStateData = fs.readFileSync (process.cwd() + '/src/MotorI2C/motorTunes/motordefault.json', {encoding:'utf-8'});
    const loadedMotorState = JSON.parse(loadedMotorStateData) as { motorNumber: number, motorState: MotorParams}
    return loadedMotorState.motorState
}

export type updateValues = {
    simulated: boolean,
    hz_cnt: number,
    CP_LOW: number,
    TSD: number,
    ISD: number,
    OV_SPD: number,
    UD_SPD: number,
    ST_FAIL: number
}

export async function getData(motorNumber: number, simulated = false): Promise<updateValues>{
    return {
        simulated: simulated,
        hz_cnt: await GetParam(motorNumber, HZ_CNT.command, simulated),
        CP_LOW: (await GetParam(motorNumber, CP_LOW.command, simulated)),
        TSD: (await GetParam(motorNumber, TSD.command, simulated)),
        ISD: (await GetParam(motorNumber, ISD.command, simulated)),
        OV_SPD: (await GetParam(motorNumber, OV_SPD.command, simulated)),
        UD_SPD: (await GetParam(motorNumber, UD_SPD.command, simulated)),
        ST_FAIL: (await GetParam(motorNumber, ST_FAIL.command, simulated))
    } as updateValues
}

export async function UpdateParam(motorNumber: number, paramName: string, paramValue: number | string | boolean, simulated = false): Promise<string> {
    if (simulated){
        console.log('simulated update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue)
        return 'simulated update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue
    }
    else{
        const result = native.setParam(motorNumber, paramName, paramValue)
        console.log('update: ' + paramName + ' on Motor: ' + motorNumber + ' to ' + paramValue + ' with result: ' + result)
        return result
    }

}

export async function GetParam(motorNumber: number, paramName: string, simulated = false): Promise<number> {
    if (simulated){
        if (paramName === HZ_CNT.command){
            const result = 10001-((new Date().getTime()) % 10000)
            //console.log('simulated readback: ' + paramName + ' from Motor: ' + motorNumber + " with result: " + result)
            return result
        }
        else if (paramName === CP_LOW.command){
            return 0
        }
        else if (paramName === TSD.command){
            return 0
        }
        else if (paramName === ISD.command){
            return 0
        }
        else if (paramName === OV_SPD.command){
            return 0
        }
        else if (paramName === UD_SPD.command){
            return 0
        }
        else if (paramName === ST_FAIL.command){
            return 0
        }
        else if (paramName === HZ_CNT.command){
            return 0
        }
        else {
            const result = native.getParam(motorNumber, paramName)
            console.log('no simulate set for ' + paramName + ' readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
            return result
        }
    }
    else{
        const result = native.getParam(motorNumber, paramName)
        console.log('readback: ' + paramName + ' from Motor: ' + motorNumber + ' with result: ' + result)
        return result
    }
}