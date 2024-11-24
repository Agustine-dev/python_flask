```
# Food Delivery API

This is a Flask-based backend API for a food delivery application. It includes functionalities for user registration, login, JWT-based authentication, CRUD operations for restaurants, orders, and couriers.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/food-delivery-api.git
   cd food-delivery-api
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   python app.py
   ```

## Endpoints

- **User Registration**: `POST /api/register`
- **User Login**: `POST /api/login`
- **Protected Route**: `GET /protected`
- **Restaurants**:
  - `GET /api/restraunts`
  - `POST /api/restraunts`
  - `GET /api/restraunt/<int:id>`
  - `POST /api/restraunt/<int:id>`
  - `PUT /api/restraunt/<int:id>`
  - `DELETE /api/restraunt/<int:id>`
- **Orders**:
  - `GET /api/orders`
  - `POST /api/orders`
- **Couriers**:
  - `GET /api/couriers`
  - `GET /api/courier/<int:id>`
  - `POST /api/couriers/register`

## Error Handling

- **404 Not Found**: Returns a JSON response indicating the requested resource does not exist.

## Database

The application uses SQLite for the database. The database file is `database.db`.

## Configuration

Configuration settings are defined in `config.py`.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.
```

### config.py

```python
# Configuration settings for the Flask application

SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
JWT_SECRET_KEY = "Dese.Decent.Pups.BOOYO0OST"  # Change this!
```

# SETUP:

```bash
#!/bin/bash

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```