/*
 * Sketch to control the pins of Arduino via serial interface
 *
 * Commands implemented with examples:
 *
 * - WE10:120 -> Extends actuator at pin 10 to 120mm
 */

#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver ada1 = Adafruit_PWMServoDriver(0x40);
Adafruit_PWMServoDriver ada2 = Adafruit_PWMServoDriver(0x41);

int pin_number; // Holds the pin number
int digital_value; // Holds the digital value
float analog_value; // Holds the analog value
float value_to_write; // Holds the value that we want to write
int wait_for_transmission = 5; // Delay in ms in order to receive the serial data

int getAct(int num){ // 1 < num < 24
  //Insert pin number to adafruit port#
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
    ada1.begin();
    ada1.setPWMFreq(60);
    yield();
}

void loop() {
    // Check if characters available in the buffer
    if (Serial.available() > 0) {
        pin_number = Serial.parseInt(); // Waits for an int to be transmitted
        if (Serial.read()==':'){
            value_to_write = Serial.parseInt(); // Collects the value to be written
        }
        if (pin_number < 13){
            ada1.setPWM(getAct(pin_number), 0, map(value_to_write, 0, 140, 235, 475));
        } else if (pin_number < 25){
            ada2.setPWM(getAct(pin_number), 0, map(value_to_write, 0, 140, 235, 475));
        } 
    }
}
