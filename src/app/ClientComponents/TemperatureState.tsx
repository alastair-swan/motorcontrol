"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"

export function TemperatureState({state}: {state: MotorParams}){
    return (
        <Box>
            Temperature: { state.TSD_MASK ? (state.TSD ? <span style={{color: 'red'}}>Overtemperature</span> : "Normal" ) : <span style={{color: 'yellow'}}>Not Monitored</span> }
        </Box>
    )
}