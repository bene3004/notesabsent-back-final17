CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp,
    username VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp,
    heading VARCHAR(64) NOT NULL,
    description VARCHAR(64) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp,
    heading VARCHAR(64) NOT NULL,
    description VARCHAR(64) NOT NULL
);

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp,
    heading VARCHAR(64) NOT NULL,
    description VARCHAR(64) NOT NULL
);