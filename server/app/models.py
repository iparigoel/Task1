from django.db import models

class Song(models.Model):
    songName = models.CharField(max_length=50)
    def __str__(self):
        return self.songName