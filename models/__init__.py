# Desc: Initialize the storage engine
from load_environments import run
from models.engine.db_storage import DBStorage


run()


storage = DBStorage()
storage.reload()
