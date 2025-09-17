import { handler } from "netlify-cms-oauth-provider";

export default async function auth(req, res) {
  await handler(req, res, {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    repo: "NicolasYMonteiro/site-zen-marmitas",
    branch: "main",
  });
}
