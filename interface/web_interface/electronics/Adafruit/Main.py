from pyduino import Arduino

ard = Arduino()
while True:
    act = input("Input an actuator number:")
    pos = input("Input an extension:")
    ard.extensionWrite(act, pos)
    #ard.rotateStepper(act, pos)