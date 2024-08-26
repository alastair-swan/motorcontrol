const i2c = require('i2c-bus')

enum MOTOR0 {
    Address = 0x29,
    Speed0 = 27,
    Speed1 = 28,
}

const MOTOR0_ADDRESS = 0x29
const MOTOR1_ADDRESS = 0x32

export const setSpeed = (speed: number) => {
    const obuff0 = Buffer.from([MOTOR0.Speed0, (speed >> 2)])
    const obuff1 = Buffer.from([MOTOR0.Speed1, ((speed & 3) << 6)])

    const i2c1 = i2c.openSync(1)
    i2c1.i2cWriteSync(MOTOR0.Address, obuff0.length, obuff0)
    i2c1.i2cWriteSync(MOTOR0.Address, obuff1.length, obuff1)
    i2c1.close()

}

