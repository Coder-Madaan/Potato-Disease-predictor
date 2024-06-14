# Potato Disease Predictor

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Dataset](#dataset)
- [Model Training](#model-training)


## Introduction

Potato Disease Predictor is a web application that helps farmers and agricultural experts predict potato diseases using images of potato leaves. The project leverages deep learning techniques, specifically a Convolutional Neural Network (CNN), to classify the diseases. The frontend is built with React, and the backend is powered by Flask.

## Features

- Upload images of potato leaves to predict diseases.
- Utilizes a trained CNN model for accurate predictions.
- Data augmentation to enhance model performance.
- Easy-to-use web interface.

## Tech Stack

- **Frontend:** React
- **Backend:** Flask
- **Model Training:** TensorFlow/Keras for CNN
- **Data Augmentation:** Splitfolders, ImageDataGenerator

## Installation

### Prerequisites

- Node.js and npm (for frontend)
- Python and pip (for backend)
- Virtualenv (recommended for backend)

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask app:
    ```bash
    flask run
    ```

## Usage

1. Start both the frontend and backend servers as described in the installation section.
2. Open your web browser and navigate to `http://localhost:3000`.
3. Upload an image of a potato leaf and click on the "Predict" button to get the disease prediction.

## Dataset

The dataset used for training the model can be downloaded from the following link:

[Download the dataset](https://www.kaggle.com/datasets/arjuntejaswi/plant-village)

After downloading, extract the contents and place them as mentioned in the .ipynb file

## Model Training

The model is trained using a Convolutional Neural Network (CNN) with data augmentation techniques to improve accuracy. The `splitfolders` library is used to split the dataset into training, validation, and test sets.


