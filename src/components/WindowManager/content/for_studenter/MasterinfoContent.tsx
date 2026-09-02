import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "master",
    name: "Master",
    content: <p>Her skriver du informasjon om fag.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Her skriver du kontaktinformasjon.</p>,
  },
];

export default function MasterinfoContent() {
  return <ForStudentsContent title="Masterinfo" items={items} />;
}