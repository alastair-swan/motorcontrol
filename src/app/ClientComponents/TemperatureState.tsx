"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"
import { errorStateColor, warningStateColor } from "../UIStyle"

export function TemperatureState({state}: {state: MotorParams}){
    return (
        <Box>
            Temperature: { state.TSD_MASK ? (state.TSD ? <span style={{color: errorStateColor}}>Overtemperature</span> : "Normal" ) : <span style={{color: warningStateColor}}>Not Monitored</span> }
        </Box>
    )
}