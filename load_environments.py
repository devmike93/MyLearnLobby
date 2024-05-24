#!/usr/bin/python3
import os


file1 = "./envs_for_dev"
file2 = "./envs_for_production"
def load_env_file(file_name):
    with open(file_name, "r") as env_file:
        for line in env_file:
            line = line.strip()  # Remove leading/trailing spaces
            list_env = line.split("=")
            key = list_env[0]
            value = list_env[1]
            print("key = " + key, "\tvalue = " + value)
                # Set the environment variable
            os.environ[key] = value


def run():
    file_name = file1
    load_env_file(file_name)
    print("Now the environment variables are set for {}".format(file_name))
