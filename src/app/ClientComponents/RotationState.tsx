import { Box } from "@mui/material";
import { MotorParams } from "../MotorControlClient";

export function RotationState({state}: {state: MotorParams}){
    return (
        <Box>
            Current reported speed: { state.hz_cnt } RPM
        </Box>
    )
}