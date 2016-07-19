from pyduino import Arduino

ard = Arduino()
while True:
    act = input("Input an actuator number:")
    pos = input("Input an extension:")
    ard.extension_write(act, pos)