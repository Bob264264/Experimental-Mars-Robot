"""
A library to interface Arduino through serial connection
"""
import serial

class Arduino():
    """
    Models an Arduino connection
    """

    def __init__(self, serial_port='COM8'):
        self.conn = serial.Serial(serial_port, 9600, timeout=.1)

    #Extends an actuator
    def extensionWrite(self, pin_number, analog_value):
        command = (''.join(('E', str(pin_number), ':',
                            str(analog_value)))).encode()
        self.conn.write(command)

    #Extends a group of actuators
    def extensionSync(self, pin_numbers, analog_value):
        for i in pin_numbers:
            self.extensionWrite(i, analog_value)

    #Rotates a stepper motor
    def rotateStepper(self, pin_number, analog_value):
        command = (''.join(('R', str(pin_number), ':',
                            str(analog_value)))).encode()
        self.conn.write(command)

    #Rotates a group of stepper motors
    def rotateSync(self, pin_numbers, analog_value):
        for i in pin_numbers:
            self.rotateStepper(i, analog_value)

    def moveArm(self, pin_number, analog_value):
        command = (''.join(('M', str(pin_number), ':',
                            str(analog_value)))).encode()
        self.conn.write(command)
    #Closes connection to Arduino
    def close(self):
        self.conn.close()
        print 'Connection to Arduino closed'
