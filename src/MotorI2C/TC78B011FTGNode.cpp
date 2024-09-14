#include "TC78B011FTG.h"
#include <napi.h>

using namespace Napi;

void testGetter(const CallbackInfo &info){
    std::cout << "get test" << std::endl;
}

void testSetter(const CallbackInfo &info){
    std::cout << "set test" << std::endl;
}

Function MotorGetParam(Env env){
    return Function::New(env, testGetter);
}

Function MotorSetParam(Env env){
    return Function::New(env, testSetter);
}