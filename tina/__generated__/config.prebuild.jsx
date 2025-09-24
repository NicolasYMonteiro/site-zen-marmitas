// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // do Tina Cloud
  token: process.env.TINA_TOKEN,
  // do Tina Cloud
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images/uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        label: "Card\xE1pio Completo",
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
                  { type: "string", name: "description", label: "Descri\xE7\xE3o", ui: { component: "textarea" } },
                  { type: "number", name: "price", label: "Pre\xE7o" },
                  { type: "image", name: "image", label: "Imagem" },
                  { type: "boolean", name: "available", label: "Dispon\xEDvel" },
                  { type: "number", name: "calories", label: "Calorias" },
                  { type: "string", name: "protein", label: "Prote\xEDna" },
                  { type: "boolean", name: "isCombo", label: "\xC9 Combo" },
                  { type: "number", name: "maxSelections", label: "M\xE1ximo de Sele\xE7\xF5es" },
                  {
                    type: "object",
                    name: "subItems",
                    label: "Sub-itens (para combos)",
                    list: true,
                    fields: [
                      { type: "string", name: "id", label: "ID" },
                      { type: "string", name: "name", label: "Nome" },
                      { type: "string", name: "description", label: "Descri\xE7\xE3o", ui: { component: "textarea" } }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
