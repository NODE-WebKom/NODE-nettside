import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text: "PR har ansvaret for å markedsføre alle arrangementer knyttet til linjeforeningen. De tar også bilder under arrangementer. ",
    images: ["/pictures/um.jpg"],
  },


  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Det er en veldig bra komité å være med i om du er interessert i å ta bilder, videoer eller sosiale medier. Trenger ikke mye erfaring så lenge du er villig til å lære!",
    link: {url: 'https://forms.gle/kdGKjRE41jwPQYzZ8', label: 'Meld deg inn her' },
    images: ["/pictures/um.jpg"],
  },
];

export default function PRContent() {
  return <CommitteeContent tabs={tabs} />
}