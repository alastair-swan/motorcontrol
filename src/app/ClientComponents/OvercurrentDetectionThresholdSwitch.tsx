"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { ISD_LVL } from "./Register"

// ISD_LVL
export function OvercurrentDetectionThresholdSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => { return state.ISD_LVL ? "0.5V" : "1.0V" }
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.ISD_LVL }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        ISD_LVL: checked
                    })  
                    UpdateParam(motorNumber, ISD_LVL, checked)
                }}
            />
            Overcurrent Detection Threshold: { switchText() }
        </Box>
    )
}