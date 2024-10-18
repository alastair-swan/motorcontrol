import { Motor } from "~/app/MotorUI"
import Box from '@mui/material/Box'
import Grid2 from '@mui/material/Grid2'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#5c67ad] to-[#a7a7cc] text-white">
      <Box padding={2}>
        <Grid2 container spacing={2} columns={1}>
          <Motor motorNumber={0}/>
        </Grid2>
      </Box>
    </main>
  );
}
