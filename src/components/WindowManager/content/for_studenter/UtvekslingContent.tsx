import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "Utveksling",
    name: "Utveksling",
    content: <p>På AIKI er det lagt opp til at du skal dra på utveksling 4. semester. Det er mange ulike land du kan reise til, andre har tidligere dratt til Japan, Australia, Frankrike, Østerrike, USA og Hong Kong! Det er helt frie studiepoeng når du reiser på utveksling som gjør det lettere å velge en avtale som passer deg!</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Hvis du har spørsmål om utveksling og vil snakke med noen fra AIKI kan du kontakte Sigrid Mork på sigrid.mork@uib.no. Hun går tredje kull og har har selv vært på utveksling i Tokyo og kan svare på mange spørsmål.</p>,
  },
];

export default function UtvekslingContent() {
  return <ForStudentsContent title="Utveksling" items={items} />;
}