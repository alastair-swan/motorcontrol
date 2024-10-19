"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// OCPDIS
export function OutputCurrentMonitoringSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    return (
        <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
            <Switch  
                checked={ state.OCPDIS }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OCPDIS: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.OCPDIS.command, checked)
                }}
            />
            Monitor Current
        </Box>
    )
}