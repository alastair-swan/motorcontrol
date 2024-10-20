"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// LOCK_BRK
export function ErrorBrakingModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.LOCK_BRK}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        LOCK_BRK: checked
                    })   
                    UpdateParam(motorNumber, RegisterList.LOCK_BRK.command, checked)
                }}
            /> 
            Error Braking Mode
        </Box>
    )
}