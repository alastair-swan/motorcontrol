"use client"

import { useState, useEffect } from 'react';
import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import './MotorDutyCurve'
import * as Client from './ClientComponents'
import { RegisterList } from './ClientComponents'
import { GetParam } from './MotorControl';
import DutyCurve from './MotorDutyCurve';

export default async function MotorControlSettings({ motorNumber, sectionbgColor, itembgHoverColor, itembgColor }: {motorNumber: number, sectionbgColor: string, itembgHoverColor: string, itembgColor: string}){
    const [VOC, setVOC] = useState(RegisterList.OCP_LVL.default)
    useEffect(
        () => {
            const fetchData = async () => {
                try{
                    const result = await GetParam(motorNumber, RegisterList.SPEEDSLOP2.command) === 1
                    setVOC(result)
                }
                catch (error){
                    console.error('SPEEDSLOP2 failed to fetch: ', error)
                }
            }
            fetchData()
        }, [ motorNumber ]
    )

    return (
        <Grid2 sx={{ bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} columns={2}>
                    <Grid2 size={1} spacing={1}>
                        <Grid2 container spacing={1}>
                            <Client.NoStopSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.OffDutySlider motorNumber = {motorNumber } itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StartDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.ChangeDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxDutySlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StartRPMSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxDutyHysteresisSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedSlopeSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOpenSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.MaxOffSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedSlope2Slider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
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
                            <Client.ForcedComutationSwitch motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.SpeedChangeLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
                            <Client.StartupCurrentLimitSlider motorNumber = {motorNumber} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor} VOC={VOC}/>
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