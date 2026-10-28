import TeachersDirectory from "../../components/TeachersDirectory";

export const metadata = {
  title: "Guru | MAN 2 Kudus",
  description:
    "Data guru MAN 2 Kudus dari dokumen yang ditautkan situs resmi madrasah.",
};

export default function GuruPage() {
  return <TeachersDirectory initialTab="Guru" />;
}