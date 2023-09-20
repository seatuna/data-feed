import os
from flask import Flask, abort, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, "feed.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
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
def get_feed():
    """Get Data Feed"""
    feed = [feed.serialize for feed in Feed.query.all()]
    return jsonify(feed)


@app.route("/feed/create", methods=["GET", "POST"])
def post_feed_item():
    """Create new Feed item"""
    if request.method == "POST":
        content = request.form["content"]
        event_date = request.form["event_date"]
        followers = int(request.form["followers"])
        following = int(request.form["following"])
        source = request.form["source"]
        topic = request.form["topic"]

        try:
            feed_item = Feed(
                content=content,
                event_date=event_date,
                followers=followers,
                following=following,
                source=source,
                topic=topic,
            )
            db.session.add(feed_item)
            db.session.commit()
        except:
            abort(500, description="Failed to create new feed item.")

    return jsonify(feed_item.serialize)


if __name__ == "__main__":
    app.run(host="localhost", port=5000)
