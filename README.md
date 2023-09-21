# Data Feed Project

This is Flask and React web app that displays a data feed.

# Create database and seed data

```
cd api
export FLASK_APP=app
flask shell
```

Once inside the Flask shell run the following to create the Feed database and seed it with initial data:

```
>>> db.create_all()
>>> from db_setup import seed_data
>>> seed_data(app, db)
```

# Installing and running the api

This project was created using a conda virtual environment, but can run using other virtual env packages. To create a new conda environment run in the api folder:

```
cd api
conda env create --name data-feed-env --file=environment.yml
conda activate
```

If you are using a different virtualenv package, you can use pip to install the packages into your new environment:

```
cd api
pip install -r requirements.txt
```

Once your virtual environment is setup, you can run the flask app with the following:

```
cd api
python -m flask run
```

# Installing and running the client

You can use `yarn` or `npm` to install and run this project.

## yarn

This project was created on yarn v3.6.0. Running `yarn` will install the dependencies. To run the app in dev mode, run `yarn dev`.

```
cd client
yarn
yarn dev
```

Once the project is running, you can navigate to `http://localhost:5173` to view the project.

## npm

This project was created on yarn v3.6.0, but will run using npm as well. The version I currently have is v9.6.5. Running `npm install` will install the dependencies. To run the app in dev mode, run `npm run dev`.

```
cd client
npm install
npm run dev
```

Once the project is running, you can navigate to `http://localhost:5173` to view the project.
