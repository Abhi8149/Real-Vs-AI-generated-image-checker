# AI vs Real Image Detection

A full-stack web application that uses deep learning to distinguish between real photographs and AI-generated images. The application features a modern React frontend with drag-and-drop functionality and a Flask backend powered by a CNN model for accurate image classification.

<img width="1895" height="857" alt="image" src="https://github.com/user-attachments/assets/0686be16-5021-4689-862b-eb28054e628f" />


## 🚀 Features

- **Drag & Drop Interface**: Modern, intuitive file upload with drag-and-drop support
- **Real-time Prediction**: Instant classification of uploaded images
- **Image Preview**: Visual feedback showing the uploaded image before analysis
- **High Accuracy Detection**: CNN-based model trained to identify AI-generated content
- **Responsive Design**: Clean, modern UI that works across all devices
- **Loading States**: Visual feedback during image processing
- **Error Handling**: Graceful handling of upload errors and network issues

## 🛠️ Technology Stack

### Frontend
- **Framework**: React with TypeScript
- **Styling**: CSS3 with modern design principles
- **State Management**: React Hooks (useState, useRef)
- **File Handling**: FormData API for multipart uploads

### Backend
- **Framework**: Flask (Python)
- **Deep Learning**: TensorFlow/Keras
- **Image Processing**: PIL (Python Imaging Library)
- **Model**: Custom CNN (Inception-based architecture)
- **API**: RESTful endpoints with CORS support

### Machine Learning
- **Architecture**: Convolutional Neural Network (CNN)
- **Input Size**: 224x224 RGB images
- **Model File**: `inception_model.keras`
- **Training**: Binary classification (Real vs AI-generated)

## 📋 Prerequisites

Before running the application, ensure you have:

### Backend Requirements
1. **Python 3.8+** installed
2. **Required Python packages**:
   ```
   pip install flask tensorflow pillow flask-cors numpy
   ```

### Frontend Requirements
1. **Node.js 16+** and npm installed
2. **React development environment**

### Model Requirements
- Pre-trained model file (`inception_model.keras`)
- Model should be placed in the backend directory

## 🔧 Installation

### Backend Setup

1. **Navigate to backend directory**:
```
cd backend
```

2. **Install Python dependencies**:
```
pip install flask tensorflow pillow flask-cors numpy
```

3. **Ensure model file is present**:
- Place `inception_model.keras` in the backend root directory
- Verify `predictImage.py` is configured correctly

4. **Start the Flask server**:
```
python app.py
```

Application will be available on `http://localhost:5173`

## 🚀 Usage

1. **Access the Application**:
- Open your browser and go to `http://localhost:5173`
- Ensure both frontend and backend servers are running

2. **Upload an Image**:
- **Drag & Drop**: Drag an image file directly onto the upload area
- **Click to Select**: Click the upload area to open file picker
- **Supported Formats**: JPG, JPEG, PNG, GIF

3. **Get Results**:
- Click the "Check" button after uploading
- Wait for the analysis (loading indicator will show)
- View the result: "🧠 The image is AI generated" or "📷 The image is real"

## 💡 How It Works

### Image Processing Pipeline
1. **Frontend Upload**: User selects/drops an image file
2. **File Validation**: Client-side validation of file type and size
3. **API Request**: FormData sent to Flask backend via POST request
4. **Image Preprocessing**:
- Convert to RGB format using PIL
- Resize to 224x224 pixels (model input requirement)
- Normalize pixel values (0-1 range)
- Add batch dimension for model input

### Model Prediction
1. **CNN Inference**: Inception-based model processes the image
2. **Binary Classification**: Model outputs probability score (0-1)
3. **Result Interpretation**:
- Score > 0.5: AI-generated image
- Score ≤ 0.5: Real image
4. **Response**: JSON result sent back to frontend

## ⚙️ Model Details

- **Architecture**: Inception-based CNN
- **Input Shape**: (224, 224, 3) - RGB images
- **Output**: Single probability score (0-1)
- **Training Data**: Real images vs AI-generated images dataset
- **Performance**: Optimized for distinguishing modern AI-generated content

### Model Architecture Overview
```
Input (224x224x3)
↓
Convolutional Layers (Feature Extraction)
↓
Global Average Pooling
↓
Dense Layers (Classification)
↓
Output (1 neuron, sigmoid activation)
```

## 📁 Project Structure

```
ai-real-image-detector/
├── backend/
│ ├── app.py # Flask application
│ ├── predictImage.py # Image prediction logic
│ ├── inception_model.keras # Pre-trained CNN model
│ └── requirements.txt # Python dependencies
├── frontend/
│ ├── src/
│ │ ├── App.tsx # Main React component
│ │ ├── App.css # Styling
│ │ └── main.tsx # React entry point
│ ├── package.json # Node.js dependencies
│ └── vite.config.ts # Vite configuration
└── README.md # This file
```

## 🔍 API Endpoints

### POST /predict
- **Description**: Upload image for AI vs Real classification
- **Content-Type**: multipart/form-data
- **Parameters**: 
  - `file`: Image file (JPG, PNG, etc.)
- **Response**:
```
{
"result": 0, // 0 for real, 1 for AI-generated
"confidence": 0.85
}
```

## 🙏 Acknowledgments

- TensorFlow/Keras for the deep learning framework
- React community for frontend development tools
- Flask for the lightweight backend framework
- PIL for efficient image processing

**Note**: Ensure both frontend and backend servers are running simultaneously for the application to function properly. The model file must be present in the backend directory before starting the server.
