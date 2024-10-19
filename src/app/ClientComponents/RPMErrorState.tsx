"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"

export function RPMErrorState({state}: {state: MotorParams}){
    return (
        <Box>
            Motor RPM: { 
                state.UD_SPD ? <span style={{color: 'red'}}>Under Speed</span> : 
                state.OV_SPD ? <span style={{color: 'red'}}>Over Speed</span> : 
                <span style={{color: '#00FF00'}}>In Limits</span>
            }
        </Box>
    )
}