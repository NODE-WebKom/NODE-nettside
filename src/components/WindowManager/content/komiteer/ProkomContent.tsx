import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: "Gruppen hvor du får lage egne prosjekter og jobbe med relevante ting for arbeidslivet.",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "events",
    label: "Events",
    text: "Vi har ulike arrangementer som SQL murder mystery, Hugging face koding og kode konkurranser. ",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Som medlem av prosjektgruppen er du med på å planlegge de ulike arrangementene og får bestemme hva som skal gjennomføres. Det er en veldig gøy gruppe å være en del av som gir god erfaring til arbeidslivet.",
    link: {url: 'https://forms.gle/kdGKjRE41jwPQYzZ8', label: 'Meld deg inn her' },
    images: ["/pictures/um.jpg"],
  },
];

export default function ProkomContent() {
  return <CommitteeContent tabs={tabs} />
}