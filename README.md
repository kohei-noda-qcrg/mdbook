# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## Local test env setup

1. Install node modules
    ```bash
    npm i
    ```
1. Copy .env.example
    ```bash
    cp .env.example
    ```
1. Since social login is required to use mdbook, at least one or more OAuth clients must be created and environment variables must be set.
   - Create a new GitHub OAuth app
     - [Create GitHub oauth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
     - Copy the client id and client secret to GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in the .env file, respectively.
   - Create a new Google OAuth client
     - [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en)
     - Copy the client id and client secret to GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the .env file, respectively.
2. Setup local DB
     - Install [tiup](https://docs.pingcap.com/tidb/stable/quick-start-with-tidb)
     ```bash
     curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
     . ~/.profile
     ```

     - Launch the local db and push the Prisma schema into it.
     ```
     tiup playground --db 1 --pd 3 --kv 3 --without-monitor
     # Wait a minute for the cluster to finish starting...
     npm run db:push
     ```

     - You can access TiDB database the following URL
       - DATABASE_URL="mysql://root@localhost:4000/test"
       - This environment variable is set by default in the .env file.
3. Run app
    ```bash
    npm run dev
    ```
    - You can access app via http://localhost:3000
