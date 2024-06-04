-- Drop dev database
DROP DATABASE IF EXISTS mll_dev_db;
--
-- Create test database
CREATE DATABASE IF NOT EXISTS mll_dev_db;
CREATE USER IF NOT EXISTS 'mll_dev'@'localhost';
SET PASSWORD FOR 'mll_dev'@'localhost' = 'mll_dev_pwd';
GRANT ALL ON mll_dev_db.* TO 'mll_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'mll_dev'@'localhost';
FLUSH PRIVILEGES;
--
--
--
--
-- Drop test database
DROP DATABASE IF EXISTS mll_dev_db;
--
-- Create test database
CREATE DATABASE IF NOT EXISTS mll_test_db;
CREATE USER IF NOT EXISTS 'mll_test'@'localhost';
SET PASSWORD FOR 'mll_test'@'localhost' = 'mll_test_pwd';
GRANT ALL ON mll_test_db.* TO 'mll_test'@'localhost';
GRANT SELECT ON performance_schema.* TO 'mll_test'@'localhost';
FLUSH PRIVILEGES;
