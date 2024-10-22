export type Register = {
    command: string, 
    readable: boolean, 
    writable: boolean, 
    type: string, 
    min?: number, 
    max?: number, 
    default: number | boolean | Array<number>, 
    valuemap?: Array<string | number | Array<number | string>>,
    normalize: (value: number | boolean) => (number)
}

export type ServerRegister ={
    command: string, 
    readable: boolean, 
    writable: boolean, 
    type: string, 
    min?: number, 
    max?: number, 
    default: number | boolean | Array<number>, 
    valuemap?: Array<string | number | Array<number | string>>,
}

const defaultNormalize = (value: number | boolean) => {
    if (typeof(value) === 'number'){
        return value
    }
    return value ? 1 : 0;
}

export const CP_LOW = { command: 'CP_LOW', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const TSD = { command: 'TSD', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const ISD = { command: 'ISD', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const OV_SPD = { command: 'OV_SPD', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const UD_SPD = { command: 'UD_SPD', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const ST_FAIL = { command: 'ST_FAIL', readable: true, writable: false, type: 'boolean', normalize: defaultNormalize } as Register
export const USERID = { command: 'USERID', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0, normalize: defaultNormalize } as Register
export const NOSTOP = { command: 'NOSTOP', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const STOPDUTY = { command: 'STOPDUTY', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 0, normalize: (value: number) => { return value/256 } } as Register
export const STARTDUTY = { command: 'STARTDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0, normalize: (value: number) => { return (value/512)} } as Register
export const CHANGEDUTY = { command: 'CHANGEDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 120, normalize: (value: number) => { return ((value * 2)/512)} } as Register
export const MAXDUTY = { command: 'MAXDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 255, normalize: (value: number) => { return ((value + 257)/512)} } as Register
export const STARTRPM = { command: 'STARTRPM', readable: true, writable: true, type: 'number', min: 0, max: 4095, default: 857, normalize: defaultNormalize } as Register
export const MAXDUTYHYS = { command: 'MAXDUTYHYS', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 3, normalize: defaultNormalize } as Register
export const SPEEDSLOP = { command: 'SPEEDSLOP', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 815, normalize: (value: number) => { return value * 8.0 } } as Register
export const MAXOPEN = { command: 'MAXOPEN', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const MAXOFF = { command: 'MAXOFF', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const SPEEDSLOP2 = { command: 'SPEEDSLOP2', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 1795, normalize: (value: number) => { return value * 8.0 } } as Register
export const VCP_MASK = { command: 'VCP_MASK', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const OPENLOOP = { command: 'OPENLOOP', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const KIX = { command: 'KIX', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const KI = { command: 'KI', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 40, normalize: defaultNormalize } as Register
export const KPX = { command: 'KPX', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const KP = { command: 'KP', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 30, normalize: defaultNormalize } as Register
export const STBY_MODE = { command: 'STBY_MODE', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const DIR = { command: 'DIR', readable: true, writable: true, type: 'boolean', default: true, normalize: defaultNormalize } as Register
export const POLEPAIR = { command: 'POLEPAIR', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 6, normalize: (value: number) => { return (value + 1) * 2 } } as Register
export const MAXSPEED = { command: 'MAXSPEED', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2, valuemap: [4096, 8192, 16384, 32768], normalize: defaultNormalize } as Register
export const FG_ON = { command: 'FG_ON', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const TSPSEL = { command: 'TSPSEL', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const SPDINV = { command: 'SPDINV', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const LATCH = { command: 'LATCH', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const OCPMASK = { command: 'OCPMASK', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0, valuemap: ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns'], normalize: defaultNormalize } as Register
export const LOCKDIS = { command: 'LOCKDIS', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const DUTYCHGLIMIT = { command: 'DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3, valuemap: [0.17, 0.20, 0.55, 1.11, 1.84, 2.76, 3.69, 5.53], normalize: defaultNormalize } as Register
export const STARTCURRENT = { command: 'STARTCURRENT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, valuemap: [0, 0.3, 0.4, 0.5], normalize: defaultNormalize } as Register
export const OCPDIS = { command: 'OCPDIS', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const SS_ADD_SEL = { command: 'SS_ADD_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: [0, 0.3, 0.4, 0.5], normalize: defaultNormalize } as Register
export const SS_UP_SEL = { command: 'SS_UP_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: [0.01, 0.02, 0.05, 0.10], normalize: defaultNormalize } as Register
export const SS_DUTYCHGLIMIT = { command: 'SS_DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, valuemap: [0.17, 0.20, 0.55, 1.11, 1.84, 2.76, 3.69, 5.53], normalize: defaultNormalize } as Register
export const DUTY_UP_TIME = { command: 'DUTY_UP_TIME', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const RPMLIMIT = { command: 'RPMLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, valuemap: [ undefined, 512, 2200, 3800, 5400, 7000, 8600, 10240], normalize: defaultNormalize } as Register
export const BRK_INV = { command: 'BRK_INV', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const ISD_MASK = { command: 'ISD_MASK', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const RS_SEL = { command: 'RS_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0, valuemap: [undefined, 200000, 100000, 50000], normalize: defaultNormalize } as Register
export const ANTITHROUGH = { command: 'ANTITHROUGH', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const WAIT_TIME = { command: 'WAIT_TIME', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, normalize: defaultNormalize } as Register
export const WAIT_MODE = { command: 'WAIT_MODE', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const WAIT_CON = { command: 'WAIT_CON', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const LOCK_BRK = { command: 'LOCK_BRK', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const ALERTINV = { command: 'ALERTINV', readable: true, writable: true, type: 'boolean', default: true, normalize: defaultNormalize } as Register
export const TSD_MASK = { command: 'TSD_MASK', readable: true, writable: true, type: 'boolean', default: false, normalize: defaultNormalize } as Register
export const TRE = { command: 'TRE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 1, valuemap: [0, 0.5, 1, 1.5, 2, 4, 7, 10], normalize: defaultNormalize } as Register
export const PRE_TIP = { command: 'PRE_TIP', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2, valuemap: [0, 0.2, 0.5, 1], normalize: defaultNormalize } as Register
export const TIP = { command: 'TIP', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3, valuemap: [0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2], normalize: defaultNormalize } as Register
export const LA = { command: 'LA', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 12, valuemap: [
    [   0.0 ,  0.0 ,  0.0 ,  0.0 ,  0.0 ,  0.0 ],
    [   3.75,  3.75,  3.75,  3.75,  3.75,  3.75],
    [   7.5 ,  7.5 ,  7.5 ,  7.5 ,  7.5 ,  7.5 ],
    [  11.25, 11.25, 11.25, 11.25, 11.25, 11.25],
    [  15.0 , 15.0 , 15.0 , 15.0 , 15.0 , 15.0 ],
    [  18.75, 18.75, 18.75, 18.75, 18.75, 18.75],
    [  22.5 , 22.5 , 22.5 , 22.5 , 22.5 , 22.5 ],
    [  26.25, 26.25, 26.25, 26.25, 26.25, 26.25],
    [  30.0 , 30.0 , 30.0 , 30.0 , 30.0 , 30.0 ],
    [   7.5 , 15.0 , 15.0 , 15.0 , 18.75, 22.5 ],
    [   7.5 ,  7.5 , 15.0 , 15.0 , 18.75, 22.5 ],
    [   0.0 ,  3.75,  7.5 , 11.25, 15.0 , 18.75],
    [   3.75,  7.5 , 11.25, 15.0 , 18.75, 22.5 ],
    [   7.5 , 11.25, 15.0 , 18.75, 22.5 , 26.25],
    [  11.25, 15.0 , 18.75, 22.5 , 26.25, 30.0 ],
    [   3.75, 11.25, 18.75, 26.25, 30.0 , 30.0 ]
], normalize: defaultNormalize } as Register
export const FMAX = { command: 'FMAX', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2, valuemap: [750, 1500, 3000, undefined], normalize: defaultNormalize } as Register
export const FST = { command: 'FST', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0, valuemap: [1.6, 3.2, 6.4, 12.8], normalize: defaultNormalize } as Register
export const FPWM = { command: 'FPWM', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 7, valuemap: [
    [ 23400,  23400,  23400,  23400,  23400,  23400],
    [ 46900,  46900,  46900,  46900,  46900,  46900],
    [ 93700,  93700,  93700,  93700,  93700,  93700],
    [187500, 187500, 187500, 187500, 187500, 187500],
    [ 46900,  46900,  93700,  93700,  93700, 187500],
    [ 23400,  46900,  93700,  93700,  93700,  93700],
    [ 23400,  23400,  46900,  46900,  93700,  93700],
    [ 23400,  46900,  93700,  93700, 187500, 187500],
], normalize: defaultNormalize } as Register
export const DEADTIME = { command: 'DEADTIME', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: ['250ns', '500ns', '1000ns', '1500ns'], normalize: defaultNormalize } as Register
export const ISD_LVL = { command: 'ISD_LVL', readable: true, writable: true, type: 'boolean', default: true, normalize: defaultNormalize } as Register
export const OCP_LVL = { command: 'OCP_LVL', readable: true, writable: true, type: 'boolean', default: true, normalize: defaultNormalize } as Register
export const SOURCE = { command: 'SOURCE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0, valuemap: [10, 13.9, 19.3, 26.8, 37.3, 51.8, 72, 100], normalize: defaultNormalize } as Register
export const SINK = { command: 'SINK', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0, valuemap: [20, 27.8, 38.6, 53.7, 74.6, 103.6, 143.9, 200], normalize: defaultNormalize } as Register
export const COMP_HYS = { command: 'COMP_HYS', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: ['none', '100mV', '200mV', '300mV'], normalize: defaultNormalize } as Register
export const SLAVE_ADRS = {readable: true, writable: true, type: 'number', default: [41, 45, 50], normalize: defaultNormalize } as Register
export const SPD = { command: 'SPD', readable: true, writable: true, type: 'number', min: 0, max: 512, default: 0, normalize: (value: number) => { return value / 511 } } as Register
export const HZ_CNT = { command: 'HZ_CNT', readable: true, writable: false, type: 'number', normalize: (value: number) => { return 250000 / Math.max(1, value) } } as Register