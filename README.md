# IAM Lab - Portfolio & Project Showcase

A modern portfolio and project showcase built with Phalcon PHP framework and Mithril.js. View the live site at [iamlab.tech](https://iamlab.tech/).

![IAM Lab Homepage](assets/files/Screenshot%202025-06-15%20at%2007-50-05%20.png)
*IAM Lab Homepage - Modern, Clean Interface*

## Technology Stack

- **Backend**:
    - PHP 8.0
    - Phalcon Framework
    - PostgreSQL
    - REST API

- **Frontend**:
    - Mithril.js
    - SASS/SCSS 
    - Bootstrap 4.6.2

## Quick Start

### Prerequisites

- Docker & Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheSkyNet/imalab.git
   cd imalab
   ```

2. Start Docker containers:
   ```bash
   ./phalcons up -d
   ```

3. Install dependencies:
   ```bash
   ./phalcons composer install
   ./phalcons npm install
   ```

4. Run database migrations:
   ```bash
   ./phalcon migrate
   ```

5. Seed the database with initial data (replace with your admin credentials):
   ```bash
   ./phalcon migrate:seed --email="admin@example.com" --password="YourSecurePassword123!"
   ```


 