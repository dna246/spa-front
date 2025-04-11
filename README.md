# Deployment
- Vercel deployment can be found [here](https://spa-front.vercel.app/)

# Prerequisites


Ensure you have Node.js and Yarn installed on your system. 

- Node.js can be downloaded from [https://nodejs.org/](https://nodejs.org/).
- Install Yarn by running `npm install --global yarn`.

# Setting Up the Project

## Clone the Repository

- [git clone https://github.com/dna246/spa-front.git](https://github.com/dna246/spa-front.git)

- cd your-project-directory

# Install Dependencies
Using Yarn, install the project's dependencies: `yarn install`

## MongoDB Setup

This project requires MongoDB to store data. Ensure you have MongoDB installed and running on your system or use a MongoDB cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### MongoDB Atlas

For cloud-based MongoDB services, you can use MongoDB Atlas:

1. Sign up or log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster.
3. Once the cluster is ready, navigate to the 'Database Access' section and add a new database user with appropriate permissions.
4. Go to the 'Network Access' section and whitelist your IP address or allow access from anywhere (not recommended for production).
5. Navigate to the 'Clusters' section, click on 'Connect' and choose 'Connect your application'.
6. Copy the connection string provided and replace `<password>` with the password of the database user you created.

### Environment Variables

Add the connection string to your `.env` file:

`MONGODB_URI=your_mongodb_connection_string`

## Stripe integration

For Stripe integration, you will need a Stripe account and API keys. Follow the steps below:

- Sign up or log in to your Stripe account at https://stripe.com/.
- Navigate to the Developers section and find your API keys.
- Copy the `.env.example` file to a new file named `.env` and fill in your Stripe API keys

```
STRIPE_PUBLIC_KEY=<your_stripe_public_key>

STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

### Test Stripe in local environment
- Go to https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
- Step 1: Download the CLI and log in with your Stripe account
```
$ stripe login
```
- Step 2: Forward events to your webhook
```
$ stripe listen --forward-to localhost:<YOUR-PORT-NUMBER>/webhook
```
- You will then receive a CLI key to use

> :warning: **Warning:** CLI key provided by Stripe will expire in 90 days


## Google Authentication Setup
Follow these steps to enable Google Authentication:

- Go to Google Cloud Console.
- Select or create a new project.
- Under "APIs & Services > Credentials", create OAuth client IDs.
- Add your project's authorized redirect URIs.
- Add the Google client ID and secret to the .env file:
```
GOOGLE_CLIENT_ID=<your_google_client_id>

GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```
To launch:
`yarn dev` or with a specific port `yarn dev -p <PORT-NUMBER>` 
