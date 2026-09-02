import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "fagressurser",
    name: "Fagressurser",
    content: <p>Her skriver du informasjon om fag.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Her skriver du kontaktinformasjon.</p>,
  },
];

export default function FagressurserContent() {
  return <ForStudentsContent title="Fagressurser" items={items} />;
}