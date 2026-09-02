import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "Utveksling",
    name: "Utveksling",
    content: <p>Her skriver du informasjon om fag.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Her skriver du kontaktinformasjon.</p>,
  },
];

export default function UtvekslingContent() {
  return <ForStudentsContent title="Utveksling" items={items} />;
}