import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '86b3a49aa12ef06b961a11219f93dafa6cbaabdc', queries,  });
export default client;
  