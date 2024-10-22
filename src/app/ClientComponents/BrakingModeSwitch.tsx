"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { WAIT_MODE } from "./Register"

// WAIT_MODE
export function BrakingModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle}: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.WAIT_MODE}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        WAIT_MODE: checked
                    })
                    UpdateParam(motorNumber, WAIT_MODE, checked)
                }}
            />
            {state.WAIT_MODE ? "Shorted" : "Hi-Z"}
        </Box>
    )
}