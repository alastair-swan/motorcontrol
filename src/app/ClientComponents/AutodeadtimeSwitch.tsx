"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { ANTITHROUGH } from "./Register"

// ANTITHROUGH
export function AutodeadtimeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.ANTITHROUGH}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        ANTITHROUGH: checked
                    })
                    UpdateParam(motorNumber, ANTITHROUGH, checked)
                }}
            /> 
            Auto Dead time control: {state.ANTITHROUGH ? "Disabled" : "Enabled"}
        </Box>
    )
}