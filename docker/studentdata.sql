GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'replicator' IDENTIFIED BY 'replpass';
GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT  ON *.* TO 'debezium' IDENTIFIED BY 'dbz';

CREATE DATABASE studentData;
GRANT ALL PRIVILEGES ON studentData.* TO 'mysqluser'@'%';


USE studentData;


CREATE TABLE student (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE KEY
) AUTO_INCREMENT=1001;


INSERT INTO student
VALUES (default,"Sally","Thomas","sally.thomas@acme.com"),
       (default,"George","Bailey","gbailey@foobar.com"),
       (default,"Edward","Walker","ed@walker.com"),
       (default,"Anne","Kretchmar","annek@noanswer.org");


CREATE TABLE parent (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job VARCHAR(255) NOT NULL,
) AUTO_INCREMENT=2001;


INSERT INTO parent
VALUES (default,"Sally","Thomas"),
       (default,"George","Bailey"),
       (default,"Edward","Walker"),
       (default,"Anne","Kretchmar");