import * as React from 'react';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid2";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
function ChargePumpState(){
    return (
        "Good"
    )
}
function TemperatureState(){
    return (
        "Good"
    )
}

function CurrentState(){
    return (
        "Good"
    )
}

function RotationState(){
    return (
        "Good"
    )
}

function StartupState(){
    return (
        "Good"
    )
}

function ErrorState(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={4}>Charge Pump:</Grid>
                <Grid size={3}><ChargePumpState /></Grid>
                <Grid size={5}><Checkbox />Disable Error Tracking</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}><Box>Temperature: </Box></Grid>
                <Grid size={3}><TemperatureState /></Grid>
                <Grid size={5}><Checkbox />Disable Error Tracking</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}><Box>Current: </Box></Grid>
                <Grid size={3}><CurrentState /></Grid>
                <Grid size={5}><Checkbox />Disable Error Tracking</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}><Box>Rotation: </Box></Grid>
                <Grid size={3}><RotationState /></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}><Box>Startup: </Box></Grid>
                <Grid size={3}><StartupState /></Grid>
            </Grid>
        </Box>
    )
}

function DutyControl(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={4}>NoStop: </Grid>
                <Grid size={3}><Checkbox />Enabled</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Stop Duty</Grid>
                <Grid size={8}>
                    <Slider
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={127}
                    />
                </Grid>
                <Grid size={5}><output id="stopdutyvalue"></output></Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Start Duty</Grid>
                <Grid size={8}>
                    <Slider
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={255}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Change Duty</Grid>
                <Grid size={8}>
                    <Slider
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={255}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Max Duty</Grid>
                <Grid size={8}>
                    <Slider
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={255}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

function SpeedControl(){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={4}>Start RPM</Grid>
                <Grid size={8}>
                    <Slider 
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={4095}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Max Duty Hysteresis</Grid>
                <Grid size={8}>
                    <Slider
                        step={1}
                        valueLabelDisplay="auto"
                        marks
                        min={0}
                        max={15}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Speed Slope</Grid>
                <Grid size={8}>
                    <Slider 
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={16383}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Speed Slope 2</Grid>
                <Grid size={8}>
                    <Slider 
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={16383}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Max Open</Grid>
                <Grid size={3}><Checkbox />Enabled</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Max Off</Grid>
                <Grid size={3}><Checkbox />Enabled</Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={4}>Open Loop Control</Grid>
                <Grid size={3}><Checkbox />Forced</Grid>
            </Grid>
        </Box>
    )
}

function PID (){
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={4}>KI</Grid>
                <Grid size={3}><Checkbox />8x</Grid>
                <Grid size={5}><Slider
                        step={1}
                        valueLabelDisplay="auto"
                        min={0}
                        max={127}
                    />
                </Grid>
            </Grid>
        <Grid container spacing={2}>
            <Grid size={4}>KP</Grid>
            <Grid size={3}><Checkbox />8x</Grid>
            <Grid size={5}><Slider
                    step={1}
                    valueLabelDisplay="auto"
                    min={0}
                    max={127}
                />
            </Grid>
        </Grid>
        </Box>
    )
}

export function Motor (){
    return (
        <div>
            <ErrorState />
            <br/>
            <DutyControl />
            <br/>
            <SpeedControl />
            <br/>
            <PID />
        </div>
    )
}