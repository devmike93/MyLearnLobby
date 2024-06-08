#!/usr/bin/python3
""" "RestFull API routes for the courses model"""

from api.v1.views import app_views
from flask import jsonify, request, abort
from models import storage
from models.users import User
from models.courses import Course


@app_views.route('/<user_id>/courses', methods=['POST'], strict_slashes=False)
def create_course(user_id):
    """Create a course"""
    user_obj = storage.get(User, user_id)
    if not user_obj:
        abort(404, description="User not found")
    if user_obj.loged_in is False:
        return jsonify({"error": "You are not logged in"}), 403
    if not request.get_json():
        abort(400, description="Not a JSON")
    # get the daata from the request form
    data = request.get_json()
    course_title = data.get('title')
    course_description = data.get('description')
    # Convert the list of course goals to a string
    course_goals = '\n'.join(data.get('goals'))
    course_start_date = data.get('start_date')
    course_excepted_end_date = data.get('excepted_end_date')
    course_resources = '\n'.join(data.get('resources'))

    if not all([course_title, course_goals]):
        return jsonify({"error": "Missing data"}), 400

    new_course = Course(title=course_title,
                        description=course_description,
                        goals=course_goals,
                        start_date=course_start_date,
                        excepted_end_date=course_excepted_end_date,
                        resources=course_resources,
                        user_id=user_id)
    new_course.save()
    return jsonify({"message": "Course created successfully", "course_id": new_course.id}), 201

@app_views.route('/<user_id>/courses', methods=['GET'], strict_slashes=False)
def get_courses(user_id):
    """Get all courses"""
    user_obj = storage.get(User, user_id)
    if not user_obj:
        abort(404, description="User not found")
    if user_obj.loged_in is False:
        return jsonify({"error": "User not logged in"}), 403
    courses = user_obj.courses
    courses_list = []
    for course in courses:
        courses_list.append(course.to_dict())
    return jsonify(courses_list), 200

@app_views.route('/courses/<course_id>', methods=['GET'], strict_slashes=False)
def get_course(course_id):
    """Get a course"""
    course_obj = storage.get(Course, course_id)
    if not course_obj:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(course_obj.to_dict()), 200

@app_views.route('/courses/<course_id>', methods=['DELETE'], strict_slashes=False)
def delete_course(course_id):
    """Delete a course"""
    course_obj = storage.get(Course, course_id)
    if not course_obj:
        return jsonify({"error": "Course not found"}), 404
    storage.delete(course_obj)
    storage.save()
    return jsonify({"message": "Course deleted successfully"}), 200

@app_views.route('/courses/<course_id>', methods=['PUT'], strict_slashes=False)
def update_course(course_id):
    """Update a course"""
    course_obj = storage.get(Course, course_id)
    if not course_obj:
        return jsonify({"error": "Course not found"}), 404
    data = request.get_json()
    course_obj.title = data.get('title', course_obj.title)
    course_obj.description = data.get('description', course_obj.description)
    course_obj.goals = data.get('goals', course_obj.goals)
    course_obj.start_date = data.get('start_date', course_obj.start_date)
    course_obj.excepted_end_date = data.get('excepted_end_date', course_obj.excepted_end_date)
    course_obj.link = data.get('link', course_obj.link)
    course_obj.type = data.get('type', course_obj.type)
    course_obj.counter = data.get('counter', course_obj.counter)
    storage.save()
    return jsonify({"message": "Course updated successfully"}), 200

# @app_views.route('/courses/<course_id>/progress', methods=['PUT'], strict_slashes=False)
