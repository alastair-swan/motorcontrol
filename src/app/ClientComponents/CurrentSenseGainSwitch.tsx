"use client"

import { switchComponentProps } from "."
import { UpdateParam } from "../MotorControlClient"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"
import { OCP_LVL } from "./Register"

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
                    UpdateParam(motorNumber, OCP_LVL, checked)
                }}
            />
            Current Sense Gain: {state.OCP_LVL? "10x" : "20x"}
        </Box>
    )
}