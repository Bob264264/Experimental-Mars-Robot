import numpy as np
import cv2

cap = cv2.VideoCapture(0)

while True:
	ret, frame = cap.read()
	boundaries = [
		([220, 220, 220], [255, 255, 255])
	]

	# loop over the boundaries
	for (lower, upper) in boundaries:
		# create NumPy arrays from the boundaries
		lower = np.array(lower, dtype = "uint8")
		upper = np.array(upper, dtype = "uint8")

		# find the colors within the specified boundaries and apply
		# the mask
		mask = cv2.inRange(frame, lower, upper)
		output = cv2.bitwise_and(frame, frame, mask = mask)

		# show the images
		cv2.namedWindow("Camera", cv2.WINDOW_NORMAL)
		cv2.resizeWindow("Camera", 1000, 1000)
		cv2.imshow("Camera", output)
		if cv2.waitKey(1) == 27:
			cap.release()
			cv2.destroyAllWindows()
