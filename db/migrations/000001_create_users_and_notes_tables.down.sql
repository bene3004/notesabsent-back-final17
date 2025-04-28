CREATE TABLE users (
                       uid SERIAL PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       password TEXT NOT NULL,
                       created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notes (
                       nid SERIAL PRIMARY KEY,
                       heading TEXT NOT NULL,
                       description TEXT NOT NULL,
                       created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                       user_id INTEGER REFERENCES users(uid)
);