"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// MAXOPEN
export function MaxOpenSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.MAXOPEN){
            return "Speed Capped at Max Duty"
        }
        return "Extrapolate Past Max Duty"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
            <Switch 
                checked={ state.MAXOPEN }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        MAXOPEN: checked
                    })          
                    UpdateParam(motorNumber, RegisterList.MAXOPEN.command, checked)
                }}
            /> 
            { switchText() }
        </Box>
    )
}