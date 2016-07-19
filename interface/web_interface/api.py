from electronics.Adafruit.pyduino import Arduino

class RobotController():
	def __init__(self):
		self.pyduino_obj = Arduino()
	def moveactuator(actuatornum, amount):
		self.pyduino_obj.extension_write(actuatornum, amount)
		return True
	def rotatewheel(wheelnum, amount):
		pass
	def movearm(armnum, amount):
		pass
	def movemass(armnum, amount):
		pass