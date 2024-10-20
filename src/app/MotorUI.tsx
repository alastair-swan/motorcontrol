"use client"

import { Grid2, Box } from "@mui/material";
import './ClientComponents/MotorDutyCurve';
import * as Client from './ClientComponents';
import { RegisterList } from "./ClientComponents";
import { useState } from "react";
import { MotorParams } from "./MotorControlClient";
import { itembgColor, sectionbgColor } from "./UIStyle";

function MotorState({ motorNumber, state, setState }: { motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }){
    return (
        <Box sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Grid2 container size={1} columns={4} sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 gridColumn={0} size={1}sx={{height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                    <Client.ChargePumpState state={state}/>
                    <Client.TemperatureState state={state}/>
                    <Client.CurrentState state={state}/>
                    <Client.RPMErrorState state={state}/>
                    <Client.StartupState state={state}/>
                    <Client.RotationState state={state}/>
                </Grid2>
                <Grid2 gridColumn={1} size={3}>
                    <Grid2 container columns={1} width={600}>
                        <Grid2 gridColumn={0} size={1}>
                            <Client.DutyCurve motorNumber={motorNumber} state={state} setState={setState} width={600}/>
                        </Grid2>
                        <Grid2 gridColumn={0} size={1}>
                            <MotorControlSliders motorNumber = {motorNumber} state={state} setState={setState}/>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    )
}



export default function Motor ({motorNumber}: {motorNumber: number}){
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

    return (
        <Box padding={2} height={'100vh'} overflow={'auto'}>
            <Grid2 container columns={1} spacing={1} width={1500}>
                <Grid2 size={1} gridColumn={0}><MotorState motorNumber={0} state={motorState} setState={(motorState: MotorParams) => {setMotorState({...motorState})}}/></Grid2>
                <Grid2 size={1} gridColumn={0}>
                    <MotorControlSettings 
                        motorNumber={0} 
                        state={motorState} 
                        setState={(state: MotorParams) => {
                            console.log(state)
                            setMotorState({...state})
                        }}
                        />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export function MotorTuningSliders({ motorNumber, state, setState }: 
    {motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }) {
    return (
        <Box overflow={'scroll'} height={'45vh'}>
            <Grid2 container columns={1} spacing={1}>
                <Grid2 size={1} gridColumn={0}><Client.NoStopSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OffDutySlider motorNumber = {motorNumber } state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.StartDutySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ChangeDutySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.MaxDutySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.StartRPMSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedSlopeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.MaxOpenSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.MaxOffSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedSlope2Slider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OpenLoopSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.KIXSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.KISlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.KPXSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.KPSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.StandbyModeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.DirectionSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.PolesSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.MaxSpeedSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedOutputModeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedInputModeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedInputInversionSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ErrorLatchSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.DigitalFilteringSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ForcedComutationSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SpeedChangeLimitSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.StartupCurrentLimitSlider motorNumber = {motorNumber} state={state} setState={setState}/></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OutputCurrentMonitoringSwitch motorNumber = {motorNumber} state={state} setState={setState}/></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SoftStartCurrentLimitSlider motorNumber = {motorNumber} state={state} setState={setState}/></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SoftStartCurrentStepSizeSlider motorNumber = {motorNumber} state={state} setState={setState}/></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SoftStartSpeedChangeLimitSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.DutyUpTimeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.RPMLimitSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.BrakePolaritySwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OverCurrentDetectionSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.CurrentSenseFilteringSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.AutodeadtimeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.BrakeTimeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.BrakingModeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.PostBrakingActionSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ErrorBrakingModeSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.AlertPinPolaritySwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ThermalShutdownInhibitSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.RestartTimeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.FirstDCExcitationTimeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.SecondDCExcitationTimeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.LeadAngleSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ForcedComutationFrequencySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OutputPWMSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.DeadtimeSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OvercurrentDetectionThresholdSwitch motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.CurrentSenseGainSwitch motorNumber = {motorNumber} state={state} setState={setState}/></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.GateSourceCurrentSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.GateSinkCurrentSlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.PositionDetectionHysteresisSlider motorNumber = {motorNumber} state={state} setState={setState} />                            </Grid2>
           </Grid2>
        </Box>
    )
}

export function MotorMonitoring({ motorNumber, state, setState }: 
    {motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }) {
    return (
        <Box>
            <Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} state={state} setState={setState} />
            <Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} state={state} setState={setState} />
            <Client.OverCurrentDetectionSwitch motorNumber={motorNumber} state={state} setState={setState} />
        </Box>
    )
}

export function MotorControlSliders({ motorNumber, state, setState }: 
    {motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }) {
    return (
        <Box>
            <Client.MotorDutySlider motorNumber = {motorNumber} state={state} setState={setState} />
        </Box>
    )
}

export function MotorControlSettings({ motorNumber, state, setState}: 
    {motorNumber: number, state: MotorParams, setState: (motorState: MotorParams) => void }) {

    return (
        <Box sx={{ borderWidth: 0, padding: 1, bgcolor: sectionbgColor, borderRadius: 4}}>
            <MotorTuningSliders motorNumber = {motorNumber} state={state} setState={setState}/>
            <MotorMonitoring motorNumber = {motorNumber} state={state} setState={setState}/>
        </Box>
    )
}

