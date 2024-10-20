"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// MAXOPEN
export function MaxOpenSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.MAXOPEN){
            return "Speed Capped at Max Duty"
        }
        return "Extrapolate Past Max Duty"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={ state.MAXOPEN }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        MAXOPEN: checked
                    })          
                    UpdateParam(motorNumber, RegisterList.MAXOPEN.command, checked)
                }}
            /> 
            { switchText() }
        </Box>
    )
}