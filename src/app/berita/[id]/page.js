
import { Suspense } from "react";
import { berita } from "../../../data/berita";
import CmsContentDetail from "../../../components/CmsContentDetail";

async function DetailBeritaContent({ params }) {
  const { id } = await params;

  const fallbackItem =
    berita.find((item) => item.id === id) || null;

  return (
    <CmsContentDetail
      id={id}
      fallbackItem={fallbackItem}
    />
  );
}

export default function DetailBerita({ params }) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-[50vh] max-w-5xl px-5 py-12">
          <p className="text-stone-500">Memuat berita...</p>
        </main>
      }
    >
      <DetailBeritaContent params={params} />
    </Suspense>
  );
}
