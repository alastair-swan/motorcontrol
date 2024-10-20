"use client"

import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, goodStateColor } from "../UIStyle";

export function StartupState({ state }: {state: MotorParams}){
    return (
        <Box>
            Motor Start: { state.ST_FAIL ? <span style={{color: errorStateColor}}>Failed</span> : <span style={{color: goodStateColor}}>Successful</span>}
        </Box>
    )
}