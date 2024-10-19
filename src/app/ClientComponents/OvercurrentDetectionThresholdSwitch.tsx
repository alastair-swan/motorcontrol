"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// ISD_LVL
export function OvercurrentDetectionThresholdSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => { return state.ISD_LVL ? "0.5V" : "1.0V" }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
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