import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "fagressurser",
    name: "Fagressurser",
    content: <p>Hvis du skal ta fag på Naturvitenskapelig fakultet er du nødt til å søke om tilgang. Dette har frist 15. januar og 15. august.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Kontakt William eller spør nevrale nils</p>,
  },
];

export default function FagressurserContent() {
  return <ForStudentsContent title="Fagressurser" items={items} />;
}