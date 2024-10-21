"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle, warningStateColor } from "../UIStyle"
import { TSD_MASK } from "./Register"

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
                    UpdateParam(motorNumber, TSD_MASK, checked)
                }}
            />
            Thermal Shutdown { !state.TSD_MASK ? <span style={{color: warningStateColor}}>Disabled</span> : "Enabled" }
        </Box>
    )
}