from flask import Flask, render_template, request, redirect, session, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://root:Thakur56@localhost/digital_dispensary"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'your_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"{self.email} - {self.name}"


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"{self.name} - {self.category} - {self.description} "



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/otc.html')
def otc():
    return render_template('otc.html')

@app.route('/medicines.html')
def medicines():
    return render_template('medicines.html')

@app.route('/blog1.html')
def blog1():
    return render_template('blog1.html')

@app.route('/blog2.html')
def blog2():
    return render_template('blog2.html')

@app.route('/signup.html')
def signup():
    return render_template('signup.html')
'''
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    confirm_password = request.form['confirm-password']
    

    if not name or not email or not password or not confirm_password:
        flash('Please fill out all fields.', 'danger')
        return redirect(url_for('index.html'))

    if password != confirm_password:
        flash('Passwords do not match!', 'danger')
        return redirect(url_for('index.html'))

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        flash('Account already exists! Please log in.', 'warning')
        return redirect(url_for('index.html'))

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_User = User(name=name, email=email, password=hashed_password)
    db.session.add(new_User)
    db.session.commit()

    flash('You have successfully registered!', 'success')
    #return redirect(url_for('index.html'))
  '''  
    

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        flash('Login successful!', 'success')
        return redirect(url_for('index.html'))
    else:
        flash('Invalid email or password', 'danger')
        return redirect(url_for('index.html'))


@app.route('/search')
def search():
    query = request.args.get('q')
    if not query:
        return jsonify([])

    results = Products.query.filter(
        (Products.name.ilike(f'%{query}%')) |
        (Products.category.ilike(f'%{query}%')) |
        (Products.description.ilike(f'%{query}%'))
    ).all()

    results_json = [{"name": p.name, "category": p.category, "description": p.description} for p in results]
    return jsonify(results_json)


@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    product = request.json
    cart = session.get('cart', {})

    product_id = product['id']
    if product_id in cart:
        cart[product_id]['quantity'] += 1
    else:
        cart[product_id] = {
            'name': product['name'],
            'price': product['price'],
            'quantity': 1
        }

    session['cart'] = cart
    return jsonify(success=True, cart_count=sum(item['quantity'] for item in cart.values()))

@app.route('/cart_count')
def cart_count():
    cart = session.get('cart', {})
    return jsonify(cart_count=sum(item['quantity'] for item in cart.values()))

@app.route('/cart.html')
def view_cart():
    cart = session.get('cart', {})
    return render_template('cart.html', cart=cart)

if __name__ == "__main__":
    app.run(debug=True)
