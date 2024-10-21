"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { NOSTOP } from "./Register"

// NOSTOP
export function NoStopSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.NOSTOP){
            return "Full Speed below StopDuty"
        }
        return "Off below StopDuty"
    }
    return (                                    
        <Box sx={ frameStyle }>
            <Switch 
                checked={ state.NOSTOP }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        NOSTOP: checked
                    })
                    UpdateParam(motorNumber, NOSTOP, checked)
                }}
            /> 
            {
                switchText()    
            }
        </Box>
    )
}