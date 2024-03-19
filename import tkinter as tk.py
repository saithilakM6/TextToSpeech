import tkinter as tk
from tkinter import ttk
from tkinter import messagebox
from gtts import gTTS
from pydub import AudioSegment
import os

def speak_text():
    text = text_entry.get("1.0", "end-1c")  # Get text from the Text widget
    if text:
        try:
            # Specify the absolute path for the output file
            output_directory = "C:/Users/saith/Documents/TTS"
            output_path = os.path.join(output_directory, "output.mp3")

            tts = gTTS(text)
            tts.save(output_path)
            audio = AudioSegment.from_mp3(output_path)
            audio.export(os.path.join(output_directory, "output.wav"), format="wav")

            # Specify the absolute path to the VLC executable on your system
            vlc_path = "C:/Program Files/VideoLAN/VLC/vlc.exe"
            os.system(f'"{vlc_path}" ' + os.path.join(output_directory, "output.wav"))
        except Exception as e:
            messagebox.showerror("Error", f"An error occurred: {str(e)}")

app = tk.Tk()
app.title("Text-to-Speech Application")
app.geometry("400x300")

label = ttk.Label(app, text="Enter text to convert:")
label.pack(pady=10)

text_entry = tk.Text(app, height=5, width=40)
text_entry.pack(padx=20)

speak_button = ttk.Button(app, text="Speak", command=speak_text)
speak_button.pack(pady=10)

app.mainloop()
