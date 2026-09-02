import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "AIKI",
    name: "AIKI",
    content: <p>Her skriver du informasjon om fag.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Her skriver du kontaktinformasjon.</p>,
  },
];

export default function AikiContent() {
  return <ForStudentsContent title="Hva er AIKI?" items={items} />;
}