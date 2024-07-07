## Polling Server

This is the backend server for the Polling app. It provides APIs to manage create polls and add comments.

## Setup

Follow these steps to set up the server locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/jaiswalk008/Polling-server.git
    ```

2. **Change into the project directory**:
    ```bash
    cd Polling-server
    ```

3. **Install the required dependencies**:
    ```bash
    npm install
    ```
4. Compile TypeScript files:
    ```bash
      tsc
    ```
5. **Start the server**:
    ```bash
    npm start
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `MONGODB_SRV`: MongoDB URI for connecting to the database.
- `SALT_ROUNDS`: Number of salt rounds used for password hashing.
- `JWT_SECRET_KEY`: Secret key used for JWT token generation.
- `ORIGIN`: Allowed origin for CORS (Cross-Origin Resource Sharing).
- `PORT`: Port number on which the server will run.
- `IAM_USER_ACCESS_KEY`: AWS IAM user access key
- `IAM_USER_SECRET_ACCESS_KEY`: AWS IAM user secret key

Ensure you replace the placeholder values with your actual configuration.
