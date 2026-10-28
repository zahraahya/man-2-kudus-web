"use client";

import { useEffect, useState } from "react";
import SearchableNews from "./SearchableNews";
import { getSupabase } from "../lib/supabase";
import { mapKonten } from "../lib/cms";

export default function CmsNewsArchive({ staticItems }) {
  const [items, setItems] = useState(staticItems);

  useEffect(() => {
    let active = true;

    async function load() {
      const supabase = getSupabase();

      if (!supabase) return;

      const { data, error } = await supabase
        .from("cms_contents")
        .select("*")
        .eq("is_published", true)
        .order("content_date", { ascending: false });

      if (active && !error && data) {
        setItems(data.map(mapKonten));
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [staticItems]);

  return <SearchableNews items={items} />;
}