import TeachersDirectory from "../../components/TeachersDirectory";

export const metadata = {
  title: "Tenaga Kependidikan | MAN 2 Kudus",
  description:
    "Data tenaga kependidikan MAN 2 Kudus dari dokumen yang ditautkan situs resmi madrasah.",
};

export default function TenagaKependidikanPage() {
  return (
    <TeachersDirectory initialTab="Tenaga Kependidikan" />
  );
}