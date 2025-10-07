import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!, // do Tina Cloud
  token: process.env.TINA_TOKEN!, // do Tina Cloud
  build: {
    outputFolder: "tina",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images/menu",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Cardápio Completo",
        name: "menu",
        path: "public/data",
        format: "json",
        fields: [
          {
            type: "object",
            name: "categories",
            label: "Categorias",
            list: true,
            fields: [
              { type: "number", name: "id", label: "ID" },
              { type: "string", name: "name", label: "Nome" },
              {
                type: "object",
                name: "items",
                label: "Itens",
                list: true,
                fields: [
                  { type: "number", name: "id", label: "ID" },
                  { type: "string", name: "name", label: "Nome" },
                  { type: "string", name: "description", label: "Descrição", ui: { component: "textarea" } },
                  { type: "number", name: "price", label: "Preço" },
                  { type: "image", name: "image", label: "Imagem" },
                  { type: "boolean", name: "available", label: "Disponível" },
                  { type: "number", name: "calories", label: "Calorias" },
                  { type: "string", name: "protein", label: "Proteína" },
                  { type: "boolean", name: "isCombo", label: "É Combo" },
                  { type: "number", name: "maxSelections", label: "Máximo de Seleções" },
                  { type: "boolean", name: "hasComplements", label: "Tem Complementos" },
                  { type: "number", name: "maxComplements", label: "Máximo de Complementos" },
                  {
                    type: "object",
                    name: "subItems",
                    label: "Sub-itens (para combos)",
                    list: true,
                    fields: [
                      { type: "string", name: "id", label: "ID" },
                      { type: "string", name: "name", label: "Nome" },
                      { type: "string", name: "description", label: "Descrição", ui: { component: "textarea" } },
                    ],
                  },
                  {
                    type: "object",
                    name: "complements",
                    label: "Complementos Disponíveis",
                    list: true,
                    fields: [
                      { type: "string", name: "id", label: "ID" },
                      { type: "string", name: "name", label: "Nome" },
                      { type: "number", name: "price", label: "Preço Adicional" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
