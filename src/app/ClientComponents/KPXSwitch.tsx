"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// KPX
export function KPXSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.KPX){
            return "x8"
        }
        return "x1"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={ state.KPX }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        KPX: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.KPX.command, checked)
                }}
            />
            I coefficient {switchText()} 
        </Box>
    )
}