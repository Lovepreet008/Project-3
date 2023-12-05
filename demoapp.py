from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/organs_db'
db = SQLAlchemy(app)

# Define a model for demographics_db table
class DataModel(db.Model):
    __tablename__ = 'demographics'
    index = db.Column(db.Integer, primary_key=True)
    transplant_year = db.Column(db.Integer)  
    donor_type = db.Column(db.String) 
    organ_transplanted = db.Column(db.String)  
    total = db.Column(db.Integer) 
    male = db.Column(db.Integer)  
    female = db.Column(db.Integer)  
    no_age_reported = db.Column(db.Integer)  
    pediatric = db.Column(db.Integer) 
    age_18_30 = db.Column(db.Integer) 
    age_31_40 = db.Column(db.Integer)
    age_41_50 = db.Column(db.Integer)
    age_51_60 = db.Column(db.Integer)
    age_61_plus = db.Column(db.Integer) 
    white = db.Column(db.Integer) 
    black = db.Column(db.Integer)
    hispanic = db.Column(db.Integer) 
    asian = db.Column(db.Integer)
    american_indian = db.Column(db.Integer)  
    native_hawaiian = db.Column(db.Integer) 
    multiracial = db.Column(db.Integer) 
    # Define other columns here
    @property
    def serialize(self):
        # This method returns the model's data as a dictionary
        return {
            'index': self.index,
            'transplant_year': self.transplant_year,
            'donor_type': self.donor_type,
            'organ_transplanted': self.organ_transplanted,
            'total': self.total,
            'male': self.male,
            'female': self.female,
            'no_age_reported': self.no_age_reported,
            'pediatric': self.pediatric,
            'age_18_30': self.age_18_30,
            'age_31_40': self.age_31_40,
            'age_41_50': self.age_41_50,
            'age_51_60': self.age_51_60,
            'age_61_plus': self.age_61_plus,
            'white': self.white,
            'black': self.black,
            'hispanic': self.hispanic,
            'asian': self.asian,
            'american_indian': self.american_indian,
            'native_hawaiian': self.native_hawaiian,
            'multiracial': self.multiracial
        }

# Define a route for the API call
@app.route('/api/demographics', methods=['GET'])
def get_data():
    data = DataModel.query.all()
    return jsonify([item.serialize for item in data])

if __name__ == '__main__':
    app.run(debug=True)