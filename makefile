# g++ -Wall hello-world.cpp -o hello-world -llgpio -lstdc++

#compiler
CC = g++

#compiler flags
CFLAGS = -Wall -g -Wpedantic

#Build directory
BLD = build/debug

#source directory
SRC = src/MotorI2C

#libraries
LIBS = 

#Target
TARGET = motor
SOURCE = TC78B011FTG

all: $(TARGET)
	@mkdir -p $(BLD)
	$(CC) $(CFLAGS) -o $(BLD)/$(TARGET) $(SRC)/$(SOURCE).cpp $(LIBS)

$(TARGET): $(SRC)/$(SOURCE).cpp
	@mkdir -p $(BLD)
	$(CC) $(CFLAGS) -o $(BLD)/$(TARGET) $(SRC)/$(SOURCE).cpp $(LIBS)

clean:
	$(RM) $(BLD)/$(TARGET)