import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { RegisterList } from ".";
import { errorStateColor, warningStateColor } from "../UIStyle";

export function RotationState({state}: {state: MotorParams}){
    return (
        <Box>
            Reported Speed: <span style={{color: 
                state.hz_cnt === 0 ? warningStateColor : 
                state.hz_cnt > ((RegisterList.MAXSPEED.valuemap as Array<number>) [state.MAXSPEED] as number) ? errorStateColor : 
                'white'}}>{ 
                    state.hz_cnt 
                } RPM </span>
        </Box>
    )
}