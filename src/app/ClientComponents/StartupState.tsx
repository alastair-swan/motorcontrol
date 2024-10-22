"use client"

import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, goodStateColor, warningStateColor } from "../UIStyle";

export function StartupState({ state }: {state: MotorParams}){
    return (
        <Box>
            Motor Start: { 
                !state.LOCKDIS ? <span style={{color: warningStateColor}}>Not Monitored</span> :
                state.ST_FAIL ? <span style={{color: errorStateColor}}>Failed</span> : 
                <span style={{color: goodStateColor}}>Successful</span>}
        </Box>
    )
}