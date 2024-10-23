"use client"

import { MotorParams } from "../MotorControlClient"
import { Box } from "@mui/material"
import { errorStateColor, goodStateColor, warningStateColor } from "../UIStyle"

export function ChargePumpState({ state }: { state: MotorParams }){
    return (
        <Box width={'100%'} whiteSpace={'nowrap'}>
            {
                state.simulated ? <span style={{color: warningStateColor}}>Simulated </span> : ""
            }
            Charge Pump: { 
                !state.VCP_MASK ? (
                    state.CP_LOW === 1 ? <span style={{color: errorStateColor}}>Low</span> : 
                    state.CP_LOW === -1 ? <span style={{color: warningStateColor}}>No Telemetry</span> :
                    <span style={{color: goodStateColor}}>Normal</span> ) : 
                    <span style={{color: warningStateColor}}>Not Monitored</span> 
                }
        </Box>
    )
}