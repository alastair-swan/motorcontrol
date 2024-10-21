import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, warningStateColor } from "../UIStyle";
import { MAXSPEED } from "./Register";

export function RotationState({state}: {state: MotorParams}){
    return (
        <Box>
            Reported Speed: <span style={{color: 
                Number.isNaN(state.hz_cnt) ? warningStateColor : 
                state.hz_cnt > ((MAXSPEED.valuemap as Array<number>) [state.MAXSPEED] as number) ? errorStateColor : 
                'white'}}>{ 
                    Number.isNaN(state.hz_cnt) ? "No Info" : state.hz_cnt + "RPM"
                } </span>
        </Box>
    )
}