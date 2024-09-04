DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS restraunts;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS rating;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS menu;

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR UNIQUE NOT NULL,
    email CHAR UNIQUE NOT NULL,
    password TEXT NOT NULL
    -- phone INTEGER UNIQUE NOT NULL
);

CREATE TABLE restraunts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name UNIQUE CHAR NOT NULL,
    address TEXT NOT NULL,
    phone INTEGER NOT NULL
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    restraunt_id INTEGER NOT NULL,
    order_total FLOAT NOT NULL,
    delivery_status BOOLEAN NOT NULL,
    FOREIGN KEY (restraunt_id) REFERENCES restraunts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE drivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name CHAR UNIQUE NOT NULL,
    phone INTEGER UNIQUE NOT NULL,
    location TEXT NOT NULL,
    email CHAR UNIQUE NOT NULL
);

CREATE TABLE rating (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restraunt_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (restraunt_id) REFERENCES restraunts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE payment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    amount FLOAT NOT NULL,
    status BOOLEAN NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    country TEXT NOT NULL,
    county TEXT NOT NULL,
    estate TEXT NOT NULL,
    street TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restraunt_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY (restraunt_id) REFERENCES restraunts(id)
);
