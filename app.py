from flask import Flask,jsonify,request,session
import sqlite3  # Use 'sqlite3' for working with SQLite
import re
from datetime import *
from werkzeug.exceptions import abort
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,jwt_required,get_jwt_identity
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "Dese.Decent.Pups.BOOYO0OST"  # Change this!

db = SQLAlchemy(app)
jwt = JWTManager(app)
api = Api(app)
CORS(app)


def get_db_connection():
    # Connect to an SQLite database file, create a cursor, and handle transactions
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

def validate_mail(email):
    # Make a regex expression to validate email
    regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z | a-z]{2,7}\b"
    if not re.fullmatch(regex,email):
        return False
    else:
        return True

def validate_phone(phone):
    # validate with kenyan phone code
    regex = r'^(\+[254]\d{11,11})?$'
    if not re.fullmatch(regex,phone):
        return False
    return True

@app.route('/')
def index():   
    return jsonify(message="You requested an empty resource")

@app.route("/api/register", methods=["POST"])
def register():
    if request.method == "POST":
        data = request.get_json()

        error = ""

        if not data:
            error="Invalid Content Parsed"
            return jsonify(err=error)
        elif data['name'] == '':
            error="Username not Defined"
            return jsonify(err=error),400
        elif data['password'] == '' or len(data['password']) < 6:
            error = "Password undefined or invalid"
            return jsonify(err=error),400
        elif data['email'] == '':
            error="Email not Defined"
            return jsonify(err=error),400
        
        # return jsonify(message="Success")
        
        uname = data['name']
        email = data['email']
        # phone = data['phone']
        password = data['password']

        
        
        # hashed_password = bcrypt.hashpw(pw,salt)
        hashed_password = generate_password_hash(password)

        conn = get_db_connection()
        check_uname = conn.execute('SELECT * FROM users WHERE name = ?',(uname,)).fetchall()
        check_mail = conn.execute('SELECT * FROM users WHERE email = ?',(email,)).fetchall()

        if check_uname:
            error = "Username already exists"
            return jsonify(error=error)
        elif check_mail:
            error = "Email already exists"
            return jsonify(error=error)
        else:
            conn.execute('INSERT INTO users (email, name,password) VALUES(?,?,?)',(email,uname,hashed_password,))
            conn.commit()
            conn.close()

            return jsonify(message="Success")
        
        
