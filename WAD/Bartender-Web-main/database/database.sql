create database user_db;
use user_db;

CREATE TABLE user_form (
  id int(100) NOT NULL auto_increment,
  name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  user_type varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (id)
);

INSERT INTO user_db.`user_form` (name, email, password, user_type) VALUES ('admin', 'admin@gmail.com', 'admin', 'admin');
