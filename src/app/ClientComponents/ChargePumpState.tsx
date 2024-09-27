"use client"

import { Dispatch, SetStateAction } from "react"
import { MotorParams } from "../MotorControlClient"
import { Box } from "@mui/material"

export function ChargePumpState({ state }: { state: MotorParams }){
    return (
        <Box>
            Charge Pump: { state.CP_LOW ? '<span style="color: red">Low</span>' : "Normal" }
        </Box>
    )
}