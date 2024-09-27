"use client"

import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";

export function StartupState({ state }: {state: MotorParams}){
    return (
        <Box>
            Startup { state.ST_FAIL ? '<span style="color: red">Failed</span>' : "Successful"}
        </Box>
    )
}