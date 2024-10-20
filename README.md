# Web Interface for controlling TC78B011FTG via i2c

Provides a web interface for controlling a motor that uses a TC78B011FTG controller connected via i2c.

## Web Interface

Built using React and Next.js App Router to allow for control of all motor parameters

## Server

Built using React and Next.js App Router for the backend with c++ libraries handeling the communication to the chip using the i2c interface on a raspberry pi.

## C++ API

Located in /src/MotorI2C
On should work on any linux system provided that the i2c bus is accessable and that the correct bus is selected.
