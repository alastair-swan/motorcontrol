"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// STBY_MODE
export function StandbyModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.STBY_MODE){
            return "Only Stby Pin Controls Standby"
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
                    UpdateParam(motorNumber, RegisterList.STBY_MODE.command, checked)
                }}
            /> 
            {switchText()}
        </Box>
    )
}