"use client"

import { useEffect, useState } from "react"
import { switchComponentProps, RegisterList } from "."
import { GetParam, UpdateParam } from "../MotorControl"
import { Grid2, Box, Switch } from '@mui/material'

// TSD_MASK
export function ThermalShutdownInhibitSwitch ({ motorNumber, itembgColor, itembgHoverColor, state, setState }: switchComponentProps){
    return (
        <Grid2 sx={{ width: '100%' }}>
            <Box sx={{ justifyItems: 'center', justifyContent: 'center', height: '100%', bgcolor: itembgColor, '&:hover': { bgcolor: itembgHoverColor }, borderRadius: 2, borderWidth: 0, paddingTop: 1, paddingRight: 2}}>
                <Switch  
                    checked={state.TSD_MASK}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                        setState({
                            ...state,
                            TSD_MASK: checked
                        })  
                        UpdateParam(motorNumber, RegisterList.TSD_MASK.command, checked)
                    }}
                />
                Thermal Shutdown { !state.TSD_MASK ? "Disabled" : "Enabled" }
            </Box>
        </Grid2>
    )
}