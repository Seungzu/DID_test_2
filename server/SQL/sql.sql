create table application(
    idx int not null auto_increment primary key,
    u_idx int not null,
    name varchar(40) not null,
    APIKey varchar(32) not null,
    host varchar(255) not null,
    redirectURI varchar(255) not null,
    usePoint tinyint not null
);

create table appDesc(
    idx int not null auto_increment primary key,
    a_idx int not null,
    description text not null
)

create table appImg(
    idx int not null auto_increment primary key,
    a_idx int not null,
    imgUrl varchar(255)
)

create table connected(
    idx int not null auto_increment primary key,
    u_idx int not null,
    a_idx int not null
)