"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { WAIT_CON } from "./Register"

// WAIT_CON
export function PostBrakingActionSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        return state.WAIT_CON ? "Startup" : ("Idle for " + state.WAIT_TIME + " seconds")
    }
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.WAIT_CON }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        WAIT_CON: checked
                    })  
                    UpdateParam(motorNumber, WAIT_CON, checked)
                }}
            /> 
            Post Braking Action: { switchText() }
        </Box>
    )
}