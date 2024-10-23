"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"
import { errorStateColor, goodStateColor, warningStateColor } from "../UIStyle"

export function TemperatureState({state}: {state: MotorParams}){
    return (
        <Box>
            {
                state.simulated ? <span style={{color: warningStateColor}}>Simulated </span> : ""
            }
            Temperature: {" "}{ 
                !state.TSD_MASK ? (
                    state.TSD === 1 ? <span style={{color: errorStateColor}}>Overtemperature</span> : 
                    state.TSD === -1 ? <span style={{color: warningStateColor}}>No Telemetry</span> :
                    <span style={{color: goodStateColor}}>Normal</span> ) : 
                <span style={{color: warningStateColor}}>Not Monitored</span> }
        </Box>
    )
}