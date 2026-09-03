import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: "Bedriftskomiteen er bindeleddet mellom linjeforeningen og næringslivet. Komiteen har ansvaret for å kontakte bedrifter og arrangere bedriftspresentasjoner. En bedriftspresentasjon er en kveld hvor noen representanter fra en bedrift holder en presentasjon som blir etterfulgt av en middag eller en annen sosial aktivitet.",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "events",
    label: "Events",
    text: "Vi arrangerer månedlige bedriftspresentasjoner med spennende og relevante bedrifter innenfor Kunstig intelligens. Tidligere har vi hatt presentasjoner med Pwc, EY, Kongsberggruppen og fler.",
    images: ["/pictures/um.jpg"],
  },

  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Å være med i Bedriftskomiteen gir deg et fortrinn når det kommer til å bygge et nettverk med næringslivet, samtidig som det er veldig sosialt!",
    link: {url: 'https://forms.gle/kdGKjRE41jwPQYzZ8', label: 'Meld deg inn her' },
    images: ["/pictures/um.jpg"],
  },
];

export default function BedkomContent() {
  return <CommitteeContent tabs={tabs} />
}