from Tkinter import *
import sys

master = Tk()
label = Label(master, text = "Wheel Number")
label.pack()
wheel = Entry(master, bd = 10)
wheel.pack()
label = Label(master, text = "Actuator Letter")
label.pack()
actuator = Entry(master, bd = 10)
actuator.pack()
label = Label(master, text = "Distance")
label.pack()
distance = Entry(master, bd = 10)
distance.pack()


def receive():
    wh = wheel.get()
    act = actuator.get()
    dist = distance.get()
    if(wh == "Exit"):
        sys.exit()
    else:
        print("Wheel " + wh + ", Actuator " + act + ", Distance of " + dist + " mm.")


button = Button(master, text = "Send Command", command = receive)
button.pack()

master.mainloop()
