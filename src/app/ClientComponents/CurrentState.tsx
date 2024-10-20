import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, goodStateColor } from "../UIStyle";

export function CurrentState({ state }: { state: MotorParams }){
    return (
        <Box>
            Driver Current: { state.ISD ? <span style={{color: errorStateColor}}>Overcurrent</span> : <span style={{color: goodStateColor}}>Normal</span> }
        </Box>
    )
}