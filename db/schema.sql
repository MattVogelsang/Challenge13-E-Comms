-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- Connect to the new database
\c ecommerce_db;

-- Create tables
CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 10,
    category_id INTEGER REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE tag (
    id SERIAL PRIMARY KEY,
    tag_name VARCHAR(255)
);

CREATE TABLE product_tag (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tag(id) ON DELETE CASCADE,
    UNIQUE (product_id, tag_id)
);

-- Insert sample data
INSERT INTO category (category_name) VALUES
    ('Shirts'),
    ('Shorts'),
    ('Music'),
    ('Hats'),
    ('Shoes');

INSERT INTO product (product_name, price, stock, category_id) VALUES
    ('Plain T-Shirt', 14.99, 14, 1),
    ('Running Sneakers', 90.00, 25, 5),
    ('Baseball Hat', 22.99, 12, 4),
    ('Top 40 Music Compilation', 9.99, 50, 3),
    ('Cargo Shorts', 29.99, 22, 2);

INSERT INTO tag (tag_name) VALUES
    ('rock music'),
    ('pop music'),
    ('blue'),
    ('red'),
    ('green'),
    ('white'),
    ('gold'),
    ('pop culture');

INSERT INTO product_tag (product_id, tag_id) VALUES
    (1, 6),
    (1, 7),
    (1, 8),
    (2, 6),
    (3, 1),
    (3, 3),
    (3, 4),
    (3, 5),
    (4, 1),
    (4, 2),
    (4, 8),
    (5, 3);
