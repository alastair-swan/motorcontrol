"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.NOSTOP.command, checked)
                }}
            /> 
            {
                switchText()    
            }
        </Box>
    )
}