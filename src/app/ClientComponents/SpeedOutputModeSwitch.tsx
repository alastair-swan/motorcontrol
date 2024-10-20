"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// FG_ON
export function SpeedOutputModeSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.FG_ON){
            return "FG stops without speed control command"
        }
        return "FG stops without speed control command"
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
                    UpdateParam(motorNumber, RegisterList.FG_ON.command, checked)
                }}
            />
            { switchText () }
        </Box>
    )
}