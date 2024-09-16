"use server"

import * as React from 'react';
import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch'
import { 
    ClientMotorOffSpeedSlider, 
    ClientMotorMaxDutySlider, 
    ClientMotorStartDutySlider,
    ClientMotorStartRPMSlider,
    ClientMotorSpeedSlopeSlider,
    ClientMotorChangeDutySlider,
    ClientMotorSpeedSlider
} from './MotorClient'
import { propagateServerField } from 'next/dist/server/lib/render-server';

function ChargePumpState(){
    return (
        "Good"
    )
}
function TemperatureState(){
    return (
        "Good"
    )
}

function CurrentState(){
    return (
        "Good"
    )
}

function RotationState(){
    return (
        "Within Limits"
    )
}

function StartupState(){
    return (
        "Successful"
    )
}

const fullWidth = 600
const sectionbgColor = 'rgba(255,255,255,0.2)'
const itembgColor = 'rgba(255,255,255,0.2)'
const itembgHoverColor = 'rgba(255,255,255,0.4)'

function ErrorState(){
    return (
        <Grid2 sx={{ width: '100%', bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ flex: 1, height: '100%', borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} sx={{ alignItems: 'stretch', height: "100%" }}>
                    <Grid2 size={1} sx={{ width: '30vh' }}>
                        <Box sx={{ flex: 1 }}>
                            <Grid2 container spacing={'inherit'} sx={{ flex: 1, alignItems: 'stretch' }}>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Charge Pump Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Temperature Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Current Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Rotation Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Startup Monitoring
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Grid2>
                    <Grid2 size={1} sx={{ flex: 1, height:'100%' }}>
                        <Box sx={{ height: '100%', width: '100%', flex: 1, justifyContent: 'center', bgcolor: sectionbgColor, borderRadius: 2, borderWidth: 0}}>
                            <Box sx={{ flex: 1, height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                Charge Pump: <ChargePumpState/><br/>
                                Temperature: <TemperatureState/><br/>
                                Current: <CurrentState/><br/>
                                RPM State: <RotationState/><br/>
                                Startup: <StartupState/>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}

function MotorSpeedControlSettings(props: any){
    return (
        <Grid2 sx={{ width: '100%', bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ flex: 1, height: '100%', borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} sx={{ alignItems: 'stretch', height: "100%" }}>
                    <Grid2 size={1} sx={{ width: '30vh' }}>
                        <Box sx={{ flex: 1 }}>
                            <Grid2 container spacing={'inherit'} sx={{ flex: 1, alignItems: 'stretch' }}>
                            <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Switch defaultChecked /> Motor Auto Stop {/* NOSTOP register control */}
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Off Input Value<br/>
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorOffSpeedSlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Max Input Value
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorMaxDutySlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor On Input Value
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorStartDutySlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Start RPM
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorStartRPMSlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Low Speed Slope
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorSpeedSlopeSlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor High Speed Slope
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorSpeedSlopeSlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Low/High Transition Speed
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorChangeDutySlider motorNumber = {props.motorNumber} />
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        Motor Speed
                                        <Box sx={{ paddingLeft: 1, paddingRight: 1, paddingTop: 1, paddingBottom: 0}}>
                                            <ClientMotorSpeedSlider motorNumber = {props.motorNumber}/>
                                        </Box>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Grid2>
                    <Grid2 size={1} sx={{ flex: 1, height:'100%' }}>
                        <Box sx={{ height: '100%', width: '100%', flex: 1, justifyContent: 'center', bgcolor: sectionbgColor, borderRadius: 2, borderWidth: 0}}>
                            <Box sx={{ flex: 1, height: '100%', bgcolor: itembgColor, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                Charge Pump: <ChargePumpState/><br/>
                                Temperature: <TemperatureState/><br/>
                                Current: <CurrentState/><br/>
                                RPM State: <RotationState/><br/>
                                Startup: <StartupState/>
                            </Box>
                        </Box>
                    </Grid2>
                </Grid2>
            </Box>
        </Grid2>
    )
}

function MotorTuning(){
    return (
        <Grid2 size={fullWidth}>
            <Grid2 container width={fullWidth}>
                <Grid2 size={fullWidth / 2}>
                    <Box minWidth={fullWidth / 2}>
                        SpeedControl Controls
                    </Box>
                </Grid2>
                <Grid2 size={fullWidth / 2}>
                    <Box minWidth={fullWidth / 2}>
                        SpeedControl Info
                    </Box>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}

function PID (){
    return (
        <Grid2 size={fullWidth}>
            <Grid2 container width={fullWidth}>
                <Grid2 size={fullWidth / 2}>
                    <Box minWidth={fullWidth / 2}>
                        PID Controls
                    </Box>
                </Grid2>
                <Grid2 size={fullWidth / 2}>
                    <Box minWidth={fullWidth / 2}>
                        PID Info
                    </Box>
                </Grid2>
            </Grid2>
        </Grid2>    
    )
}

export async function Motor (props: any){
    return (
        <Box sx={{width: '100%'}}>
            <Grid2 container spacing={1} width={1}>
                <ErrorState />
                <MotorSpeedControlSettings motorNumber={props.motorNumber}/>
                <MotorTuning />
                <PID />
            </Grid2>
        </Box>
    )
}