@app.route('/api/login',methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json()

        if not data:
            error="Invalid Content Parsed"
            return jsonify(err=error)
        elif data['name'] == '':
            error="Username not Defined"
            return jsonify(err=error),400
        elif data['password'] == '':
            error = "password undefined"
            return jsonify(err=error),400
        
        uname = data['name']
        password = data['password']
        
        if validate_mail(uname):
            conn = sqlite3.connect('database.db')
            conn.row_factory = sqlite3.Row
            cur = conn.execute('SELECT * FROM users WHERE email = ?',(uname,))
            users = cur.fetchall()

            check = len(users)
            if check == 0:
                conn.close()
                return jsonify(err="Email not Existent!"),400
            else:
                hashed_password = users[0]['password']
                pass_check = check_password_hash(hashed_password,"".join(password))
                if pass_check:
                    conn.close()
                    return jsonify(message="Logged Successfully")
                else:
                    conn.close()
                    return jsonify(err="Wrong Password"),400
        else:
            conn = sqlite3.connect('database.db')
            conn.row_factory = sqlite3.Row
            cur = conn.execute('SELECT * FROM users WHERE name = ?',(uname,))
            users = cur.fetchall()
            num = len(users)
            if num == 0:
                return jsonify(err="User not found"),400
            else:
                username = users[0]['name']
                email = users[0]['email']
                access_token = create_access_token(identity=[username,email])
                return jsonify(message="success",token=access_token)
    else:
        return jsonify("Method is not allowed"),405

@app.route('/protected') 
@jwt_required()
def protected():
	current_user = get_jwt_identity()
	return jsonify(username=current_user[0]),200

def getRestaunt(id):
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    rest = conn.execute("SELECT * FROM restraunts WHERE id=?",(id,)).fetchone()
    conn.close()

    if rest is None:
        abort(404) 
    return rest

@app.route('/api/restraunts', methods=["POST", "GET"])
def restraunts():
    if request.method == "GET":
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        rests = conn.execute('SELECT * FROM restraunts').fetchall()
        # convert Row objects to true Tuples
        # rests = [tuple(row) for row in rests]

        # convert row to dictionary
        for i in rests:
            rest = {}
            rest["id"] = i["id"]
            rest["name"] = i["name"]
            rest["address"] = i["address"]
            rest["phone"] = i["phone"]
            rests.append(rest)

        print("This is rests", rests)
        if rests is None:
            return jsonify(msg="Add Restraunt")

        return jsonify(message="Restraunts here!",restraunts=rests)
    elif request.method == "POST":
        data = request.get_json()

        error = ""

        if not data:
            error="Invalid Content Parsed"
        elif data['name'] == '':
            error="Restraunt name not defined"
        elif data['address'] == '':
            error = "Address undefined"
        elif data['phone'] == '' or len(data['phone']) < 10:
            error = "Phone undefined"

        
        if error != "":
            return jsonify(err=error),400

        
        name = data['name']
        address = data['address']
        phone = data['phone']

        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        cur = conn.execute('SELECT * FROM restraunts WHERE name = ?',(name,))
        rests = cur.fetchall()

        check = len(rests)
        if check > 0:
            error="Restraunt Brand available"
            return jsonify(msg=error)
        else:
            conn.execute('INSERT INTO restraunts (name,address,phone) VALUES(?,?,?)',(name,address,phone,))
            conn.commit()
            conn.close()

            return jsonify(message="success",name="{} updated".format(name)),200
        

        return jsonify(message="Something went wrong"),400
    


@app.route("/api/restraunt/<int:id>", methods=['GET','POST',"PUT","DELETE"])
def fetch_restaunt(id):
    rest = getRestaunt(id)
    if request.method == "GET":
        return jsonify(name=rest["name"],address=rest['address'],phone="phone")
    elif request.method == "POST":
        data = request.get_json()

        name=data['name']
        address = data['address']
        phone=data['phone']

        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        conn.execute("UPDATE restraunts SET name=?, address=?, phone=? WHERE id=?",(name,address,phone,id,))
        conn.commit()
        conn.close()

        return jsonify(msg="Updated Successfully")
    elif request.method == "DELETE":
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        conn.execute("DELETE FROM restraunts WHERE id = ?",(id,))
        conn.commit()
        conn.close()

        return jsonify(msg="deleted successfully")
        
        
@app.route("/api/orders",methods=["GET","POST"])
@jwt_required()
def order():
    current_user = get_jwt_identity()
    username = current_user[0]
    email = current_user[1]

    if request.method == "GET":
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        user_id = conn.execute("SELECT id FROM users WHERE name= ?",(username,)).fetchone()
        user_id = tuple(user_id)
        orders = conn.execute("SELECT * FROM orders WHERE user_id=?",(user_id[0],)).fetchall()
        orders = [tuple(row) for row in orders]

        if len(orders) <= 0:
            conn.close()
            return jsonify(orders="{}, You have not placed any orders!".format(username).capitalize()),200    
        else:
            conn.close()
            return jsonify(logged_in_as=username,orders=orders),200

    elif request.method == "POST":
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        data = request.get_json()
        error = ""

        if not data:
            error="Invalid Content Parsed"
        elif data['rest_id'] == '':
            error="Restraunt not defined"
        elif data['order_total'] == '':
            error = "Order Total undefined"
        elif data['delivery_status'] == '':
            error = "Delivery Status undefined"

        
        if error != "":
            conn.close()
            return jsonify(err=error),400

        user_id = conn.execute("SELECT id FROM users WHERE name= ?",(username,)).fetchone()
        user_id = tuple(user_id)
        rest_id = data['rest_id']
        total = data["order_total"]
        status = data["delivery_status"]

        conn.execute("INSERT INTO orders (user_id,restraunt_id,order_total,delivery_status) VALUES(?,?,?,?)",(user_id[0],rest_id,total,status,))
        conn.commit()
        conn.close()
        return jsonify(msg="Order created")
    else:
        return jsonify("Method is not allowed"),405
		
		
@app.route("/api/couriers",methods=["GET"])
def couriers():
	if request.method == 'GET':
		conn = get_db_connection()
		cur = conn.execute('SELECT * FROM drivers').fetchall()
		num = len(cur)
		if num == 0:
			return jsonify(message="This resource is not available, zero drivers")
		else:
			return jsonify(data="This was it, {}".format(cur))
        
		

@app.route("/api/couriers/register", methods=["POST"])
def regcourier():
    if request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        dmail = data['email']
        dphone = data['phone']
        dname = data['name']
        dlocation = data['location']

        # validate input
        error=""
        if not data:
            error="Invalid content"
            return jsonify(error=error),500
        
        if validate_mail(dmail) and validate_phone(dphone):
            user_id = conn.execute("SELECT id FROM users WHERE email= ?",(dmail,)).fetchall()
            user_id = tuple(user_id)
            print("This was inputed below",user_id)
            # orders = conn.execute("SELECT * FROM orders WHERE user_id=?",(user_id[0],)).fetchall()
            # orders = [tuple(row) for row in orders]
            return jsonify("{}, {}".format(dmail, dphone))
        else:
            return jsonify(error="Some error occured"),400
            
        return jsonify(message="You requested data {}".format(data))

@app.errorhandler(404)
def not_found(error):
    return jsonify(error="You entered the wrong Address"),404

if __name__ == "__main__":
    app.run(debug=True)
