"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// TSD_MASK
export function ThermalShutdownInhibitSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
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
    )
}