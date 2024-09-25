"use server"

import * as React from 'react';
import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import './MotorDutyCurve'
import * as Client from './ClientComponents'
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
                            <Client.ChargePumpStateMonitoringSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ThermalShutdownInhibitSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OverCurrentDetectionSwitch motorNumber={motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
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
                            <Client.NoStopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorOffSpeedSlider motorNumber = {motorNumber } itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorStartDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorChangeDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorMaxDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorStartRPMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorSpeedSlopeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOpenSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOffSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MotorSpeedSlope2Slider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OpenLoopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KIXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KISlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KPXSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.KPSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StandbyModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DirectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PolesSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxSpeedSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedOutputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedInputModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedInputInversionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ErrorLatchSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DigitalFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ForceForcedComutationSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StartupCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OutputCurrentMonitoringSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartCurrentStepSizeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SoftStartSpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DutyUpTimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.RPMLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakePolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OverCurrentDetectionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.CurrentSenseFilteringSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.AutodeadtimeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakeTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.BrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PostBrakingActionSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ErrorBrakingModeSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.AlertPinPolaritySwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ThermalShutdownInhibitSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.RestartTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.FirstDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SecondDCExcitationTimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.LeadAngleSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ElectricalAngleMaxFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ForcedComutationFrequencySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OutputPWMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.DeadtimeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OvercurrentDetectionThresholdSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.CurrentSenseGainSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.GateSourceCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.GateSinkCurrentSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.PositionDetectionHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>                            
                            <Client.MotorSpeedSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={1}>
                        <Box sx={{ flex: 1, height: '100%', bgcolor: sectionbgColor, borderRadius: 2, borderWidth: 0}}>
                            <Box sx={{ flex: 1, height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                <DutyCurve motorNumber={motorNumber}/>
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