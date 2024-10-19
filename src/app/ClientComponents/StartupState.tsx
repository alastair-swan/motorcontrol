"use client"

import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";

export function StartupState({ state }: {state: MotorParams}){
    return (
        <Box>
            Motor Start: { state.ST_FAIL ? <span style={{color: 'red'}}>Failed</span> : <span style={{color: '#00FF00'}}>Successful</span>}
        </Box>
    )
}