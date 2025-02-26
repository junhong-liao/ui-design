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
   return render_template('log_sales.html', data=sales)   

@app.route('/get_sales', methods=['GET'])
def get_sales():
   return jsonify(data=sales)

@app.route('/add_sale', methods=['POST'])
def add_sale():
    global current_id
    data = request.get_json()
    salesPerson = data.get("salesPerson")
    client = data.get("client")
    reamsSold = data.get("reamsSold")

    new_sale = {
        "id": current_id,
        "salesperson": salesPerson,
        "client": client,
        "reams": reamsSold
    }
    sales.append(new_sale)
    current_id += 1
    return jsonify(data=sales)


@app.route('/delete_sale', methods=['DELETE'])
def delete_sale():
    global sales
    data = request.get_json()
    saleID = data.get("id")
    sales = [sale for sale in sales if sale["id"] != saleID]
    return jsonify(data=sales)

if __name__ == '__main__':
   app.run(debug = True, port=5001)