"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// STBY_MODE
export function StandbyModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        if (!state.STBY_MODE){
            return "Only Stby Pin Controls Standby"
        }
        return "Standby if motor is off"
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={ state.STBY_MODE }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            STBY_MODE: checked
                        })
                        UpdateParam(motorNumber, RegisterList.STBY_MODE.command, checked)
                    }}
                /> 
                {switchText()}
            </Box>
        </Grid2>
    )
}