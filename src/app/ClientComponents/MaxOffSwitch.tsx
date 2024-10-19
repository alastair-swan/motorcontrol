"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// MAXOFF
export function MaxOffSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.MAXOFF){
            return "Off above Max Duty"
        }
        return "On above Max Duty"
    }
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingRight: 2}}>
            <Switch 
                checked={ state.MAXOFF }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        MAXOFF: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.MAXOFF.command, checked)
                }}
            />
            {switchText()}
        </Box>
    )
}