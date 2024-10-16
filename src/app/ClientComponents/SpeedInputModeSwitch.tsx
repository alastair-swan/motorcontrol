"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// TSPSEL
export function SpeedInputModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => { return state.TSPSEL ? "PWM Duty" : "Analog Voltage" }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={ state.TSPSEL }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            TSPSEL: checked
                        })
                        UpdateParam(motorNumber, RegisterList.TSPSEL.command, checked)
                    }}
                />
                Analog speed control mode: { switchText() }
            </Box>
        </Grid2>
    )
}
