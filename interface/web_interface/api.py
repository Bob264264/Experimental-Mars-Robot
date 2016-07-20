from electronics.Adafruit.pyduino import Arduino

class RobotController():
	#def __init__(self):
	#	self.pyduino_obj = Arduino()
	def moveactuator(self, actuatornum, amount):
		self.pyduino_obj.extension_write(actuatornum, amount)
		return True
	def syncActuator(self, actuators, amount):
		for i in actuators: moveactuator(i, amount)
		return True
	def rotatewheel(self, wheelnum, amount):
		pass
	def movearm(self, armnum, amount):
		pass
	def movemass(self, armnum, amount):
		pass