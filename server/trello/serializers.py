from rest_framework import serializers
from .models import Board, TaskList, Task


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'


class TaskListSerializer(serializers.ModelSerializer):
    tasks = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = TaskList
        fields = '__all__'

    def create(self, validated_data):
        count = TaskList.objects.filter(
            board=validated_data['board'], active=True).count()
        validated_data['order'] = count + 1
        return (TaskList.objects.create(**validated_data))

    def get_tasks(self, obj):
        content = Task.objects.all().filter(task_list=obj.pk, active=True).order_by('order')
        serializer = TaskSerializer(content, many=True)
        return (serializer.data)


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        count = Task.objects.filter(
            task_list=validated_data['task_list'], active=True).count()
        validated_data['order'] = count + 1
        return (Task.objects.create(**validated_data))
