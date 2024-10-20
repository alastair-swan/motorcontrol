"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.WAIT_CON.command, checked)
                }}
            /> 
            Post Braking Action: { switchText() }
        </Box>
    )
}