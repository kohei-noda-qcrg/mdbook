drop user 'prisma_user'@'localhost';

create user 'prisma_user'@'localhost' identified by 'pass';
grant all privileges on *.* to 'prisma_user'@'localhost';
