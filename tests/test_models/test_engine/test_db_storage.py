import unittest
from unittest.mock import patch, Mock
from models.engine.db_storage import DBStorage
from models.users import User
from models.base_model import Base


class TestDBStorage(unittest.TestCase):
    @patch.object(DBStorage, "_DBStorage__session")
    def test_new(self, mock_session):
        db = DBStorage()
        user = User()
        db.new(user)
        mock_session.add.assert_called_once_with(user)

    @patch.object(DBStorage, "_DBStorage__session")
    def test_save(self, mock_session):
        db = DBStorage()
        db.save()
        mock_session.commit.assert_called_once()

    @patch.object(DBStorage, "_DBStorage__session")
    def test_delete(self, mock_session):
        db = DBStorage()
        user = User()
        db.delete(user)
        mock_session.delete.assert_called_once_with(user)

    @patch.object(DBStorage, "_DBStorage__session")
    def test_all(self, mock_session):
        db = DBStorage()
        db.all()
        mock_session.query.assert_called()

    @patch.object(DBStorage, "_DBStorage__session")
    def test_get(self, mock_session):
        db = DBStorage()
        #user = User()
        db.get(User, "1")
        mock_session.query.assert_called()

    @patch.object(DBStorage, "_DBStorage__session")
    def test_count(self, mock_session):
        db = DBStorage()
        db.count()
        mock_session.query.assert_called()

    @patch.object(DBStorage, "_DBStorage__session")
    def test_close(self, mock_session):
        db = DBStorage()
        db.close()
        mock_session.remove.assert_called_once()
    

    @patch('models.engine.db_storage.sessionmaker')
    @patch('models.engine.db_storage.scoped_session')
    @patch.object(Base.metadata, 'create_all')
    def test_reload(self, mock_create_all, mock_scoped_session, mock_sessionmaker):
        db = DBStorage()
        db.reload()
        mock_create_all.assert_called_once()
        mock_sessionmaker.assert_called_once_with(bind=db._DBStorage__engine, expire_on_commit=False)
        mock_scoped_session.assert_called_once_with(mock_sessionmaker.return_value)
    

if __name__ == "__main__":
    unittest.main()