"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// MAXOFF
export function MaxOffSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.MAXOFF){
            return "Off above Max Duty"
        }
        return "On above Max Duty"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={ state.MAXOFF }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        MAXOFF: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.MAXOFF.command, checked)
                }}
            />
            {switchText()}
        </Box>
    )
}