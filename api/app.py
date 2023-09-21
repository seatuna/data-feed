from datetime import datetime
import os
from flask import Flask, abort, jsonify, make_response, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import func
from flask_cors import CORS, cross_origin

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "feed.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)


class Feed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    event_date = db.Column(db.DateTime(timezone=True), server_default=func.now())
    followers = db.Column(db.Integer, nullable=False)
    following = db.Column(db.Integer, nullable=False)
    source = db.Column(db.String(100), nullable=False)
    topic = db.Column(db.String(100), nullable=False)

    @property
    def serialize(self):
        """Return data in serializable format"""
        return {
            "id": self.id,
            "content": self.content,
            "event_date": self.event_date,
            "followers": self.followers,
            "following": self.following,
            "source": self.source,
            "topic": self.topic,
        }


@app.errorhandler(404)
def not_found(e):
    """Return generic 404 error"""
    return jsonify(error=str(e)), 404


@app.errorhandler(500)
def generic_error(e):
    """Return generic 500 error"""
    return jsonify(error=str(e)), 500


@app.route("/feed", methods=["GET"])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_feed():
    """Get Data Feed"""
    feed = [feed.serialize for feed in Feed.query.all()]
    return jsonify(feed)


@app.route("/feed/create", methods=["GET", "POST", "OPTIONS"])
@cross_origin(origin='localhost',headers=['Content-Type'])
def post_feed_item():
    """Create new Feed item"""
    print(request.method)
    print(request.get_json())
    
    if request.method == "POST":
        form_data = request.get_json()
        content = form_data["content"]
        event_date = datetime.strptime(form_data["event_date"], '%Y-%m-%d %H:%M')
        followers = int(form_data["followers"])
        following = int(form_data["following"])
        source = form_data["source"]
        topic = form_data["topic"]
        
        print('event_date', type(event_date))
        print('event_date', event_date)

        try:
            feed_item = Feed(
                content=content,
                event_date=event_date,
                followers=followers,
                following=following,
                source=source,
                topic=topic,
            )
            print(feed_item)
            db.session.add(feed_item)
            db.session.commit()
            return jsonify(feed_item.serialize)
        except SQLAlchemyError as e:
            error = str(e.__dict__['orig'])
            print(error)
        except:
            abort(500, description="Failed to create new feed item.")


if __name__ == "__main__":
    app.run(host="localhost", port=5000)
