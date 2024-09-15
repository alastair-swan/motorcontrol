#include "TC78B011FTG.h"
#include <napi.h>

using namespace Napi;

TC78B011FTG motors[] = {TC78B011FTG(1, 0x29), TC78B011FTG(1, 0x32)};

Number testGetter(const CallbackInfo &info){
    std::cout << "get test" << std::endl;
    return Number::New(info.Env(), (double)100);
}

void setNostop(const CallbackInfo &info){}
void setStopDuty(const CallbackInfo &info){}
void setStartDuty(const CallbackInfo &info){}
void setChangeDuty(const CallbackInfo &info){}
void setMaxDuty(const CallbackInfo &info){}
void setStartRPM(const CallbackInfo &info){}
void setMaxDutyHysteresis(const CallbackInfo &info){}
void setSpeedSlope(const CallbackInfo &info){}
void setMaxOpen(const CallbackInfo &info){}
void setMaxOff(const CallbackInfo &info){}
void setSpeedSlope2(const CallbackInfo &info){}
void setChargePumpVCP(const CallbackInfo &info){}
void setOpenLoop(const CallbackInfo &info){}
void setPID(const CallbackInfo &info){}
void setStandbyMode(const CallbackInfo &info){}
void setDirection(const CallbackInfo &info){}
void setPoles(const CallbackInfo &info){}
void setMaxSpeed(const CallbackInfo &info){}
void setSpeedOutputMode(const CallbackInfo &info){}
void setSpeedInversion(const CallbackInfo &info){}
void setAutoRecoveryMode(const CallbackInfo &info){}
void setDigitalFiltering(const CallbackInfo &info){}
void setForcedComutationProtection(const CallbackInfo &info){}
void setDutyChangeLimit(const CallbackInfo &info){}
void setStartCurrentLimit(const CallbackInfo &info){}
void setOCPDisable(const CallbackInfo &info){}
void setSoftStartRange(const CallbackInfo &info){}
void setSoftStartStepSize(const CallbackInfo &info){}
void setSoftStartDutyChangeLimit(const CallbackInfo &info){}
void setDutyUpTime(const CallbackInfo &info){}
void setRPMChangeLimit(const CallbackInfo &info){}
void setBrakeInverted(const CallbackInfo &info){}
void setOvercurrentProtectionDisabled(const CallbackInfo &info){}
void setRSAPinFiltering(const CallbackInfo &info){}
void setAutoDeadTimeControlDisabled(const CallbackInfo &info){}
void setBrakeTime(const CallbackInfo &info){}
void setBrakeMode(const CallbackInfo &info){}
void setBrakeReleaseMode(const CallbackInfo &info){}
void setErrorBrakingMode(const CallbackInfo &info){}
void setAlertInverted(const CallbackInfo &info){}
void setThermalShutdownDisable(const CallbackInfo &info){}
void setAutoRestartWaitTime(const CallbackInfo &info){}
void setFirstDCExcitationTime(const CallbackInfo &info){}
void setLeadAngle(const CallbackInfo &info){}
void setMaxRPM(const CallbackInfo &info){}
void setForcedComutationFrequency(const CallbackInfo &info){}
void setOutputPWMFrequencyMode(const CallbackInfo &info){}
void setDeadTime(const CallbackInfo &info){}
void setOvercurrentDetectionThreshold(const CallbackInfo &info){}
void setOvercurrentProtectionGain(const CallbackInfo &info){}
void setGateSourceCurrent(const CallbackInfo &info){}
void setGateSinkCurrent(const CallbackInfo &info){}
void setIdleModeHysteresisVoltage(const CallbackInfo &info){}
void setSpeed(const CallbackInfo &info){}
void testSetter(const CallbackInfo &info){
    std::string data = info[0].As<String>().Utf8Value();
    std::string data2 = info[1].As<String>().Utf8Value();
    std::cout << data << std::endl;
    std::cout << data2 << std::endl;
}

Function MotorGetParam(Env env){
    return Function::New(env, testGetter);
}

Function MotorSetParam(Env env){
    return Function::New(env, testSetter);
}
