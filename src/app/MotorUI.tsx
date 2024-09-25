"use server"

import Grid2 from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import './MotorDutyCurve'
import * as Client from './ClientComponents'
import MotorControlSettings from './MotorClient'
import { Suspense } from "react";
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

export async function Motor ({ motorNumber }: { motorNumber: number }){
    return (
        <Grid2 size={1}>
            <Grid2 container spacing={1}>
                <MotorNumberComponent motorNumber={motorNumber}/>
                <ErrorState motorNumber={motorNumber}/>
                    <MotorControlSettings motorNumber={motorNumber} sectionbgColor={sectionbgColor} itembgHoverColor={itembgHoverColor} itembgColor={itembgColor}/>
            </Grid2>
        </Grid2>
    )
}