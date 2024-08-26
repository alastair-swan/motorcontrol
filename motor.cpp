#include <linux/i2c-dev.h>
#include <cstdlib>
#include <fcntl.h>
#include <unistd.h>
#include <stdint.h>
#include <stdio.h>
#include <sys/ioctl.h>
#include <ostream>
#include <iostream>

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

int i2cWrite(int address, int reg, uint8_t data){
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

int i2cRead(int address, int reg){
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
 int setup(int i2cAddress){

    int NOSTOP = 0;         // register 2[7]            // 0: disable, 1: enable
    int STOPDUTY = 13;      // register 2[6:0]          // STOPDUTY * 2 / 512
    int STARTDUTY = 77;     // register 3[7:0]          // STARTDUTY / 512
    int CHANGEDUTY = 120;   // register 4[7:0]          // CHANGEDUTY * 2 / 512
    int MAXDUTY = 180;      // register 5[7:0]          // (MAXDUTY + 257) / 512
    int STARTRPM = 857;     // register 6[7:0]7[7:4]
    int MAXDUTYHYS = 3;     // register 7[3:0]
    int SPEEDSLOP = 815;    // register 8[7:0]9[7:2]
    int MAXOPEN = 0;        // register 9[1]
    int MAXOFF = 0;         // register 9[0]
    int SPEEDSLOP2 = 1795;  // register 10[7:0]11[7:2]
    int VCP_MASK = 0;       // register 11[1]
    int OPENLOOP = 1;       // register 11[0]
    int KIX = 0;            // register 12[7]
    int KI = 40;            // register 12[6:0]
    int KPX = 0;            // register 13[7]
    int KP = 30;            // register 13[6:0]
    int STBY_MODE = 0;      // register 14[7]
    int DIR = 0;            // register 14[6]
    int POLEPAIR = 1;       // register 14[5:3]
    int MAXSPEED = 0;       // register 14[2:1]
    int FG_ON = 0;          // register 14[0]
    int FGSEL = 0;          // register 15[7:5]
    int TSPSEL = 0;         // register 15[4]
    int SPDINV = 0;         // register 15[3]
    int LATCH = 0;          // register 15[2]
    int OCPMASK = 0;        // register 15[1:0]
    int LOCKDIS = 0;        // register 16[7]
    int DUTYCHGLIMIT = 3;   // register 16[6:4]
    int STARTCURRENT = 2;   // register 16[3:1]
    int OCPDIS = 0;         // register 16[0]
    int SS_ADD_SEL = 1;     // register 17[7:6]
    int SS_UP_SEL = 1;      // register 17[5:4]
    int SS_DUTYCHGLIMIT = 2;// register 17[3:1]
    int DUTY_UP_TIME = 0;   // register 17[0]
    int RPMLIMIT = 2;       // register 18[7:5]
    int BRK_INV = 0;        // register 18[4]
    int ISD_MASK = 0;       // register 18[3]
    int RS_SEL = 0;         // register 18[2:1]
    int ANTITHROUGH = 0;    // register 18[0]
    int WAIT_TIME = 2;      // register 19[7:5]
    int WAIT_MODE = 0;      // register 19[4]
    int WAIT_CON = 0;       // register 19[3]
    int LOCK_BRK = 0;       // register 19[2]
    int ALERT_INV = 1;      // register 19[1]
    int TDS_MASK = 0;       // register 19[0]
    int TRE = 1;            // register 20[7:5]
    int PRE_TIP = 2;        // register 20[4:3]
    int TIP = 3;            // register 20[2:0]
    int LA = 1;             // register 21[7:4]
    int FMAX = 0;           // register 21[3:2]
    int FST = 0;            // register 21[1:0]
    int FPWM = 0;           // register 22[4:2]
    int DEADTIME = 1;       // register 22[1:0]
    int ISD_LVL = 1;        // register 23[7]
    int OCP_LVL = 1;        // register 23[6]
    int SOURCE = 0;         // register 23[5:3]
    int SINK = 0;           // register 23[2:0]
    int COMP_HYS = 1;       // register 24[7:6]


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
