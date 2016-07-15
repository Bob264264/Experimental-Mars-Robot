from pyduino import Arduino
import time

ard = Arduino()
while True:
    pos = input("Input an extension:")
    ard.extension_write(7, pos)