import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { errorStateColor, warningStateColor } from "../UIStyle";
import { HZ_CNT, MAXSPEED } from "./Register";

export function RotationState({state}: {state: MotorParams}){
    return (
        <Box>
            Reported Speed: <span style={{color: 
                Number.isNaN(state.hz_cnt) ? warningStateColor : 
                HZ_CNT.normalize(state.hz_cnt) / state.POLEPAIR * 60 > ((MAXSPEED.valuemap as Array<number>) [state.MAXSPEED] as number) ? errorStateColor : 
                'white'}}>{ 
                    Number.isNaN(state.hz_cnt) ? "No Info" : Math.round(HZ_CNT.normalize(state.hz_cnt) / state.POLEPAIR * 60) + " RPM"
                } </span>
        </Box>
    )
}