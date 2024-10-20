"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.DUTY_UP_TIME.command, checked)
                }}
            />
            Duty Up Time
        </Box>
    )
}