import Motor from "./MotorUI"
import Box from '@mui/material/Box'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-top bg-gradient-to-b from-[#5c67ad] to-[#a7a7cc] text-white">
      <Box padding={2}>
          <Motor motorNumber={0}/>
      </Box>
    </main>
  );
}
