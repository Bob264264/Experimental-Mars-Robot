import numpy as np
import cv2

cap = cv2.VideoCapture(0)

while True:
	frame = cap.read()
	gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	boundaries = [
		([200, 200, 200], [255, 255, 255])
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
		cv2.imshow("frame", np.hstack([frame, output]))
		if cv2.waitKey(0) & 0xFF == ord('q'):
			break

cap.release()
cv2.destroyAllWindows()