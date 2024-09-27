"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"

export function RPMErrorState({state}: {state: MotorParams}){
    return (
        <Box>
            RPM: { 
                state.UD_SPD ? '<span style="color: red">Under Speed</span>' : 
                state.OV_SPD ? '<span style="color: red">Over Speed</span>' : 
                "In Limits"
            }
        </Box>
    )
}