import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: "Økonomikomiteen har ansvaret for å forvalte inntektene våre. De lager og oppdaterer budsjettet vårt kontinuerlig i løpet av semesteret.  ",
    images: ["/pictures/um.jpg"],
  },

];

export default function OkokomContent() {
  return <CommitteeContent tabs={tabs} />
}