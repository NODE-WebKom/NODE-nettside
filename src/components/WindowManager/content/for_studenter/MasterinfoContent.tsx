import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "master",
    name: "Master",
    content: <p>Den mest anbefalte masteren er Informatikk med spesialisering i Maskinlæring på UiB. Spør nevrale nils hvis du lurer på mer om master! Det er masse bra muligheter </p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>William kan kontaktes hvis du har spørsmål. Han er nestleder i Node og har ansvaret for å være oppdatert på informasjon om både emner og mulige mastere.</p>,
  },
];

export default function MasterinfoContent() {
  return <ForStudentsContent title="Masterinfo" items={items} />;
}