"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { MAXOPEN } from "./Register"

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
                    UpdateParam(motorNumber, MAXOPEN, checked)
                }}
            /> 
            { switchText() }
        </Box>
    )
}