"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'

// FG_ON
export function SpeedOutputModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.FG_ON){
            return "FG stops without speed control command"
        }
        return "FG stops without speed control command"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
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