import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";

export function CurrentState({ state }: { state: MotorParams }){
    return (
        <Box>
            Driver Current: { state.ISD ? <span style={{color: 'red'}}>Overcurrent</span> : <span style={{color: '#00FF00'}}>Normal</span> }
        </Box>
    )
}