"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"
import { errorStateColor, goodStateColor, warningStateColor } from "../UIStyle"

export function RPMErrorState({state}: {state: MotorParams}){
    return (
        <Box whiteSpace="nowrap" overflow={"scroll"}>
            {
                state.simulated ? <span style={{color: warningStateColor}}>Simulated </span> : ""
            }
            Motor RPM: { 
                state.UD_SPD === 1 ? <span style={{color: errorStateColor}}>Under Speed </span> : 
                state.OV_SPD === 1 ? <span style={{color: errorStateColor}}>Over Speed </span> : 
                state.UD_SPD === -1 ? <span style={{color: warningStateColor}}>No Underspeed Telemetry </span> : " " 
            }
            {
                state.FMAX === 3 ? <span style={{color: warningStateColor}}>Overspeed Not monitored </span> :
                state.OV_SPD === -1 ? <span style={{color: warningStateColor}}>No Overspeed Telemetry </span>: "" 
            }
            {
                state.OV_SPD === 0 && state.UD_SPD === 0 ? <span style={{color: goodStateColor}}>In Limits</span> : ""
            }
        </Box>
    )
}