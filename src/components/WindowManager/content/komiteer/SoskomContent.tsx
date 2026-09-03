import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: `Sosialkomiteen planlegger og gjennomfører de sosiale arrangementene til Node, med fokus på trivsel, 
          inkludering og et godt fellesskap. Målet vårt er å skape møteplasser der medlemmene kan bli bedre kjent, ha 
          det hyggelig sammen og føle seg som en del av miljøet. Vi arrangerer også interne aktiviteter for sosialkomiteen, 
          slik at vi kan styrke samholdet, motivasjonen og samarbeidet innad i gruppen.` ,

    images: ["/pictures/um.jpg"],
  },

  {
    id: "events",
    label: "Events",
    text: "Her er bilder fra de ulike eventsa vi har hatt: ",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Teksten om medlem her",
    images: ["/pictures/um.jpg"],
  },
];

export default function SoskomContent() {
  return <CommitteeContent tabs={tabs} />
}