-- -- Drop dev database
-- DROP DATABASE IF EXISTS mll_dev_db;
-- --
-- -- Create test database
-- CREATE DATABASE IF NOT EXISTS mll_dev_db;
-- CREATE USER IF NOT EXISTS 'mll_dev'@'localhost';
-- SET PASSWORD FOR 'mll_dev'@'localhost' = 'mll_dev_pwd';
-- GRANT ALL ON mll_dev_db.* TO 'mll_dev'@'localhost';
-- GRANT SELECT ON performance_schema.* TO 'mll_dev'@'localhost';
-- FLUSH PRIVILEGES;
-- --
-- --
-- --
-- --
-- -- Drop test database
-- DROP DATABASE IF EXISTS mll_dev_db;
-- --
-- -- Create test database
-- CREATE DATABASE IF NOT EXISTS mll_test_db;
-- CREATE USER IF NOT EXISTS 'mll_test'@'localhost';
-- SET PASSWORD FOR 'mll_test'@'localhost' = 'mll_test_pwd';
-- GRANT ALL ON mll_test_db.* TO 'mll_test'@'localhost';
-- GRANT SELECT ON performance_schema.* TO 'mll_test'@'localhost';
-- FLUSH PRIVILEGES;

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
