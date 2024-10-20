"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"
import { errorStateColor, goodStateColor } from "../UIStyle"

export function RPMErrorState({state}: {state: MotorParams}){
    return (
        <Box>
            Motor RPM: { 
                state.UD_SPD ? <span style={{color: errorStateColor}}>Under Speed</span> : 
                state.OV_SPD ? <span style={{color: errorStateColor}}>Over Speed</span> : 
                <span style={{color: goodStateColor}}>In Limits</span>
            }
        </Box>
    )
}