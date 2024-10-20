"use client"

import { MotorParams } from "../MotorControlClient"
import { Box } from "@mui/material"
import { errorStateColor, warningStateColor } from "../UIStyle"

export function ChargePumpState({ state }: { state: MotorParams }){
    return (
        <Box width={'100%'} whiteSpace={'nowrap'}>
            Charge Pump: { state.VCP_MASK ? (state.CP_LOW ? <span style={{color: errorStateColor}}>Low</span> : "Normal" ) : <span style={{color: warningStateColor}}>Not Monitored</span> }
        </Box>
    )
}