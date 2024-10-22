"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { LOCK_BRK } from "./Register"

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
                    UpdateParam(motorNumber, LOCK_BRK, checked)
                }}
            /> 
            Error Braking Mode: { state.LOCK_BRK ? "Shorted" : "Hi-Z" }
        </Box>
    )
}