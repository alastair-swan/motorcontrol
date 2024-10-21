"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { FG_ON } from "./Register"

// FG_ON
export function SpeedOutputModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.FG_ON){
            return "FG stops without speed control command"
        }
        return "FG continues without speed control command"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.FG_ON }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        FG_ON: checked
                    })  
                    UpdateParam(motorNumber, FG_ON, checked)
                }}
            />
            { switchText () }
        </Box>
    )
}