# 1. import Flask
from flask import Flask, jsonify, render_template, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/organs_db'
db = SQLAlchemy(app)

# Define a model for demographics_db table
class DataModel1(db.Model):
        __tablename__ = 'demographics'
        #index = db.Column(db.Integer, primary_key=True)
        transplant_year = db.Column(db.Integer, primary_key=True)  
        donor_type = db.Column(db.String, primary_key=True) 
        organ_transplanted = db.Column(db.String, primary_key=True)  
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
                #'index': self.index,
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

# Define a model for national_db table
class DataModel2(db.Model):
    __tablename__ = 'national'
    #index = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, primary_key=True)
    organ = db.Column(db.String, primary_key=True)
    number_of_deceased_organ_donors_recovered = db.Column(db.Integer)
    number_of_living_organ_donors_recovered = db.Column(db.Integer)
    number_of_deceased_donor_organ_transplant_recipients = db.Column(db.Integer)
    number_of_living_donor_organ_transplant_recipients = db.Column(db.Integer)
    # Define other columns here
    @property
    def serialize(self):
        # This method returns the model's data as a dictionary
        return {
            #'index': self.index,
            'year': self.year,
            'organ': self.organ,
            'number_of_deceased_organ_donors_recovered': self.number_of_deceased_organ_donors_recovered,
            'number_of_living_organ_donors_recovered': self.number_of_living_organ_donors_recovered,
            'number_of_deceased_donor_organ_transplant_recipients': self.number_of_deceased_donor_organ_transplant_recipients,
            'number_of_living_donor_organ_transplant_recipients': self.number_of_living_donor_organ_transplant_recipients
        }

# Define a model for state_db table
class DataModel3(db.Model):
    __tablename__ = 'state'
    #index = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    year = db.Column(db.Integer, primary_key=True)
    state_name = db.Column(db.String, primary_key=True)
    state_code = db.Column(db.String)
    organ = db.Column(db.String, primary_key=True)
    counts = db.Column(db.Integer)
    # Define other columns here
    @property
    def serialize(self):
        # This method returns the model's data as a dictionary
        return {
            #'index': self.index,
            'type': self.type,
            'year': self.year,
            'state_name': self.state_name,
            'state_code': self.state_code,
            'organ': self.organ,
            'counts': self.counts
        }
    
# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    return render_template("index.html")
    print("Server received request for 'Home' page...")
    return "Welcome to my 'Home' page!"
    
# Define a route for demographics API call
@app.route('/api/demographics', methods=['GET'])
def demographics():
    data = DataModel1.query.all()
    return jsonify([item.serialize for item in data])

@app.route("/api/national")
def national():
    data = DataModel2.query.all()
    return jsonify([item.serialize for item in data])
    
@app.route("/api/state")
def state():
    data = DataModel3.query.all()
    return jsonify([item.serialize for item in data])

@app.route('/api/geojsondata', methods=['GET'])
def get_data():
    return send_file('static/js/us-state-boundaries.geojson', mimetype='application/json')

if __name__ == "__main__":
    app.run(debug=True)
