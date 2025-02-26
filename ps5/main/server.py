from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)



current_id = 0
clients = ["columbia university"]

sales = [
    {
        "salesperson": "michael scott", 
        "client": "columbia university",
        "reams": 100
    },
    {
        "salesperson": "michael scott", 
        "client": "columbia university",
        "reams": 100
    }
]

# ROUTES

@app.route('/')
def welcome():
   return render_template('welcome.html')   

@app.route('/infinity')
def log_sales():
   return render_template('log_sales.html')   

@app.route('/hello/<name>')
def hello_name(name=None):
    return render_template('hello_name.html', name=name) 

@app.route('/people')
def people():
    return render_template('people.html', data=sales)  


# AJAX FUNCTIONS

# ajax for people.js
@app.route('/add_name', methods=['GET', 'POST'])
def add_name():
    global data 
    global current_id 

    json_data = request.get_json()   
    name = json_data["name"] 
    
    # add new entry to array with 
    # a new id and the name the user sent in JSON
    current_id += 1
    new_id = current_id 
    new_name_entry = {
        "name": name,
        "id":  current_id
    }
    data.append(new_name_entry)

    #send back the WHOLE array of data, so the client can redisplay it
    return jsonify(data = data)
 
if __name__ == '__main__':
   app.run(debug = True, port=5001)