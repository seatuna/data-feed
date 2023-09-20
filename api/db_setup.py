from datetime import datetime
from app import Feed

initial_data = [
    Feed(event_date=datetime.strptime("2023-01-08 09:25", '%Y-%m-%d %H:%M'),
        followers=12,
        following=54,
        source="NY Times",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
    Feed(event_date=datetime.strptime("2023-01-08 05:15", '%Y-%m-%d %H:%M'),
        followers=14,
        following=54,
        source="Yahoo News",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
    Feed(event_date=datetime.strptime("2023-01-08 06:15", '%Y-%m-%d %H:%M'),
        followers=21,
        following=54,
        source="NY Times",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
    Feed(event_date=datetime.strptime("2023-02-14 14:14", '%Y-%m-%d %H:%M'),
        followers=21,
        following=56,
        source="NY Times",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
    Feed(event_date=datetime.strptime("2023-02-26 12:55", '%Y-%m-%d %H:%M'),
        followers=13,
        following=57,
        source="Yahoo News",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
    Feed(event_date=datetime.strptime("2023-03-28 15:11", '%Y-%m-%d %H:%M'),
        followers=19,
        following=62,
        source="Washington Post",
        topic="Fish",
        content="Redtooth triggerfish, kelp perch spotted danio New Zealand smelt trumpeter manefish trumpeter sheepshead; kissing gourami, grideye. Ide megamouth shark North American darter, sucker; moray eel, mackerel catfish slender mola goldeye."),
]

def seed_data(app, db):
    with app.app_context():
        for data in initial_data:
            db.session.add(data)
        db.session.commit()
