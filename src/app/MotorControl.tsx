"use server"

const native = __non_webpack_require__('../../../build/Release/native.node')

export async function UpdateParam(motorNumber: number, paramName: string, paramValue: number | string | boolean): Promise<string> {
    return native.setParam(motorNumber, paramName, paramValue)
}

export async function GetParam(motorNumber: number, paramName: string): Promise<number> {
    return native.getParam(motorNumber, paramName)
}