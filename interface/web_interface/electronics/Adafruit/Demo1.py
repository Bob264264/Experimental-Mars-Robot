from pyduino import Arduino
from time import sleep

ard = Arduino()

ard.extensionSync((2,4,6), 0)
ard.extensionSync((1,3,5), 100)
sleep(10)
ard.extensionSync((1,3,5), 0)
ard.extensionSync((2,4,6), 100)
sleep(10)
ard.extensionSync((2,4,6), 0)