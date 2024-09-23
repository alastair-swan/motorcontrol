"use server"

import * as React from 'react';
import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import './MotorDutyCurve'
import * as Client from './MotorClient'
import { GetParam } from './MotorControl';
import DutyCurve from './MotorDutyCurve';

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

async function ErrorState({ motorNumber }: { motorNumber: number }){
    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} columns={2}>
                    <Grid2 size={1}>
                        <Grid2 container spacing={1}>
                            <Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} initialState = {await GetParam(motorNumber, 'VCP_MASK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} initialState = {await GetParam(motorNumber, 'TSD_MASK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OverCurrentDetectionSwitch motorNumber={motorNumber} initialState = {await GetParam(motorNumber, 'ISD_MASK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={1}>
                        <Box sx={{height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                            Charge Pump: <Client.ChargePumpState motorNumber={motorNumber}/><br/>
                            Temperature: <Client.TemperatureState motorNumber={motorNumber}/><br/>
                            Current: <Client.CurrentState motorNumber={motorNumber}/><br/>
                            RPM State: <Client.RotationState motorNumber={motorNumber}/><br/>
                            Startup: <Client.StartupState motorNumber={motorNumber}/>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}

async function MotorControlSettings({ motorNumber }: {motorNumber: number}){
    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} columns={2}>
                    <Grid2 size={1} spacing={1}>
                        <Grid2 container spacing={1}>
                            <Client.NoStopSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'NOSTOP') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorOffSpeedSlider motorNumber = {motorNumber } initialState = {await GetParam(motorNumber, 'STOPDUTY')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorStartDutySlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'STARTDUTY')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorChangeDutySlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'CHANGEDUTY')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorMaxDutySlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'MAXDUTY')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorStartRPMSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'STARTRPM')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'MAXDUTYHYS')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorSpeedSlopeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SPEEDSLOP')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOpenSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'MAXOPEN') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOffSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'MAXOFF') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorSpeedSlope2Slider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SPEEDSLOP2')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OpenLoopSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'OPENLOOP') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KIXSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'KIX') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KISlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'KI')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KPXSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'KPX') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KPSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'KP')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StandbyModeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'STBY_MODE') === 0} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DirectionSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'DIR') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PolesSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'POLEPAIR')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxSpeedSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'MAXSPEED')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedOutputModeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'FG_ON') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedInputModeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'TSPSEL') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedInputInversionSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SPDINV') === 0} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ErrorLatchSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'LATCH') === 0} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DigitalFilteringSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'OCPMASK')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ForceForcedComutationSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'LOCKDIS') === 0} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedChangeLimitSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'DUTYCHGLIMIT')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StartupCurrentLimitSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'STARTCURRENT')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OutputCurrentMonitoringSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'OCPDIS') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartCurrentLimitSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SS_ADD_SEL')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartCurrentStepSizeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SS_UP_SEL')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartSpeedChangeLimitSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SS_DUTYCHGLIMIT')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DutyUpTimeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'DUTY_UP_TIME') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.RPMLimitSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'RPMLIMIT')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakePolaritySwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'BRK_INV') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OverCurrentDetectionSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'ISD_MASK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.CurrentSenseFilteringSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'RS_SEL')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.AutodeadtimeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'ANTITHROUGH') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakeTimeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'WAIT_TIME')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakingModeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'WAIT_MODE') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PostBrakingActionSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'WAIT_CON') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ErrorBrakingModeSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'LOCK_BRK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.AlertPinPolaritySwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'ALERTINV') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ThermalShutdownInhibitSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'TSD_MASK') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.RestartTimeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'TRE')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.FirstDCExcitationTimeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'PRE_TIP')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SecondDCExcitationTimeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'TIP')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.LeadAngleSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'LA')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'FMAX')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ForcedComutationFrequencySlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'FST')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OutputPWMSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'FPWM')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DeadtimeSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'DEADTIME')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OvercurrentDetectionThresholdSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'ISD_LVL') === 0} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.CurrentSenseGainSwitch motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'OCP_LVL') === 1} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.GateSourceCurrentSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SOURCE')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.GateSinkCurrentSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SINK')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PositionDetectionHysteresisSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'COMP_HYS')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>                            
                            <Client.MotorSpeedSlider motorNumber = {motorNumber} initialState = {await GetParam(motorNumber, 'SPD')} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={1}>
                        <Box sx={{ flex: 1, height: '100%', bgcolor: sectionbgColor, borderRadius: 2, borderWidth: 0}}>
                            <Box sx={{ flex: 1, height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                <DutyCurve />
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}

export async function Motor ({ motorNumber }: { motorNumber: number }){
    return (
        <Grid2 size={1}>
            <Grid2 container spacing={1}>
                <MotorNumberComponent motorNumber={motorNumber}/>
                <ErrorState motorNumber={motorNumber}/>
                <MotorControlSettings motorNumber={motorNumber}/>
            </Grid2>
        </Grid2>
    )
}