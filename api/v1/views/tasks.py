#!/usr/bin/python3
""" RestFull API routes for the task model"""

from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.users import User
from models.courses import Course
from models.tasks import Task


@app_views.route('/<course_id>/tasks', methods=['POST'], strict_slashes=False)
def create_task(course_id):
    """Create a task"""
    course_obj = storage.get(Course, course_id)
    if not course_obj:
        abort(404, description="Course not found")
    if not request.get_json():
        abort(400, description="Not a JSON")

    # get the data from the request form
    data = request.get_json()
    task_title = data.get('title')
    task_description = data.get('description')
    task_done = data.get('done')

    if not all([task_title]):
        return jsonify({"error": "Missing data"}), 400

    new_task = Task(title=task_title,
                    description=task_description,
                    done=task_done,
                    course_id=course_id)
    new_task.save()
    return jsonify({"message": "Task created successfully", "task_id": new_task.id}), 201


@app_views.route('/<course_id>/tasks', methods=['GET'], strict_slashes=False)
def get_tasks(course_id):
    """Get all tasks"""
    course_obj = storage.get(Course, course_id)
    if not course_obj:
        return jsonify({"error": "Course not found"}), 404
    tasks = course_obj.tasks
    tasks_list = []
    for task in tasks:
        tasks_list.append(task.to_dict())
    return jsonify(tasks_list), 200

@app_views.route('/tasks/<task_id>', methods=['GET'], strict_slashes=False)
def get_task(task_id):
    """Get a task"""
    task_obj = storage.get(Task, task_id)
    if not task_obj:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(task_obj.to_dict()), 200

@app_views.route('/tasks/<task_id>', methods=['DELETE'], strict_slashes=False)
def delete_task(task_id):
    """Delete a task"""
    task_obj = storage.get(Task, task_id)
    if not task_obj:
        return jsonify({"error": "Task not found"}), 404
    storage.delete(task_obj)
    storage.save()
    return jsonify({}), 200

@app_views.route('/tasks/<task_id>', methods=['PUT'], strict_slashes=False)
def update_task(task_id):
    """Update a task"""
    task_obj = storage.get(Task, task_id)
    if not task_obj:
        return jsonify({"error": "Task not found"}), 404
    if not request.get_json():
        abort(400, description="Not a JSON")
    data = request.get_json()
    attrs = ['title', 'description', 'done', 'counter']

    for key, value in data.items():
        if key in attrs:
            setattr(task_obj, key, value)
    storage.save()
    return jsonify({"message": "Task updated successfully", "task_id": task_obj.id}), 200
