"use client"

import { Box } from "@mui/material"
import { MotorParams } from "../MotorControlClient"

export function TemperatureState({state}: {state: MotorParams}){
    return (
        <Box>
            Temperature: { state.ST_FAIL ? '<span style="color: red">Out of Limits</span>' : "In Limits"}
        </Box>
    )
}