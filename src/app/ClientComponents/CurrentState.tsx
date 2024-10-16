import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";

export function CurrentState({ state }: { state: MotorParams }){
    return (
        <Box>
            { state.ISD ? <span style={{color: 'red'}}>Overcurrent</span> : "Normal" }
        </Box>
    )
}