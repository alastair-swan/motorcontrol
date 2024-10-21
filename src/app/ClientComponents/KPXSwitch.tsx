"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { KPX } from "./Register"

// KPX
export function KPXSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (state.KPX){
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
                    UpdateParam(motorNumber, KPX, checked)
                }}
            />
            I coefficient {switchText()} 
        </Box>
    )
}