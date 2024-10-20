"use client"

import { switchComponentProps, RegisterList } from "."
import { UpdateParam } from "../MotorControl"
import { Box, Switch } from '@mui/material'
import { componentStyle } from "../UIStyle"

// SPDINV
export function SpeedInputInversionSwitch ({ motorNumber, state, setState, frameStyle = componentStyle }: switchComponentProps){
    const switchText = () => { return state.SPDINV ? "Inverted" : "Normal"}
    return (
        <Box sx={ frameStyle }>
            <Switch  
                checked={ state.SPDINV }
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                    setState({
                        ...state,
                        SPDINV: checked
                    })  
                    UpdateParam(motorNumber, RegisterList.SPDINV.command, checked)
                }}
            />
            Analog Speed Control { switchText() }
        </Box>
    )
}