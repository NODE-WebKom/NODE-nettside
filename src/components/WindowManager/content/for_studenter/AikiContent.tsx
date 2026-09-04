import ForStudentsContent from "../ForStudentsContent";

const items = [
  {
    id: "AIKI",
    name: "AIKI",
    content: <p>AIKI er bachelorprogrammet i Kunstig intelligens ved UiB.</p>,
  },
  {
    id: "kontakt",
    name: "Kontakt",
    content: <p>Ta kontakt med leder av linjeforeningen for mer informasjon, Magnus Paulsen.</p>,
  },
];

export default function AikiContent() {
  return <ForStudentsContent title="Hva er AIKI?" items={items} />;
}