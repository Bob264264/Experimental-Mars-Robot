#include <Servo.h> 

Servo act;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  act.attach(10);
}

void loop() {
  // put your main code here, to run repeatedly:
  //45 = retract fully
  //135 = extend fully
  int pos;

  if (Serial.available() > 0){
    pos = Serial.parseInt();
    Serial.print("Extending to ");
    Serial.print(pos);
    Serial.println("mm");
    act.write(map(pos, 0, 140, 45, 135));
  }
}
