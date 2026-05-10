from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from .views import add_songs, delete_song, get_songs, update_song
from .views import add_songs

def home(request):
    print("Hello, World!")
    return HttpResponse("Hello, World!")

urlpatterns = [    
    path('', home),
    path('songs/', get_songs, name='get_songs'),
    path('songs/add', add_songs, name='add_songs'),
    path('songs/delete/<int:pk>', delete_song, name='delete_song'),
    path('songs/update/<int:pk>', update_song, name='update_song'),
]