"use server"

const native = __non_webpack_require__('../../../build/Release/native.node')

export async function UpdateParam(motorNumber: number, paramName: string, paramValue: number | string): Promise<string> {
    return native.setParam(motorNumber, paramName, paramValue)
}