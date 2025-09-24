import { Buffer } from 'buffer';

export interface GithubConfig {
  token: string;
  repo: string; // format: owner/name
  branch: string;
}

export interface UpdateFileOptions {
  path: string; // repository path to the file
  contentJson: unknown; // will be stringified before encoding
  message: string;
}

function getGithubHeaders(token: string): HeadersInit {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
}

export async function fetchFileFromGithub(config: GithubConfig, path: string): Promise<string | null> {
  const url = `https://api.github.com/repos/${config.repo}/contents/${encodeURIComponent(path)}?ref=${encodeURIComponent(config.branch)}`;
  const res = await fetch(url, { headers: getGithubHeaders(config.token) });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub fetch error: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as { content: string; encoding: string };
  if (data.encoding !== 'base64') {
    throw new Error('Unexpected encoding from GitHub');
  }
  const decoded = Buffer.from(data.content, 'base64').toString('utf8');
  return decoded;
}

export async function updateFileOnGithub(
  config: GithubConfig,
  options: UpdateFileOptions,
): Promise<{ commitSha: string }>
{
  // First get the current file SHA (if exists)
  const getUrl = `https://api.github.com/repos/${config.repo}/contents/${encodeURIComponent(options.path)}?ref=${encodeURIComponent(config.branch)}`;
  let sha: string | undefined;
  const getRes = await fetch(getUrl, { headers: getGithubHeaders(config.token) });
  if (getRes.ok) {
    const current = await getRes.json();
    sha = current.sha;
  } else if (getRes.status !== 404) {
    throw new Error(`GitHub get file error: ${getRes.status} ${await getRes.text()}`);
  }

  const contentString = typeof options.contentJson === 'string'
    ? options.contentJson
    : JSON.stringify(options.contentJson, null, 2);
  const contentBase64 = Buffer.from(contentString, 'utf8').toString('base64');

  const putUrl = `https://api.github.com/repos/${config.repo}/contents/${encodeURIComponent(options.path)}`;
  const body = {
    message: options.message,
    content: contentBase64,
    branch: config.branch,
    sha,
  } as Record<string, unknown>;

  const putRes = await fetch(putUrl, {
    method: 'PUT',
    headers: getGithubHeaders(config.token),
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    throw new Error(`GitHub update error: ${putRes.status} ${await putRes.text()}`);
  }
  const result = await putRes.json();
  return { commitSha: result.commit?.sha };
}

export function readGithubConfigFromEnv(): GithubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) return null;
  return { token, repo, branch };
}


