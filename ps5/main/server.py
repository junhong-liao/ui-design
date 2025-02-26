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

# AJAX FUNCTIONS
# ajax for log_sales.js
@app.route('/add_sale', methods=['GET', 'POST'])
def add_sale():
    global sales 
    global current_id 

    json_data = request.get_json()   
    name = json_data["name"] 
    client = json_data["client"] 
    reams = json_data["reams"] 
    
    # add new entry to array w id and name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_entry = {
        "id": new_id,
        "salesperson": name,
        "client": client,
        "reams": reams
    }
    sales.append(new_entry)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = sales)
 
if __name__ == '__main__':
   app.run(debug = True, port=5001)