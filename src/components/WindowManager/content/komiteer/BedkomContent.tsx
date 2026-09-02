import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: "Teksten om bedkom her",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "events",
    label: "Events",
    text: "Teksten om events her",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Teksten om medlem her",
    images: ["/pictures/um.jpg"],
  },
];

export default function BedkomContent() {
  return <CommitteeContent tabs={tabs} />
}