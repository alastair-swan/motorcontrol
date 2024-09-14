"use server"

export async function UpdateParam(paramName: string, paramValue: number | string): Promise<string> {
    switch (paramName){
        case 'NOSTOP':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'nostop enabled'
                }
                if (paramValue === 'off'){
                    return 'nostop disabled'
                }
            }
            return 'invalid param value for param: NOSTOP'
        case 'STOPDUTY':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'STOPDUTY set'
            }
            return 'invalid param value for param: STOPDUTY'
        case 'STARTDUTY':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'STARTDUTY set'
            }
            return 'invalid param value for param: STARTDUTY'
        case 'CHANGEDUTY':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'CHANGEDUTY set'
            }
            return 'invalid param value for param: CHANGEDUTY'
        case 'MAXDUTY':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'MAXDUTY set'
            }
            return 'invalid param value for param: MAXDUTY'
        case 'STARTRPM':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'STARTRPM set'
            }
            return 'invalid param value for param: STARTRPM'
        case 'MAXDUTYHYS':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'MAXDUTYHYS set'
            }
            return 'invalid param value for param: MAXDUTYHYS'
        case 'SPEEDSLOP':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SPEEDSLOP set'
            }
            return 'invalid param value for param: SPEEDSLOP'
        case 'MAXOPEN':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'MAXOPEN enabled'
                }
                if (paramValue === 'off'){
                    return 'MAXOPEN disabled'
                }
            }
            return 'invalid param value for param: MAXOPEN'
        case 'MAXOFF':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'MAXOFF enabled'
                }
                if (paramValue === 'off'){
                    return 'MAXOFF disabled'
                }
            }
            return 'invalid param value for param: MAXOFF'
        case 'SPEEDSLOP2':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SPEEDSLOP2 set'
            }
            return 'invalid param value for param: SPEEDSLOP2'
        case 'VCP_MASK':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'VCP_MASK enabled'
                }
                if (paramValue === 'off'){
                    return 'VCP_MASK disabled'
                }
            }
            return 'invalid param value for param: VCP_MASK'
        case 'OPENLOOP':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'OPENLOOP enabled'
                }
                if (paramValue === 'off'){
                    return 'OPENLOOP disabled'
                }
            }
        case 'KIX':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'KIX enabled'
                }
                if (paramValue === 'off'){
                    return 'KIX disabled'
                }
            }
            return 'invalid param value for param: KIX'
        case 'KI':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'KI set'
            }
            return 'invalid param value for param: KI'
        case 'KPX':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'KPX enabled'
                }
                if (paramValue === 'off'){
                    return 'KPX disabled'
                }
            }
            return 'invalid param value for param: KPX'
        case 'KP':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'KP set'
            }
            return 'invalid param value for param: KP'
            case 'STARTRPM':
                if (typeof paramValue === 'number'){
                    console.log(paramValue)
                    return 'STARTRPM set'
                }
                return 'invalid param value for param: STARTRPM'
        case 'KIX':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'KIX enabled'
                }
                if (paramValue === 'off'){
                    return 'KIX disabled'
                }
            }
            return 'invalid param value for param: KIX'
        case 'KI':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'KI set'
            }
            return 'invalid param value for param: KI'
        case 'STBY_MODE':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'STBY_MODE enabled'
                }
                if (paramValue === 'off'){
                    return 'STBY_MODE disabled'
                }
            }
            return 'invalid param value for param: STBY_MODE'
        case 'DIR':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'cw'){
                    return 'CW Rotation'
                }
                if (paramValue === 'ccw'){
                    return 'CCW Rotation'
                }
            }
            return 'invalid param value for param: DIR'
        case 'POLEPAIR':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'POLEPAIR set'
            }
            return 'invalid param value for param: POLEPAIR'
        case 'MAXSPEED':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'MAXSPEED set'
            }
            return 'invalid param value for param: MAXSPEED'
        case 'FG_ON':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'FG_ON enabled'
                }
                if (paramValue === 'off'){
                    return 'FG_ON disabled'
                }
            }
            return 'invalid param value for param: FG_ON'
        case 'FGSEL':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'FGSEL set'
            }
            return 'invalid param value for param: FGSEL'
        case 'TSPSEL':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'analog'){
                    return 'analog control enabled'
                }
                if (paramValue === 'pwm'){
                    return 'PWM control disabled'
                }
            }
            return 'invalid param value for param: TSPSEL'
        case 'SPDINV':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'positive'){
                    return 'positive SPD polarity'
                }
                if (paramValue === 'negative'){
                    return 'negative SPD polarity'
                }
            }
            return 'invalid param value for param: SPDINV'
        case 'LATCH':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'LATCH enabled'
                }
                if (paramValue === 'off'){
                    return 'LATCH disabled'
                }
            }
            return 'invalid param value for param: LATCH'
        case 'OCPMASK':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'OCPMASK set'
            }
            return 'invalid param value for param: OCPMASK'
        case 'LOCKDIS':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'LOCKDIS enabled'
                }
                if (paramValue === 'off'){
                    return 'LOCKDIS disabled'
                }
            }
            return 'invalid param value for param: LOCKDIS'
        case 'DUTYCHGLIMIT':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'DUTYCHGLIMIT set'
            }
            return 'invalid param value for param: DUTYCHGLIMIT'
        case 'STARTCURRENT':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'STARTCURRENT set'
            }
            return 'invalid param value for param: STARTCURRENT'
        case 'OCPDIS':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'OCPDIS enabled'
                }
                if (paramValue === 'off'){
                    return 'OCPDIS disabled'
                }
            }
            return 'invalid param value for param: OCPDIS'
        case 'SS_ADD_SEL':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SS_ADD_SEL set'
            }
            return 'invalid param value for param: SS_ADD_SEL'
        case 'SS_UP_SEL':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SS_UP_SEL set'
            }
            return 'invalid param value for param: SS_UP_SEL'
        case 'SS_DUTYCHGLIMIT':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SS_DUTYCHGLIMIT set'
            }
            return 'invalid param value for param: SS_DUTYCHGLIMIT'
        case 'DUTY_UP_TIME':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === '2.7'){
                    return 'DUTY_UP_TIME 2.7ms'
                }
                if (paramValue === '10.8'){
                    return 'DUTY_UP_TIME 10.8ms'
                }
            }
            return 'invalid param value for param: DUTY_UP_TIME'
        case 'RPMLIMIT':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'RPMLIMIT set'
            }
            return 'invalid param value for param: RPMLIMIT'
        case 'BRK_INV':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'BRK_INV enabled'
                }
                if (paramValue === 'off'){
                    return 'BRK_INV disabled'
                }
            }
            return 'invalid param value for param: BRK_INV'
        case 'ISD_MASK':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'ISD_MASK enabled'
                }
                if (paramValue === 'off'){
                    return 'ISD_MASK disabled'
                }
            }
            return 'invalid param value for param: ISD_MASK'
        case 'RS_SEL':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'RS_SEL set'
            }
            return 'invalid param value for param: RS_SEL'
        case 'ANTITHROUGH':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'ANTITHROUGH enabled'
                }
                if (paramValue === 'off'){
                    return 'ANTITHROUGH disabled'
                }
            }
            return 'invalid param value for param: ANTITHROUGH'
        case 'WAIT_TIME':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'WAIT_TIME set'
            }
            return 'invalid param value for param: WAIT_TIME'
        case 'WAIT_MODE':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'short'){
                    return 'WAIT_MODE shorting'
                }
                if (paramValue === 'off'){
                    return 'WAIT_MODE HI-Z'
                }
            }
            return 'invalid param value for param: WAIT_MODE'
        case 'WAIT_CON':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'idle'){
                    return 'WAIT_CON idle'
                }
                if (paramValue === 'skip'){
                    return 'WAIT_CON skip idle'
                }
            }
            return 'invalid param value for param: WAIT_CON'
        case 'LOCK_BRK':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'short'){
                    return 'LOCK_BRK shorting'
                }
                if (paramValue === 'off'){
                    return 'LOCK_BRK HI-Z'
                }
            }
            return 'invalid param value for param: LOCK_BRK'
        case 'ALERTINV':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'ALERTINV inverted'
                }
                if (paramValue === 'off'){
                    return 'ALERTINV normal'
                }
            }
            return 'invalid param value for param: ALERTINV'
        case 'TSD_MASK':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === 'on'){
                    return 'TSD_MASK enabled'
                }
                if (paramValue === 'off'){
                    return 'TSD_MASK disabled'
                }
            }
            return 'invalid param value for param: ALERTINV'
        case 'TRE':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'TRE set'
            }
            return 'invalid param value for param: TRE'
        case 'PreTIP':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'PreTIP set'
            }
            return 'invalid param value for param: PreTIP'
        case 'TIP':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'TIP set'
            }
            return 'invalid param value for param: TIP'
        case 'LA':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'LA set'
            }
            return 'invalid param value for param: LA'
        case 'FMAX':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'FMAX set'
            }
            return 'invalid param value for param: FMAX'
        case 'FST':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'FST set'
            }
            return 'invalid param value for param: FST'
        case 'FPWM':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'FPWM set'
            }
            return 'invalid param value for param: FPWM'
        case 'DEADTIME':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'DEADTIME set'
            }
            return 'invalid param value for param: DEADTIME'
        case 'ISD_LVL':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === '0.5V'){
                    return 'ISD_LVL 0.5V'
                }
                if (paramValue === '1.0V'){
                    return 'ISD_LVL 1.0V'
                }
            }
            return 'invalid param value for param: ISD_LVL'
        case 'OCP_LVL':
            if (typeof paramValue === 'string'){
                console.log(paramValue)
                if (paramValue === '10x'){
                    return 'OCP_LVL 10x'
                }
                if (paramValue === '20x'){
                    return 'OCP_LVL 20x'
                }
            }
            return 'invalid param value for param: OCP_LVL'
        case 'SOURCE':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SOURCE set'
            }
            return 'invalid param value for param: SOURCE'
        case 'SINK':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'SINK set'
            }
            return 'invalid param value for param: SINK'
        case 'COMP_HYS':
            if (typeof paramValue === 'number'){
                console.log(paramValue)
                return 'COMP_HYS set'
            }
            return 'invalid param value for param: COMP_HYS'
        case 'SPD':
            if (!(typeof paramValue === 'number')){
                return 'invalid param value for param: speed'
            }
            console.log(paramValue)
            return 'speed set successfully'
        default:
            return 'invalid param'
    }
}