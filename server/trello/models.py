from django.db import models

# Create your models here.
# Make colors an object

class Board(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    background = models.CharField(max_length=200)

class TaskList(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)

class Task(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)



