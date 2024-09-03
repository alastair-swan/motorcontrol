import * as React from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button'
import Grid2 from "@mui/material/Grid2";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch'


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

function DutyControl(){
    return (
        <Grid2 sx={{ width: '100%', bgcolor: sectionbgColor, borderRadius: 4, borderWidth: 0}}>
            <Box sx={{ flex: 1, height: '100%', borderWidth: 0, padding: 1 }}>
                <Grid2 container spacing={1} sx={{ alignItems: 'stretch', height: "100%" }}>
                    <Grid2 size={1} sx={{ width: '30vh' }}>
                        <Box sx={{ flex: 1 }}>
                            <Grid2 container spacing={'inherit'} sx={{ flex: 1, alignItems: 'stretch' }}>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, padding: 1}}>
                                        <Slider valueLabelDisplay='auto' max={100} min={0} step={1}/> 
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Checkbox defaultChecked /> Temperature Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Checkbox defaultChecked /> Current Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Checkbox defaultChecked /> Rotation Monitoring
                                    </Box>
                                </Grid2>
                                <Grid2 sx={{ width: '100%' }}>
                                    <Box sx={{ justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0}}>
                                        <Checkbox defaultChecked /> Startup Monitoring
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

function SpeedControl(){
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

export function Motor (){
    return (
        <Box sx={{width: '100%'}}>
            <Grid2 container spacing={1} width={1}>
                <ErrorState />
                <DutyControl />
                <SpeedControl />
                <PID />
            </Grid2>
        </Box>
    )
}