"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.ANTITHROUGH.command, checked)
                }}
            /> 
            Autodeadtime
        </Box>
    )
}