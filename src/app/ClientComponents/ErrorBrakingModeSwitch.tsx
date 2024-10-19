"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// LOCK_BRK
export function ErrorBrakingModeSwitch ({ motorNumber, itembgColor, itembgHoverColor , state, setState}: switchComponentProps){
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch  
                checked={state.LOCK_BRK}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        LOCK_BRK: checked
                    })   
                    UpdateParam(motorNumber, RegisterList.LOCK_BRK.command, checked)
                }}
            /> 
            Error Braking Mode
        </Box>
    )
}