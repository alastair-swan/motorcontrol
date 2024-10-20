"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

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
                    UpdateParam(motorNumber, RegisterList.ISD_LVL.command, checked)
                }}
            />
            Overcurrent Detection Threshold: { switchText() }
        </Box>
    )
}