# E-commerce Platform

An E-commerce platform backend built with Node.js, Express, MongoDB, and other essential libraries. This project provides APIs for user authentication, product management, shopping cart management, order processing, and payment handling.

## Features

- **User Authentication**: Secure login and registration.
- **Product Management**: CRUD operations for products, including image uploads.
- **Shopping Cart**: Allows users to manage items in their cart.
- **Order Management**: Order creation and tracking.
- **Payment Integration**: Integrated with Stripe for secure transactions.
- **Data Validation**: Ensures input validity using Joi.
- **Environment Variables**: Configured through dotenv for sensitive data management.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, with Mongoose for schema modeling
- **Authentication**: JSON Web Tokens (JWT) for session handling
- **File Uploads**: Managed with Multer for product images
- **Payment**: Stripe API integration
- **Other Utilities**:
  - **bcrypt**: Password hashing
  - **cors**: Cross-origin resource sharing
  - **uuid**: Unique identifier generation
  - **slugify**: URL-friendly slugs for products
  - **joi-objectid**: ObjectId validation extension for Joi

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd e-commerce
