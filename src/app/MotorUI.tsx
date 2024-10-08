"use client"

import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import './ClientComponents/MotorDutyCurve'
import * as Client from './ClientComponents'
import { GetParam } from "./MotorControl";
import { RegisterList } from "./ClientComponents";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MotorParams } from "./MotorControlClient";
const sectionbgColor = 'rgba(255,255,255,0.2)'
const itembgColor = 'rgba(255,255,255,0.2)'
const itembgHoverColor = 'rgba(255,255,255,0.4)'


function MotorNumberComponent({ motorNumber }: { motorNumber: number }){
    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0, width: '100%'}}>
            <Box sx={{ borderWidth: 0, padding: 1, width: '100%', justifyContent: 'center'}}>
                Motor { motorNumber }
            </Box>
        </Grid2>
    )
}



function ErrorState({ motorNumber, state, setState }: { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }){
    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} columns={2}>
                    <Grid2 size={1}>
                        <Grid2 container spacing={1}>
                            <Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
                            <Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
                            <Client.OverCurrentDetectionSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
                        </Grid2>
                    </Grid2>
                    <Grid2 size={1}>
                        <Box sx={{height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                            <Client.ChargePumpState state={state}/><br/>
                            <Client.TemperatureState state={state}/><br/>
                            <Client.CurrentState state={state}/><br/>
                            <Client.RPMErrorState state={state}/><br/>
                            <Client.StartupState state={state}/><br/>
                            <Client.RotationState state={state}/>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}



export function Motor ({ motorNumber }: { motorNumber: number }){
    const [motorState, setMotorState] = useState<MotorParams>({
        CP_LOW: false,
        TSD: false,
        ISD: false,
        OV_SPD: false,
        UD_SPD: false,
        ST_FAIL: false,
        USERID: RegisterList.USERID.default,
        NOSTOP: RegisterList.NOSTOP.default,
        STOPDUTY: RegisterList.STOPDUTY.default,
        STARTDUTY: RegisterList.STARTDUTY.default,
        CHANGEDUTY: RegisterList.CHANGEDUTY.default,
        MAXDUTY: RegisterList.MAXDUTY.default,
        STARTRPM: RegisterList.STARTRPM.default,
        MAXDUTYHYS: RegisterList.MAXDUTYHYS.default,
        SPEEDSLOP: RegisterList.SPEEDSLOP.default,
        MAXOPEN: RegisterList.MAXOPEN.default,
        MAXOFF: RegisterList.MAXOFF.default,
        SPEEDSLOP2: RegisterList.SPEEDSLOP2.default,
        VCP_MASK: RegisterList.VCP_MASK.default,
        OPENLOOP: RegisterList.OPENLOOP.default,
        KIX: RegisterList.KIX.default,
        KI: RegisterList.KI.default,
        KPX: RegisterList.KPX.default,
        KP: RegisterList.KP.default,
        STBY_MODE: RegisterList.STBY_MODE.default,
        DIR: RegisterList.DIR.default,
        POLEPAIR: RegisterList.POLEPAIR.default,
        MAXSPEED: RegisterList.MAXSPEED.default,
        FG_ON: RegisterList.FG_ON.default,
        TSPSEL: RegisterList.TSPSEL.default,
        SPDINV: RegisterList.SPDINV.default,
        LATCH: RegisterList.LATCH.default,
        OCPMASK: RegisterList.OCPMASK.default,
        LOCKDIS: RegisterList.LOCKDIS.default,
        DUTYCHGLIMIT: RegisterList.DUTYCHGLIMIT.default,
        STARTCURRENT: RegisterList.STARTCURRENT.default,
        OCPDIS: RegisterList.OCPDIS.default,
        SS_ADD_SEL: RegisterList.SS_ADD_SEL.default,
        SS_UP_SEL: RegisterList.SS_UP_SEL.default,
        SS_DUTYCHGLIMIT: RegisterList.SS_DUTYCHGLIMIT.default,
        DUTY_UP_TIME: RegisterList.DUTY_UP_TIME.default,
        RPMLIMIT: RegisterList.RPMLIMIT.default,
        BRK_INV: RegisterList.BRK_INV.default,
        ISD_MASK: RegisterList.ISD_MASK.default,
        RS_SEL: RegisterList.RS_SEL.default,
        ANTITHROUGH: RegisterList.ANTITHROUGH.default,
        WAIT_TIME: RegisterList.WAIT_TIME.default,
        WAIT_MODE: RegisterList.WAIT_MODE.default,
        WAIT_CON: RegisterList.WAIT_CON.default,
        LOCK_BRK: RegisterList.LOCK_BRK.default,
        ALERTINV: RegisterList.ALERTINV.default,
        TSD_MASK: RegisterList.TSD_MASK.default,
        TRE: RegisterList.TRE.default,
        PRE_TIP: RegisterList.PRE_TIP.default,
        TIP: RegisterList.TIP.default,
        LA: RegisterList.LA.default,
        FMAX: RegisterList.FMAX.default,
        FST: RegisterList.FST.default,
        FPWM: RegisterList.FPWM.default,
        DEADTIME: RegisterList.DEADTIME.default,
        ISD_LVL: RegisterList.ISD_LVL.default,
        OCP_LVL: RegisterList.OCP_LVL.default,
        SOURCE: RegisterList.SOURCE.default,
        SINK: RegisterList.SINK.default,
        COMP_HYS: RegisterList.COMP_HYS.default,
        SLAVE_ADRS: RegisterList.SLAVE_ADRS.default[motorNumber] as number,
        SPD: RegisterList.SPD.default,
        hz_cnt: 0
    })

    const updateMotor = (motorState: MotorParams) => {
        setMotorState({...motorState})
    }

    return (
        <Grid2 size={1}>
            <Grid2 container spacing={1}>
                <MotorNumberComponent motorNumber={motorNumber}/>
                <ErrorState motorNumber={motorNumber} state={motorState} setState={updateMotor}/>
                <MotorControlSettings motorNumber={motorNumber} sectionbgColor={sectionbgColor} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={motorState} setState={updateMotor}/>
            </Grid2>
        </Grid2>
    )
}

export function MotorControlSliders({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor, state, setState }: 
    {motorNumber: number, sectionbgColor?: string, itembgHoverColor: string, itembgColor: string, state: MotorParams, setState: (motorState: MotorParams) => void } ) {
    return (
        <Grid2 container spacing={1}>
            <Client.NoStopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OffDutySlider motorNumber = {motorNumber } itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ChangeDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartRPMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedSlopeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxOpenSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxOffSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedSlope2Slider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OpenLoopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KIXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KISlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KPXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.KPSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StandbyModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DirectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PolesSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.MaxSpeedSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedOutputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedInputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedInputInversionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ErrorLatchSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DigitalFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ForcedComutationSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.StartupCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.OutputCurrentMonitoringSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartCurrentStepSizeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.SoftStartSpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DutyUpTimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.RPMLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakePolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OverCurrentDetectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.CurrentSenseFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.AutodeadtimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakeTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.BrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PostBrakingActionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ErrorBrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.AlertPinPolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ThermalShutdownInhibitSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.RestartTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.FirstDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.SecondDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.LeadAngleSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.ForcedComutationFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OutputPWMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.DeadtimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.OvercurrentDetectionThresholdSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.CurrentSenseGainSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
            <Client.GateSourceCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.GateSinkCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
            <Client.PositionDetectionHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />                            
            <Client.MotorDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState} />
        </Grid2>
    )
}

export default function MotorControlSettings({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor, state, setState}: {motorNumber: number, sectionbgColor: string, itembgHoverColor: string, itembgColor: string, state: MotorParams, setState: (motorState: MotorParams) => void }){
    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} columns={2}>
                    <Grid2 size={1} spacing={1}>
                        <MotorControlSliders motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} state={state} setState={setState}/>
                    </Grid2>
                    <Grid2 size={1}>
                        <Box sx={{ flex: 1, height: '100%', bgcolor: sectionbgColor, borderRadius: 2, borderWidth: 0}}>
                            <Box sx={{ flex: 1, height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                { /* <Client.DutyCurve motorNumber={motorNumber} state={state} setState={setState}/> */ }
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}

