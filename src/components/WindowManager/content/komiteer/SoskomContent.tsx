import CommitteeContent from "../CommitteeContent";

const tabs = [
  {
    id: "om",
    label: "Om",
    text:  `Sosialkomiteen planlegger alle sosiale arrangementer for linjeforeningen ,fra bankett og hyttetur til mer lavterskel tilbud som padelturnering og spillkvelder, åpent for alle på studiet.

            Komiteen består av en god mix av studenter fra alle kullene, og alle som ønsker det kan bli medlem. Som medlem er man med på å finne på aktiviteter, organisere og pynte til arrangementene, og sørge for at alt går som det skal. 

            I tillegg har sosialkomiteen egne interne samlinger, som gjør det enkelt 
            å bli godt kjent med de andre medlemmene.`,


    images: ["/window-elements/bankett.jpg"],
  },

  {
    id: "events",
    label: "Events",
    text: `- Node-Pils hver første torsdag i måneden (Diskuterbar)
          
          - Padel turnering 25.09
          
          - Halloweenfest 31.10    (Studentvillaen)
          `,
                      
    images: ["/window-elements/bankett.jpg"],
  },

  {
    id: "bliMedlem",
    label: "Bli medlem",
    text: "Teksten om medlem her",
    link: {url: 'https://forms.gle/kdGKjRE41jwPQYzZ8', label: 'Meld deg inn her' },
    images: ["/window-elements/friendgroup.png"],
  },
   
  {
    id: 'Bilder',
    label: 'Bilder',
    text: 'Kommer snart',
    images: ['/window-elements/clock.jpg ']
  },

];

export default function SoskomContent() {
  return <CommitteeContent tabs={tabs} />
}