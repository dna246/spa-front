# Prerequisites


Ensure you have Node.js and Yarn installed on your system. 

- Node.js can be downloaded from [https://nodejs.org/](https://nodejs.org/).
- Install Yarn by running `npm install --global yarn`.

# Setting Up the Project

## Clone the Repository

- git clone https://github.com/andythegril/spa-front.git

- cd your-project-directory

# Install Dependencies
Using Yarn, install the project's dependencies: `yarn install`

## Stripe integration

For Stripe integration, you will need a Stripe account and API keys. Follow the steps below:

- Sign up or log in to your Stripe account at https://stripe.com/.
- Navigate to the Developers section and find your API keys.
- Copy the `.env.example` file to a new file named `.env` and fill in your Stripe API keys

```
STRIPE_PUBLIC_KEY=<your_stripe_public_key>

STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

## Test Stripe in local environment
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
