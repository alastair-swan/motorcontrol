"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { STBY_MODE } from "./Register"

// STBY_MODE
export function StandbyModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.STBY_MODE){
            return "Only STBY Pin Controls Standby"
        }
        return "Standby if motor is off"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.STBY_MODE }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        STBY_MODE: checked
                    })
                    UpdateParam(motorNumber, STBY_MODE, checked)
                }}
            /> 
            {switchText()}
        </Box>
    )
}