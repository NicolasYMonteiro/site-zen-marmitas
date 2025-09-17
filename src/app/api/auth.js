import { handler } from "decap-cms-backend-github";

export async function GET(request) {
  return handler(request, {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    repo: "NicolasYMonteiro/site-zen-marmitas",
    branch: "main",
  });
}

export async function POST(request) {
  return handler(request, {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    repo: "NicolasYMonteiro/site-zen-marmitas",
    branch: "main",
  });
}
