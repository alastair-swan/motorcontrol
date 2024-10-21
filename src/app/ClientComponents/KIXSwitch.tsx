"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { KIX } from "./Register"

// KIX
export function KIXSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => {
        if (!state.KIX){
            return "x8"
        }
        return "x1"
    }
    return (
        <Box sx={ frameStyle }>
            <Switch 
                checked={state.KIX}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        KIX: checked
                    })  
                    UpdateParam(motorNumber, KIX, checked)
                }}
            />
            I coefficient {switchText()} 
        </Box>
    )
}