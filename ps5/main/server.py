from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

current_id = 4
sales = [
    {
    "id": 1,
    "salesperson": "James D. Halpert",
    "client": "Shake Shack",
    "reams": 1000
    },
    {
    "id": 2,
    "salesperson": "Stanley Hudson",
    "client": "Toast",
    "reams": 4000
    },
    {
    "id": 3,
    "salesperson": "Michael G. Scott",
    "client": "Computer Science Department",
    "reams": 10000
    },
]
clients = [
    "Shake Shack",
    "Toast",
    "Computer Science Department",
    "Teacher's College",
    "Starbucks",
    "Subsconsious",
    "Flat Top",
    "Joe's Coffee",
    "Max Caffe",
    "Nussbaum & Wu",
    "Taco Bell",
];

# ROUTES
@app.route('/')
def welcome():
   return render_template('welcome.html')   

@app.route('/infinity')
def log_sales():
   return render_template('log_sales.html')   
 
if __name__ == '__main__':
   app.run(debug = True, port=5001)