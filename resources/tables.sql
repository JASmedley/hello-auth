create table users {
  id int primary key auto_increment,
  email varchar(100) unique not null,
  password varchar(1000) not null,
  name varchar(100)
}