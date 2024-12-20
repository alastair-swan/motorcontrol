"use client"

import { Grid2, Box, Button } from "@mui/material";
import './ClientComponents/MotorDutyCurve';
import * as Client from './ClientComponents';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MotorParams } from "./MotorControlClient";
import { itembgColor, sectionbgColor } from "./UIStyle";
import * as RegisterList from "./ClientComponents/Register";
import { getData, loadMotorDefault, loadMotorTune, saveMotorTune } from "./MotorControl";

const simulate = false
function MotorState({ motorNumber, state, setState }: { motorNumber: number, state: MotorParams, setState: Dispatch<SetStateAction<MotorParams>> }){
    useEffect(() => {
        console.info("starting to poll")
        const poller = setInterval(() => {
            const update = async () => {
                const motorData = await getData( motorNumber, state.simulated )
                setState((prev) => ({
                    ...prev, 
                    hz_cnt: motorData.hz_cnt,
                    CP_LOW: motorData.CP_LOW,
                    TSD: motorData.TSD,
                    ISD: motorData.ISD,
                    OV_SPD: motorData.OV_SPD,
                    UD_SPD: motorData.UD_SPD,
                    ST_FAIL: motorData.ST_FAIL
                }))
            }
            update().catch(console.error)
        }, 500)
        return () => clearInterval(poller)
    }, [state.simulated])
    return (
        <Box sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Grid2 container size={1} columns={2} spacing={1} sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 gridColumn={0} size={1}>
                    <Grid2 container columns={1} width={"100%"} size={1} spacing={1}>
                        <Grid2 size={1} sx={{ bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                            <Client.ChargePumpState state={ state }/>
                            <Client.TemperatureState state={ state }/>
                            <Client.CurrentState state={ state }/>
                            <Client.RPMErrorState state={ state }/>
                            <Client.StartupState state={ state }/>
                            <Client.RotationState state={ state }/>
                        </Grid2>
                        <Grid2 width={"100%"}>
                            <MotorMonitoring motorNumber = {motorNumber} state={state} setState={setState}/>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 gridColumn={1} size={1}>
                    <Grid2 container columns={1} width={600}>
                        <Grid2 gridColumn={0} size={1}>
                            <Client.DutyCurve motorNumber={motorNumber} state={ state } setState={setState} width={600}/>
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
        simulated: simulate,
        CP_LOW: -1,
        TSD: -1,
        ISD: -1,
        OV_SPD: -1,
        UD_SPD: -1,
        ST_FAIL: -1,
        USERID: RegisterList.USERID.default as number,
        NOSTOP: RegisterList.NOSTOP.default as boolean,
        STOPDUTY: RegisterList.STOPDUTY.default as number,
        STARTDUTY: RegisterList.STARTDUTY.default as number,
        CHANGEDUTY: RegisterList.CHANGEDUTY.default as number,
        MAXDUTY: RegisterList.MAXDUTY.default as number,
        STARTRPM: RegisterList.STARTRPM.default as number,
        MAXDUTYHYS: RegisterList.MAXDUTYHYS.default as number,
        SPEEDSLOP: RegisterList.SPEEDSLOP.default as number,
        MAXOPEN: RegisterList.MAXOPEN.default as boolean,
        MAXOFF: RegisterList.MAXOFF.default as boolean,
        SPEEDSLOP2: RegisterList.SPEEDSLOP2.default as number,
        VCP_MASK: RegisterList.VCP_MASK.default as boolean,
        OPENLOOP: RegisterList.OPENLOOP.default as boolean,
        KIX: RegisterList.KIX.default as boolean,
        KI: RegisterList.KI.default as number,
        KPX: RegisterList.KPX.default as boolean,
        KP: RegisterList.KP.default as number,
        STBY_MODE: RegisterList.STBY_MODE.default as boolean,
        DIR: RegisterList.DIR.default as boolean,
        POLEPAIR: RegisterList.POLEPAIR.default as number,
        MAXSPEED: RegisterList.MAXSPEED.default as number,
        FG_ON: RegisterList.FG_ON.default as boolean,
        TSPSEL: RegisterList.TSPSEL.default as boolean,
        SPDINV: RegisterList.SPDINV.default as boolean,
        LATCH: RegisterList.LATCH.default as boolean,
        OCPMASK: RegisterList.OCPMASK.default as number,
        LOCKDIS: RegisterList.LOCKDIS.default as boolean,
        DUTYCHGLIMIT: RegisterList.DUTYCHGLIMIT.default as number,
        STARTCURRENT: RegisterList.STARTCURRENT.default as number,
        OCPDIS: RegisterList.OCPDIS.default as boolean,
        SS_ADD_SEL: RegisterList.SS_ADD_SEL.default as number,
        SS_UP_SEL: RegisterList.SS_UP_SEL.default as number,
        SS_DUTYCHGLIMIT: RegisterList.SS_DUTYCHGLIMIT.default as number,
        DUTY_UP_TIME: RegisterList.DUTY_UP_TIME.default as boolean,
        RPMLIMIT: RegisterList.RPMLIMIT.default as number,
        BRK_INV: RegisterList.BRK_INV.default as boolean,
        ISD_MASK: RegisterList.ISD_MASK.default as boolean,
        RS_SEL: RegisterList.RS_SEL.default as number,
        ANTITHROUGH: RegisterList.ANTITHROUGH.default as boolean,
        WAIT_TIME: RegisterList.WAIT_TIME.default as number,
        WAIT_MODE: RegisterList.WAIT_MODE.default as boolean,
        WAIT_CON: RegisterList.WAIT_CON.default as boolean,
        LOCK_BRK: RegisterList.LOCK_BRK.default as boolean,
        ALERTINV: RegisterList.ALERTINV.default as boolean,
        TSD_MASK: RegisterList.TSD_MASK.default as boolean,
        TRE: RegisterList.TRE.default as number,
        PRE_TIP: RegisterList.PRE_TIP.default as number,
        TIP: RegisterList.TIP.default as number,
        LA: RegisterList.LA.default as number,
        FMAX: RegisterList.FMAX.default as number,
        FST: RegisterList.FST.default as number,
        FPWM: RegisterList.FPWM.default as number,
        DEADTIME: RegisterList.DEADTIME.default as number,
        ISD_LVL: RegisterList.ISD_LVL.default as boolean,
        OCP_LVL: RegisterList.OCP_LVL.default as boolean,
        SOURCE: RegisterList.SOURCE.default as number,
        SINK: RegisterList.SINK.default as number,
        COMP_HYS: RegisterList.COMP_HYS.default as number,
        SLAVE_ADRS: (RegisterList.SLAVE_ADRS.default as Array<number>)[motorNumber] as number,
        SPD: RegisterList.SPD.default as number,
        hz_cnt: NaN
    })

    useEffect(()=>{
        const load = async () => {setMotorState(await loadMotorTune(motorNumber))}
        load()
    }, [])

    return (
        <Box padding={2} height={'100vh'} overflow={'auto'}>
            <Grid2 container columns={1} spacing={1} width={1225}>
                <Grid2 size={1} gridColumn={0}>
                    <MotorState motorNumber={ 0 } state={motorState} setState={ setMotorState }/>
                </Grid2>
                <Grid2 size={1} gridColumn={0}>
                    <Box paddingBottom={1} paddingTop={1}>
                        <Button sx={{'&:hover': { bgcolor: itembgColor }}} onClick={() => {saveMotorTune(motorState, motorNumber)}}>Save Custom Tune</Button>
                        <Button sx={{'&:hover': { bgcolor: itembgColor }}} onClick={async () => {setMotorState(await loadMotorTune(motorNumber))}}>Load Custom Tune</Button>
                        <Button sx={{'&:hover': { bgcolor: itembgColor }}} onClick={async () => {setMotorState(await loadMotorDefault())}}>Load Default Tune</Button>
                        <Button sx={{'&:hover': { bgcolor: itembgColor }}} onClick={() => {setMotorState({...motorState, simulated: !motorState.simulated})}}>{motorState.simulated ? "Disable" : "Enable"} Simulated Data</Button>
                    </Box>
                    <MotorControlSettings 
                        motorNumber={0} 
                        state={motorState} 
                        setState={ setMotorState }
                    />
                </Grid2>
            </Grid2>
        </Box>
    )
}

export function MotorTuningSliders({ motorNumber, state, setState }: 
    {motorNumber: number, state: MotorParams, setState: Dispatch<SetStateAction<MotorParams>> }) {
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
    {motorNumber: number, state: MotorParams, setState: Dispatch<SetStateAction<MotorParams>> }) {
    return (
        <Box>
            <Grid2 container columns={1} spacing={1}>
                <Grid2 size={1} gridColumn={0}><Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.OverCurrentDetectionSwitch motorNumber={motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ForcedComutationSwitch motorNumber={motorNumber} state={state} setState={setState} /></Grid2>
                <Grid2 size={1} gridColumn={0}><Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} state={state} setState={setState} /></Grid2>
            </Grid2>
        </Box>
    )
}

export function MotorControlSliders({ motorNumber, state, setState }: 
    {motorNumber: number, state: MotorParams, setState: Dispatch<SetStateAction<MotorParams>> }) {
    return (
        <Box>
            <Client.MotorDutySlider motorNumber = {motorNumber} state={state} setState={setState} />
        </Box>
    )
}

export function MotorControlSettings({ motorNumber, state, setState}: 
    {motorNumber: number, state: MotorParams, setState: Dispatch<SetStateAction<MotorParams>> }) {

    return (
        <Box sx={{ borderWidth: 0, padding: 1, bgcolor: sectionbgColor, borderRadius: 4}}>
            <MotorTuningSliders motorNumber = {motorNumber} state={state} setState={setState}/>
        </Box>
    )
}

