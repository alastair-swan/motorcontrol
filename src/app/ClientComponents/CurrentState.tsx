import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, goodStateColor, warningStateColor } from "../UIStyle";

export function CurrentState({ state }: { state: MotorParams }){
    return (
        <Box whiteSpace="nowrap" overflow={"scroll"}>
            {state.simulated ? <span style={{color: warningStateColor}}>Simulated </span> : ""}
            Driver Current: { 
                state.ISD_MASK ? <span style={{color: warningStateColor}}>Not Monitored</span> : (
                    state.ISD === 1 ? <span style={{color: errorStateColor}}>Overcurrent</span> : 
                    state.ISD === -1 ? <span style={{color: warningStateColor}}>No Telemetry</span> :
                    <span style={{color: goodStateColor}}>Normal</span> 
                )}
        </Box>
    )
}