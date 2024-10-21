"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { DUTY_UP_TIME } from "./Register"

// DUTY_UP_TIME
export function DutyUpTimeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.DUTY_UP_TIME }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        DUTY_UP_TIME: checked
                    })
                    UpdateParam(motorNumber, DUTY_UP_TIME, checked)
                }}
            />
            Duty Up Time: { state.DUTY_UP_TIME ? "10.8ms" : "2.7ms" }
        </Box>
    )
}