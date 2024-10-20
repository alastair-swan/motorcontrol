"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// OCP_LVL
export function CurrentSenseGainSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={state.OCP_LVL}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        OCP_LVL: checked
                    })
                    UpdateParam(motorNumber, RegisterList.OCP_LVL.command, checked)
                }}
            />
            Current Sense Gain: {state.OCP_LVL? "10" : "20"}
        </Box>
    )
}