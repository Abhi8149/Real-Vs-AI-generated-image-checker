from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model

model=load_model("inception_model.keras")

def predict_image(file):
    image=Image.open(file.stream).convert("RGB")
    image=image.resize((224,224))
    image_array=np.array(image)/255.0
    image_array=np.expand_dims(image_array, axis=0)

    prediction=model.predict(image_array)
    return prediction[0][0]
