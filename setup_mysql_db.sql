CREATE DATABASE IF NOT EXISTS project_dev_db;
CREATE USER IF NOT EXISTS 'project_dev_user'@'localhost' IDENTIFIED BY 'project_dev_pwd';
GRANT ALL PRIVILEGES ON `project_dev_db`.* TO 'project_dev_user'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'project_dev_user'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS project_dev_db_test;
CREATE USER IF NOT EXISTS 'project_dev_user_test'@'localhost' IDENTIFIED BY 'project_dev_pwd_test';
GRANT ALL PRIVILEGES ON `project_dev_db_test`.* TO 'project_dev_user_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'project_dev_user_test'@'localhost';
FLUSH PRIVILEGES;