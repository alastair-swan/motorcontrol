"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// WAIT_MODE
export function BrakingModeSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState}: switchComponentProps){
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch  
                checked={state.WAIT_MODE}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        WAIT_MODE: checked
                    })
                    UpdateParam(motorNumber, RegisterList.WAIT_MODE.command, checked)
                }}
            />
            Brake Mode
        </Box>
    )
}