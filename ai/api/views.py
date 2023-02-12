# Import necessary libraries
import pickle
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from .models import ImageForecasting
from .serializer import ImageSerializer
import numpy as np
import pandas as pd
import pickle
from tensorflow import keras


# Create your views here.
@api_view(['GET'])
def index_page(request):
    return_data = {
        "error": "0",
        "message": "Successful",
    }
    return Response(return_data)


# predicting the sales forecast
@api_view(['POST'])
def forecast(request):
    input_array = request.data.get('items')
    # input_array = np.array(input_array)
    print(input_array)
    # input_array = [[input_array]]
    try:
        modelh5 = keras.models.load_model('ml_model/bonds.h5')

        prediction = modelh5.predict(input_array)

        # print(prediction)
        # print("The predicted sales are: ", prediction)

        result_prediction = {
            'error': '0',
            'message': 'Successfull',
            'prediction': prediction,
        }

    except Exception as e:
        result_prediction = {
            'error': '2',
            "message": str(e)
        }

    return Response(result_prediction)


@api_view(['GET'])
def image_list(request):
    if request.method == 'GET':
        images = ImageForecasting.objects.all()
        serializer = ImageSerializer(images, context={'request': request})
        if serializer:
            return Response(serializer.data)
        else:
            return Response({"error": "Unable to retrieve images"})
