"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.WAIT_MODE.command, checked)
                }}
            />
            Brake Mode
        </Box>
    )
}