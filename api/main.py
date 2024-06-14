from PIL import Image
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load your trained model
model = load_model("../my_model2.keras")
class_indices = {'Early Blight': 0, 'Late Blight': 1, 'Healthy Plant': 2}

# Function to preprocess an image for prediction
def preprocess_image(img_path):
    img = Image.open(img_path)  # Use Image.open from PIL.Image
    img = img.resize((256, 256))  # Resize image
    img_array = np.asarray(img)  # Convert PIL image to numpy array
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0  # Normalize pixel values
    return img_array

# Endpoint to predict image class
@app.route("/")
def hello():
    return "hello world"

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        file = request.files["file"]
        file_path = "temp.jpg"
        file.save(file_path)
        img = preprocess_image(file_path)
        prediction = model.predict(img)
        predicted_class_index = np.argmax(prediction)
        predicted_class = list(class_indices.keys())[predicted_class_index]
        return jsonify({"class": predicted_class})

if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
