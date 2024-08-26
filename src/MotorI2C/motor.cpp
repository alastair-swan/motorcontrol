#include "motor.h"

int i2cBus;
int i2cBusNumber = 1;

uint8_t ioreg = 86;
uint8_t processreg = 87;

char* numToBin(uint8_t num){
    char* bin = new char[8];
    bin[0] = ((num & 128) > 0) ? '1' : '0';
    bin[1] = ((num & 64) > 0) ? '1' : '0';
    bin[2] = ((num & 32) > 0) ? '1' : '0';
    bin[3] = ((num & 16) > 0) ? '1' : '0';
    bin[4] = ((num & 8) > 0) ? '1' : '0';
    bin[5] = ((num & 4) > 0) ? '1' : '0';
    bin[6] = ((num & 2) > 0) ? '1' : '0';
    bin[7] = ((num & 1) > 0) ? '1' : '0';
    return bin;
}

int TC788011FTG::i2cWrite(int address, int reg, uint8_t data){
    char filename[20];
    
    sprintf(filename,"/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return 1;

    if (ioctl(i2cBus,I2C_SLAVE,address) < 0)
        return 2;
    
    uint8_t databuffer[2];
    databuffer[0] = (uint8_t)(reg & 255);
    databuffer[1] = data;

    if (write(i2cBus, databuffer, 2) != 2){
        std::cout << errno << std::endl;
        return 3;
    }

    return 0;
}

int TC788011FTG::i2cRead(int address, int reg){
    char filename[20];
    
    sprintf(filename,"/dev/i2c-%d", i2cBusNumber);
    if ((i2cBus = open(filename, O_RDWR)) < 0)
        return -1;

    if (ioctl(i2cBus,I2C_SLAVE,address) < 0)
        return -2;

    uint8_t outbuf[] = {(uint8_t)reg};
    if (write(i2cBus, outbuf, 1) != 1){
        std::cout << errno << std::endl;
        return 3;
    }

    uint8_t buf[20];
    if (read(i2cBus, buf, 1) != 1) {
        return -3;
    } else {
        return buf[0];
    }
}
 int TC788011FTG::setup(int i2cAddress){
    //i2cWrite(i2cAddress, ioreg, 1);
    //i2cWrite(i2cAddress, processreg, 1);
    //while (i2cRead(i2cAddress, processreg) != 0){}
    i2cWrite(i2cAddress, 2,     (uint8_t)(0xFF & (((NOSTOP & 0x01) << 7) & (STOPDUTY & 0x7F))));
    i2cWrite(i2cAddress, 3,     (uint8_t)(0xFF & STARTDUTY));
    i2cWrite(i2cAddress, 4,     (uint8_t)(0xFF & CHANGEDUTY));
    i2cWrite(i2cAddress, 5,     (uint8_t)(0xFF & MAXDUTY));
    i2cWrite(i2cAddress, 6,     (uint8_t)(0xFF & (STARTRPM >> 4)));
    i2cWrite(i2cAddress, 7,     (uint8_t)(0xFF & (((STARTRPM & 0x0F) << 4) & (0x0F & MAXDUTYHYS))));
    i2cWrite(i2cAddress, 8,     (uint8_t)(0xFF & (SPEEDSLOP >> 6)));
    i2cWrite(i2cAddress, 9,     (uint8_t)(0xFF & ((SPEEDSLOP & 0x3F) << 2) & ((MAXOPEN & 0x01) << 1) & (MAXOFF & 0x01)));
    i2cWrite(i2cAddress, 10,    (uint8_t)(0xFF & (SPEEDSLOP2 >> 6)));
    i2cWrite(i2cAddress, 11,    (uint8_t)(0xFF & ((SPEEDSLOP2 & 0x3F) << 2) & ((VCP_MASK & 0x01) << 1) & (OPENLOOP & 0x01)));
    i2cWrite(i2cAddress, 12,    (uint8_t)(0xFF & (((KIX & 0x01) << 7) & (KI & 0x7F))));
    i2cWrite(i2cAddress, 13,    (uint8_t)(0xFF & (((KPX & 0x01) << 7) & (KP & 0x7F))));
    i2cWrite(i2cAddress, 14,    (uint8_t)(0xFF & (((STBY_MODE & 0x01) << 7) & ((DIR & 0x01) << 6) & ((POLEPAIR & 0x07) << 3) & ((MAXSPEED & 0x03) << 1) & (FG_ON & 0x01))));
    i2cWrite(i2cAddress, 15,    (uint8_t)(0xFF & (((FGSEL & 0x07) << 5) & ((TSPSEL & 0x01) << 4) & ((SPDINV & 0x01) << 3) & ((LATCH & 0x01) << 2) & (OCPMASK & 0x03))));
    i2cWrite(i2cAddress, 16,    (uint8_t)(0xFF & (((LOCKDIS & 0x01) << 7) & ((DUTYCHGLIMIT & 0x07) << 4) & ((STARTCURRENT & 0x07) << 1) & (OCPDIS & 0x01))));
    i2cWrite(i2cAddress, 17,    (uint8_t)(0xFF & (((SS_ADD_SEL & 0x03) << 6) && ((SS_UP_SEL & 0x03) << 4) & ((SS_DUTYCHGLIMIT & 0x07) << 1) & (DUTY_UP_TIME & 0x01))));
    i2cWrite(i2cAddress, 18,    (uint8_t)(0xFF & (((RPMLIMIT & 0x07) << 5) & ((BRK_INV & 0x01) << 4) & ((ISD_MASK & 0x01) << 3) & ((RS_SEL & 0x03) << 1) & (ANTITHROUGH & 0x01))));
    i2cWrite(i2cAddress, 19,    (uint8_t)(0xFF & (((WAIT_TIME & 0x07) << 5) & ((WAIT_MODE & 0x01) << 4) & ((WAIT_CON & 0x01) << 3) & ((LOCK_BRK & 0x01) << 2) & ((ALERT_INV & 0x01) << 1) & (TDS_MASK & 0x01))));
    i2cWrite(i2cAddress, 20,    (uint8_t)(0xFF & (((TRE & 0x07) << 5) & ((PRE_TIP & 0x03) << 3) & (TIP & 0x07))));
    i2cWrite(i2cAddress, 21,    (uint8_t)(0xFF & (((LA & 0x0F) << 4) & ((FMAX & 0x03) << 2) & (FST & 0x03))));
    i2cWrite(i2cAddress, 22,    (uint8_t)(0xFF & (((FPWM & 0x07) << 2) & (DEADTIME & 0x03))));
    i2cWrite(i2cAddress, 23,    (uint8_t)(0xFF & (((ISD_LVL & 0x01) << 7) & ((OCP_LVL & 0x01) << 6) & ((SOURCE & 0x07) << 3) & (SINK & 0x07))));
    i2cWrite(i2cAddress, 24,    (uint8_t)(0xFF & (((COMP_HYS & 0x03) << 6))));
    //i2cWrite(i2cAddress, processreg, 1);
    //while (i2cRead(i2cAddress, processreg) != 0){}
    return 0;
 }

int motorSetup(){
    uint8_t i2cAddress = 0x29;

    //setup(i2cAddress);
    float speed = 0.0f;

    uint8_t speedreg1 = 27;
    uint8_t speedreg2 = 28;
    uint8_t speedval1 = (uint8_t)(((int)(1023 * speed)) >> 2);
    uint8_t speedval2 = (uint8_t)(((int)(1023 * speed)) << 6);
    //std::cout << (int)speedval1 << std::endl;
    //std::cout << (int)speedval2 << std::endl;

    i2cWrite(i2cAddress, speedreg1, speedval1);
    i2cWrite(i2cAddress, speedreg2, speedval2);
    //i2cWrite(i2cAddress, 5, 127);
    //i2cWrite(i2cAddress, 20, 0x2A);
    //i2cWrite(i2cAddress, 15, 0b00000000);
    //i2cWrite(i2cAddress, 16, 0b00101000);
    //i2cWrite(i2cAddress, 17, 0b00000010);
    //i2cWrite(i2cAddress, 11, 0x01);
    //i2cWrite(i2cAddress, processreg, 1);
    //while (i2cRead(i2cAddress, processreg) != 0){}
    
    //i2cWrite(i2cAddress, ioreg, 0);
    //i2cWrite(i2cAddress, processreg, 1);
    while (i2cRead(i2cAddress, processreg) != 0){}
    for (int i = 0; i <= 30; i++){
        int result = i2cRead(i2cAddress, i);
        char* bin = numToBin(result);
        std::cout << ((i < 10) ? " " : "") << i << ": " << bin << std::endl;
        delete(bin);
    }

    return 0;
}

int main (int argc, char* argv[]){
    std::cout << motorSetup() << std::endl;
    return 0;
}
