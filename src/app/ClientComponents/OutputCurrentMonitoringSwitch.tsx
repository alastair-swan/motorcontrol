"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// OCPDIS
export function OutputCurrentMonitoringSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
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