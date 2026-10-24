-- Run this script in MySQL Workbench or with the mysql command-line client.
-- Use a dedicated application account for anything beyond local development.
CREATE DATABASE IF NOT EXISTS devops_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE devops_portfolio;

CREATE TABLE IF NOT EXISTS contact_messages (
  id CHAR(36) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  subject VARCHAR(160) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_contact_messages_created_at (created_at)
) ENGINE=InnoDB;
