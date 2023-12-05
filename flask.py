from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URL'] = 'postgresql://postgres:postgres@localhost/organs_db'
db = SQLAlchemy(app)

# Define a model for demographics_db table
class DataModel(db.Model):
    __tablename__ = 'demographics'
    id = db.Column(db.Integer, primary_key=True)
    # Define other columns here
    @property
    def serialize(self):
        # This method returns the model's data as a dictionary
        return {
            'index': self.index,
            # Add other fields here
            'transplant_year': self.transplant_year,
            'donor_type': self.donor_type,
            'organ_transplanted': self.organ_transplanted,
            'total': self.total,
            'male': self.male,
            'female': self.female,
            'no_age_reported': self.no_age_reported,
            'pediatric': self.pediatric,
            '18-30': self._18_30,
            '31-40': self._31_40,
            '41-50': self._41_50,
            '51-60': self._51_60,
            '61+': self._61+_,
            'white': self.white,
            'black': self.black,
            'hispanic': self.hispanic,
            'asian': self.asian,
            'american_indian': self.american_indian,
            'native_hawaiian': self.native_hawaiian,
            # 'multiracial_distinct_recpients': self.multiracial_distinct_recpients
        }

# Define a route for the API call
@app.route('/api/demographics', methods=['GET'])
def get_data():
    data = DataModel.query.all()
    return jsonify([item.serialize for item in data])

if __name__ == '__main__':
    app.run(debug=True)