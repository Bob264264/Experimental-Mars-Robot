/*
 * Sketch to control the pins of Arduino via serial interface
 *
 * Commands implemented with examples:
 *
 * - E10:120 -> Extends actuator number 10 to 120mm
 * 
 * - R1:100  -> Rotates stepper motor number 1 by 100 steps
 * 
 */

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include <Adafruit_MotorShield.h>

const int ADANUM = 2;     //number of Adafruit boards
const int SHINUM = 2;     //number of Motor shields
const int STEPSPEED = 10; //stepper motor speed set

Adafruit_PWMServoDriver ada[ADANUM] = {Adafruit_PWMServoDriver(0x40), Adafruit_PWMServoDriver(0x41)};
Adafruit_MotorShield shield[SHINUM] = {Adafruit_MotorShield(0x60), Adafruit_MotorShield(0x61)};
//4 Stepper Motors | 2 Motor Shields
Adafruit_StepperMotor *motors[SHINUM * 2] = {};


char mode; //Holds mode (E for extend actuator, R for rotate stepper motor)
int pin_number; // Holds the pin number
float value_to_write; // Holds the value that we want to write

int getAct(int num){ // 1 < num < 24
  //Convert pin number to adafruit port#
  //Front Left Wheel: 1   (1-6)   (Board 1: 0-5)
  //Front Right Wheel: 2  (7-12)  (Board 1: 6-11)
  //Back Left Wheel: 3    (13-18) (Board 2: 0-5)
  //Back Right Wheel: 4   (19-24) (Board 2: 6-11)
  return (num - 1)% 12;
}

void setup() {
    Serial.begin(9600); // Serial Port at 9600 baud
    Serial.setTimeout(100); // Instead of the default 1000ms, in order
                            // to speed up the Serial.parseInt() 
    for (int i = 0; i < ADANUM; i++){
      ada[i].begin();
      ada[i].setPWMFreq(60);
    }
    for (int i = 0; i < SHINUM*2; i++){
      motors[i] = shield[i/2].getStepper(200, (i%2) + 1);
    }
    for (int i = 0; i < SHINUM; i++){
      shield[i].begin();
      motors[i*2]->setSpeed(STEPSPEED);
      motors[(i*2)+1]->setSpeed(STEPSPEED);
    }
    yield();
}

void loop() {
    // Check if characters available in the buffer
    if (Serial.available() > 0) {
        mode = Serial.read();
        pin_number = Serial.parseInt(); // Waits for an int to be transmitted
        if (Serial.read()==':'){
            value_to_write = Serial.parseInt(); // Collects the value to be written
        }
        switch (mode){
            case 'E': //Extend actuator
                ada[pin_number / 12].setPWM(getAct(pin_number), 0, map(value_to_write, 0, 140, 235, 475));
                break;
            case 'R': //Rotate stepper motor
                motors[pin_number-1]->step(value_to_write, FORWARD, DOUBLE);
                break;
          //Can add more stuff
            default:
                break;
        }
    }
}
