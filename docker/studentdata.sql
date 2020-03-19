GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replicator' IDENTIFIED BY 'replpass';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT  ON *.* TO 'debezium' IDENTIFIED BY 'dbz';

CREATE DATABASE studentData;
GRANT ALL PRIVILEGES ON studentData.* TO 'mysqluser'@'%';


USE studentData;


CREATE TABLE students (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE KEY
) AUTO_INCREMENT=1001;


INSERT INTO students
VALUES (default,"Sally","Thomas","sally.thomas@acme.com"),
       (default,"George","Bailey","gbailey@foobar.com"),
       (default,"Edward","Walker","ed@walker.com"),
       (default,"Anne","Kretchmar","annek@noanswer.org");


CREATE TABLE parents (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job VARCHAR(255) NOT NULL,
  tel VARCHAR(255) NOT NULL UNIQUE KEY
) AUTO_INCREMENT=2001;


INSERT INTO parents
VALUES (default,"Sally","Thomas","1231231"),
       (default,"George","Bailey","242424242"),
       (default,"Edward","Walker","5435353"),
       (default,"Anne","Kretchmar","3443453");