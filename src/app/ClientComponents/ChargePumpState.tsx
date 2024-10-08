"use client"

import { useEffect } from "react"
import { MotorParams } from "../MotorControlClient"
import { Box } from "@mui/material"

export function ChargePumpState({ state }: { state: MotorParams }){
    return (
        <Box>
            Charge Pump: { state.VCP_MASK ? (state.CP_LOW ? <span style={{color: 'red'}}>Low</span> : "Normal" ) : <span style={{color: 'yellow'}}>Not Monitored</span> }
        </Box>
    )
}