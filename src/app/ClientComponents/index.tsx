"use client"

import { MotorParams } from '../MotorControlClient'

export type componentProps = { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void, frameStyle?: {}}
export type switchComponentProps = componentProps
export type sliderComponentProps = componentProps
export type register = {
    command: string, 
    readable: boolean, 
    writable: boolean, 
    type: string, 
    min?: number, 
    max?: number, 
    default: number | boolean | Array<number>, 
    valuemap?: Array<string | number>,
    scale?: (value: number) => number,
}

export const RegisterList = {
    CP_LOW: { command: 'CP_LOW', readable: true, writable: false, type: 'boolean'} as register,
    TSD: { command: 'TSD', readable: true, writable: false, type: 'boolean'} as register,
    ISD: { command: 'ISD', readable: true, writable: false, type: 'boolean'} as register,
    OV_SPD: { command: 'OV_SPD', readable: true, writable: false, type: 'boolean'} as register,
    OU_SPD: { command: 'OU_SPD', readable: true, writable: false, type: 'boolean'} as register,
    ST_FAIL: { command: 'ST_FAIL', readable: true, writable: false, type: 'boolean'} as register,
    USERID: { command: 'USERID', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0} as register,
    NOSTOP: { command: 'NOSTOP', readable: true, writable: true, type: 'boolean', default: false} as register,
    STOPDUTY: { command: 'STOPDUTY', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 0} as register,
    STARTDUTY: { command: 'STARTDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 0} as register,
    CHANGEDUTY: { command: 'CHANGEDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 120} as register,
    MAXDUTY: { command: 'MAXDUTY', readable: true, writable: true, type: 'number', min: 0, max: 255, default: 255} as register,
    STARTRPM: { command: 'STARTRPM', readable: true, writable: true, type: 'number', min: 0, max: 4095, default: 857} as register,
    MAXDUTYHYS: { command: 'MAXDUTYHYS', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 3} as register,
    SPEEDSLOP: { command: 'SPEEDSLOP', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 815} as register,
    MAXOPEN: { command: 'MAXOPEN', readable: true, writable: true, type: 'boolean', default: false} as register,
    MAXOFF: { command: 'MAXOFF', readable: true, writable: true, type: 'boolean', default: false} as register,
    SPEEDSLOP2: { command: 'SPEEDSLOP2', readable: true, writable: true, type: 'number', min: 0, max: 16383, default: 1795} as register,
    VCP_MASK: { command: 'VCP_MASK', readable: true, writable: true, type: 'boolean', default: false} as register,
    OPENLOOP: { command: 'OPENLOOP', readable: true, writable: true, type: 'boolean', default: false} as register,
    KIX: { command: 'KIX', readable: true, writable: true, type: 'boolean', default: false} as register,
    KI: { command: 'KI', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 40} as register,
    KPX: { command: 'KPX', readable: true, writable: true, type: 'boolean', default: false} as register,
    KP: { command: 'KP', readable: true, writable: true, type: 'number', min: 0, max: 127, default: 30} as register,
    STBY_MODE: { command: 'STBY_MODE', readable: true, writable: true, type: 'boolean', default: false} as register,
    DIR: { command: 'DIR', readable: true, writable: true, type: 'boolean', default: true} as register,
    POLEPAIR: { command: 'POLEPAIR', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 6} as register,
    MAXSPEED: { command: 'MAXSPEED', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2, valuemap: [4096, 8192, 16384, 32768]} as register,
    FG_ON: { command: 'FG_ON', readable: true, writable: true, type: 'boolean', default: false} as register,
    TSPSEL: { command: 'TSPSEL', readable: true, writable: true, type: 'boolean', default: false} as register,
    SPDINV: { command: 'SPDINV', readable: true, writable: true, type: 'boolean', default: false} as register,
    LATCH: { command: 'LATCH', readable: true, writable: true, type: 'boolean', default: false} as register,
    OCPMASK: { command: 'OCPMASK', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0, valuemap: ['OCP: none, ISD: 83ns', 'OCP: 500ns, ISD: 583ns', 'OCP: 666ns, ISD: 750ns', 'OCP: 750ns, ISD: 833ns']} as register,
    LOCKDIS: { command: 'LOCKDIS', readable: true, writable: true, type: 'boolean', default: false} as register,
    DUTYCHGLIMIT: { command: 'DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3, valuemap: [0.17, 0.20, 0.55, 1.11, 1.84, 2.76, 3.69, 5.53]} as register,
    STARTCURRENT: { command: 'STARTCURRENT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2} as register,
    OCPDIS: { command: 'OCPDIS', readable: true, writable: true, type: 'boolean', default: false} as register,
    SS_ADD_SEL: { command: 'SS_ADD_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: [0, 0.3, 0.4, 0.5]} as register,
    SS_UP_SEL: { command: 'SS_UP_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: [0.01, 0.02, 0.05, 0.10]} as register,
    SS_DUTYCHGLIMIT: { command: 'SS_DUTYCHGLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, valuemap: [0.17, 0.20, 0.55, 1.11, 1.84, 2.76, 3.69, 5.53]} as register,
    DUTY_UP_TIME: { command: 'DUTY_UP_TIME', readable: true, writable: true, type: 'boolean', default: false} as register,
    RPMLIMIT: { command: 'RPMLIMIT', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2, valuemap: ["Unlimited", 512, 2200, 3800, 5400, 7000, 8600, 10240]} as register,
    BRK_INV: { command: 'BRK_INV', readable: true, writable: true, type: 'boolean', default: false} as register,
    ISD_MASK: { command: 'ISD_MASK', readable: true, writable: true, type: 'boolean', default: false} as register,
    RS_SEL: { command: 'RS_SEL', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0, valuemap: ['unfiltered', '200kHz', '100kHz', '50kHz']} as register,
    ANTITHROUGH: { command: 'ANTITHROUGH', readable: true, writable: true, type: 'boolean', default: false} as register,
    WAIT_TIME: { command: 'WAIT_TIME', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 2} as register,
    WAIT_MODE: { command: 'WAIT_MODE', readable: true, writable: true, type: 'boolean', default: false} as register,
    WAIT_CON: { command: 'WAIT_CON', readable: true, writable: true, type: 'boolean', default: false} as register,
    LOCK_BRK: { command: 'LOCK_BRK', readable: true, writable: true, type: 'boolean', default: false} as register,
    ALERTINV: { command: 'ALERTINV', readable: true, writable: true, type: 'boolean', default: true} as register,
    TSD_MASK: { command: 'TSD_MASK', readable: true, writable: true, type: 'boolean', default: false} as register,
    TRE: { command: 'TRE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 1} as register,
    PRE_TIP: { command: 'PRE_TIP', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2} as register,
    TIP: { command: 'TIP', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 3, valuemap: [0.1, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2]} as register,
    LA: { command: 'LA', readable: true, writable: true, type: 'number', min: 0, max: 15, default: 12} as register,
    FMAX: { command: 'FMAX', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 2} as register,
    FST: { command: 'FST', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 0} as register,
    FPWM: { command: 'FPWM', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 7} as register,
    DEADTIME: { command: 'DEADTIME', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1, valuemap: ['250ns', '500ns', '1000ns', '1500ns']} as register,
    ISD_LVL: { command: 'ISD_LVL', readable: true, writable: true, type: 'boolean', default: true} as register,
    OCP_LVL: { command: 'OCP_LVL', readable: true, writable: true, type: 'boolean', default: true} as register,
    SOURCE: { command: 'SOURCE', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0} as register,
    SINK: { command: 'SINK', readable: true, writable: true, type: 'number', min: 0, max: 7, default: 0} as register,
    COMP_HYS: { command: 'COMP_HYS', readable: true, writable: true, type: 'number', min: 0, max: 3, default: 1} as register,
    SLAVE_ADRS: {readable: true, writable: true, type: 'number', default: [41, 45, 50]} as register,
    SPD: { command: 'SPD', readable: true, writable: true, type: 'number', min: 0, max: 512, default: 0} as register,
    HZ_CNT: { command: 'HZ_CNT', readable: true, writable: false, type: 'number'} as register
}

export { AlertPinPolaritySwitch } from './AlertPinPolaritySwitch'
export { AutodeadtimeSwitch } from './AutodeadtimeSwitch'
export { BrakePolaritySwitch } from './BrakePolaritySwitch'
export { BrakeTimeSlider } from './BrakeTimeSlider'
export { BrakingModeSwitch } from './BrakingModeSwitch'
export { ChangeDutySlider } from './ChangeDutySlider'
export { ChargePumpState } from './ChargePumpState'
export { ChargePumpStateMonitoringSwitch } from './ChargePumpStateMonitoringSwitch'
export { CurrentSenseFilteringSlider } from './CurrentSenseFilteringSlider'
export { CurrentSenseGainSwitch } from './CurrentSenseGainSwitch'
export { CurrentState } from './CurrentState'
export { DeadtimeSlider } from './DeadtimeSlider'
export { DigitalFilteringSlider } from './DigitalFilteringSlider'
export { DirectionSwitch } from './DirectionSwitch'
export { DutyUpTimeSwitch } from './DutyUpTimeSwitch'
export { ElectricalAngleMaxFrequencySlider } from './ElectricalAngleMaxFrequencySlider'
export { ErrorBrakingModeSwitch } from './ErrorBrakingModeSwitch'
export { ErrorLatchSwitch } from './ErrorLatchSwitch'
export { FirstDCExcitationTimeSlider } from './FirstDCExcitationTimeSlider'
export { ForcedComutationFrequencySlider } from './ForcedComutationFrequencySlider'
export { ForcedComutationSwitch } from './ForcedComutationSwitch'
export { GateSinkCurrentSlider } from './GateSinkCurrentSlider'
export { GateSourceCurrentSlider } from './GateSourceCurrentSlider'
export { KISlider } from './KISlider'
export { KIXSwitch } from './KIXSwitch'
export { KPSlider } from './KPSlider'
export { KPXSwitch } from './KPXSwitch'
export { LeadAngleSlider } from './LeadAngleSlider'
export { MaxDutyHysteresisSlider } from './MaxDutyHysteresisSlider'
export { MaxDutySlider } from './MaxDutySlider'
export { MaxOffSwitch } from './MaxOffSwitch'
export { MaxOpenSwitch } from './MaxOpenSwitch'
export { MaxSpeedSlider } from './MaxSpeedSlider'
export { MotorDutySlider } from './MotorDutySlider'
export { NoStopSwitch } from './NoStopSwitch'
export { OffDutySlider } from './OffDutySlider'
export { OpenLoopSwitch } from './OpenLoopSwitch'
export { OutputCurrentMonitoringSwitch } from './OutputCurrentMonitoringSwitch'
export { OutputPWMSlider } from './OutputPWMSlider'
export { OverCurrentDetectionSwitch } from './OverCurrentDetectionSwitch'
export { OvercurrentDetectionThresholdSwitch } from './OvercurrentDetectionThresholdSwitch'
export { PolesSlider } from './PolesSlider'
export { PositionDetectionHysteresisSlider } from './PositionDetectionHysteresisSlider'
export { PostBrakingActionSwitch } from './PostBrakingActionSwitch'
export { RPMLimitSlider } from './RPMLimitSlider'
export { RestartTimeSlider } from './RestartTimeSlider'
export { RotationState } from './RotationState'
export { SecondDCExcitationTimeSlider } from './SecondDCExcitationTimeSlider'
export { SoftStartCurrentLimitSlider } from './SoftStartCurrentLimitSlider'
export { SoftStartCurrentStepSizeSlider } from './SoftStartCurrentStepSizeSlider'
export { SoftStartSpeedChangeLimitSlider } from './SoftStartSpeedChangeLimitSlider'
export { SpeedChangeLimitSlider } from './SpeedChangeLimitSlider'
export { SpeedInputInversionSwitch } from './SpeedInputInversionSwitch'
export { SpeedInputModeSwitch } from './SpeedInputModeSwitch'
export { SpeedOutputModeSwitch } from './SpeedOutputModeSwitch'
export { SpeedSlope2Slider } from './SpeedSlope2Slider'
export { SpeedSlopeSlider } from './SpeedSlopeSlider'
export { StandbyModeSwitch } from './StandbyModeSwitch'
export { StartDutySlider } from './StartDutySlider'
export { StartRPMSlider } from './StartRPMSlider'
export { StartupCurrentLimitSlider } from './StartupCurrentLimitSlider'
export { StartupState } from './StartupState'
export { TemperatureState } from './TemperatureState'
export { ThermalShutdownInhibitSwitch } from './ThermalShutdownInhibitSwitch'
export { DutyCurve } from './MotorDutyCurve'
export { RPMErrorState } from './RPMErrorState'