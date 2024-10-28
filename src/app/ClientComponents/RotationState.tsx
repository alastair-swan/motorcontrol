import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";
import { warningStateColor } from "../UIStyle";
import { HZ_CNT } from "./Register";

export function RotationState({state}: {state: MotorParams}){
    const getRPMText = () => {
        return (
            Number.isNaN(state.hz_cnt) || HZ_CNT.normalize(state.hz_cnt) / state.POLEPAIR * 60 === 2500000 ? " No Info" : 
            state.hz_cnt === 65535 ? "0 RPM" :
            " " + Math.round(HZ_CNT.normalize(state.hz_cnt) / state.POLEPAIR * 60) + " RPM"
        )
    }
    return (
        <Box>
            {state.simulated ? <span style={{color: warningStateColor}}>Simulated </span> : ""}
            Reported Speed:
            {
                <span style={{color: warningStateColor}}>{getRPMText()}</span>
            }
        </Box>
    )
}