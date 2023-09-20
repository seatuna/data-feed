# Data Feed Project

This is web app that displays a data feed.

## Create database and seed data

```
export FLASK_APP=app
flask shell
```

Once inside the Flask shell run the following to create the Feed database and seed it with initial data:

```
>>> db.create_all()
>>> from db_setup import seed_data
>>> seed_data(app, db)
```

