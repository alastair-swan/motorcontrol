"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// WAIT_CON
export function PostBrakingActionSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    const switchText = () => {
        return state.WAIT_CON ? "Startup" : ("Idle for " + state.WAIT_TIME + " seconds")
    }
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={ state.WAIT_CON }
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            WAIT_CON: checked
                        })  
                        UpdateParam(motorNumber, RegisterList.WAIT_CON.command, checked)
                    }}
                /> 
                Post Braking Action: { switchText() }
            </Box>
        </Grid2>
    )
}