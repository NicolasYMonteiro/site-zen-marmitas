"use client";

import { useEffect, useMemo, useState } from 'react';

type MenuItem = {
  id: number;
  name: string;
  price?: number;
  description?: string;
  image?: string;
  available?: boolean;
  isCombo?: boolean;
  maxSelections?: number;
  subItems?: Array<{ id: string; name: string; description?: string }>;
};

type MenuCategory = { id: number; name: string; items: MenuItem[] };
type MenuData = { categories: MenuCategory[]; lastUpdated?: string };

export default function AdminPage() {
  const [data, setData] = useState<MenuData | null>(null);
  const [jsonText, setJsonText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("ADMIN_TOKEN") || "";
    setToken(stored);
  }, []);

  useEffect(() => {
    const load = async () => {
      setError(null);
      try {
        const res = await fetch("/api/menu-github");
        if (!res.ok) throw new Error("Falha ao carregar cardápio");
        const d = (await res.json()) as MenuData;
        setData(d);
        setJsonText(JSON.stringify(d, null, 2));
      } catch (e: any) {
        setError(e?.message || "Erro desconhecido");
      }
    };
    load();
  }, []);

  const parsed = useMemo(() => {
    try {
      return JSON.parse(jsonText) as MenuData;
    } catch {
      return null;
    }
  }, [jsonText]);

  const onSave = async () => {
    setSaving(true);
    setError(null);
    try {
      if (!parsed) throw new Error("JSON inválido");
      const res = await fetch("/api/menu-github", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parsed),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || "Erro ao salvar");
      setData(j.data);
      setJsonText(JSON.stringify(j.data, null, 2));
      alert("Salvo com sucesso!");
    } catch (e: any) {
      setError(e?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Admin - Cardápio</h1>

      <div style={{ margin: "12px 0", display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="password"
          placeholder="ADMIN_TOKEN"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            localStorage.setItem("ADMIN_TOKEN", e.target.value);
          }}
          style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <button onClick={onSave} disabled={saving || !parsed} style={{ padding: "8px 16px" }}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      {error ? (
        <div style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>
      ) : null}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Editor JSON</h2>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            style={{ width: "100%", height: 600, fontFamily: "monospace", fontSize: 12, padding: 8 }}
          />
        </div>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Pré-visualização</h2>
          {!parsed ? (
            <div style={{ color: "#b00020" }}>JSON inválido</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {parsed.categories?.map((cat) => (
                <div key={cat.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>{cat.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {cat.items?.map((item) => (
                      <div key={item.id} style={{ border: "1px solid #f0f0f0", borderRadius: 6, padding: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          {typeof item.price === 'number' ? (
                            <div>R$ {item.price.toFixed(2)}</div>
                          ) : null}
                        </div>
                        {item.description ? (
                          <div style={{ color: "#666", fontSize: 14, marginTop: 4 }}>{item.description}</div>
                        ) : null}
                        {item.isCombo && item.subItems?.length ? (
                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>Opções:</div>
                            <ul style={{ margin: 0, paddingLeft: 16 }}>
                              {item.subItems.map((s) => (
                                <li key={s.id} style={{ fontSize: 13 }}>{s.name}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


