# 🗑️ Garbage Classification using Deep Learning

This project focuses on classifying different types of waste into predefined categories using deep learning.  
The goal is to support smart waste management systems by enabling automated garbage recognition through image classification.

🌐 **Live Demo:** [my-garbage.netlify.app](https://my-garbage.netlify.app/)

---

## 📦 Dataset

The model is trained on the [**Garbage Classification Dataset**](https://www.kaggle.com/datasets/mostafaabla/garbage-classification) from Kaggle.

- **Total images:** ~15,000  
- **Number of classes:** 12 (e.g., plastic, paper, metal, glass, etc.)  
- Each image is labeled and organized into folders corresponding to its class.

---

## 🧠 Model Architecture

For this project, I combined the **MobileNetV2** architecture with additional **Conv2D** layers to enhance feature extraction and improve classification performance.

### 🔧 Key Features:
- **Base Model:** MobileNetV2 (pre-trained on ImageNet)  
- **Custom Layers:** Added Conv2D + MaxPooling2D + Dropout layers on top  
- **Activation Function:** ReLU for hidden layers, Softmax for output  
- **Optimizer:** Adam with 1e-4 initial learning rate
- **Loss Function:** Sparse Categorical Crossentropy  

This hybrid approach leverages MobileNetV2’s lightweight efficiency while introducing new convolutional layers to capture dataset-specific features more effectively.

---

## 📊 Results

| Metric | Accuracy |
|:-------:|:---------:|
| **Training Accuracy** | **0.99** |
| **Testing Accuracy** | **0.98** |

✅ The model demonstrates strong generalization performance with minimal overfitting.

## 🧩 Tech Stack

- **Python**
- **TensorFlow**, **Keras**
- **MobileNetV2**, **Conv2D Layers**
- **NumPy**, **Pandas**, **Matplotlib**
- **Netlify** for deployment

---

## 🎯 Project Goal

This project was developed as part of my **Image Classification Bootcamp Submission**, showcasing my ability to:
- Work with large image datasets  
- Fine-tune pre-trained models for custom tasks  
- Build and deploy an end-to-end machine learning application  

---
