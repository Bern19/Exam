# Yondu CRUD

Yondu CRUD(create, read, update, delete);

## Installation

Install the latest NodeJs with LTS [`Here`](https://nodejs.org/).  
Also,
install the latest MySQL Community Server [`Here`](https://dev.mysql.com/downloads/mysql/).


## Usage

Connect to the MySQL using MySQL Shell.


```sql
\connect root@localhost:3306
```

MySQL Shell will prompt you to enter your password. After entering your password, use this command to import database and initial data that is found on the root folder named initial_mysql_entries.sql.

```sql
\sql
\. /file/path/initial_mysql_entries.sql

```

Run the exec.bat from the root folder. The command prompt will show up and looks like this.
```
CRUD application listening on port 3000
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
