"use client";

import { ReactNode, useState } from "react";
import MobileAppView from "./MobileAppView";
import MobileHome from "./MobileHome";
import MobileHeader from "./MobileHeader";

import ArrangementerContent from "@/components/WindowManager/content/apps/ArrangementerContent";
import AnnonserContent from "@/components/WindowManager/content/apps/AnnonserContent";
import ChatbotContent from "@/components/WindowManager/content/chatbot/ChatbotContent";
import BedkomContent from "@/components/WindowManager/content/komiteer/BedkomContent";
import ProkomContent from "@/components/WindowManager/content/komiteer/ProkomContent";
import SoskomContent from "@/components/WindowManager/content/komiteer/SoskomContent";
import OkokomContent from "@/components/WindowManager/content/komiteer/OkokomContent";
import PRContent from "@/components/WindowManager/content/komiteer/PRContent";
import AikiContent from "@/components/WindowManager/content/for_studenter/AikiContent";
import FagressurserContent from "@/components/WindowManager/content/for_studenter/FagressurserContent";
import MasterinfoContent from "@/components/WindowManager/content/for_studenter/MasterinfoContent";
import UtvekslingContent from "@/components/WindowManager/content/for_studenter/UtvekslingContent";

type MobileApp = {
  title: string;
  content: ReactNode;
};

// Merch og Om NODE er ikke med her enda - de skal designes egen for mobil senere.
const mobileApps: Record<string, MobileApp> = {
  arrangementer: { title: "Arrangementer", content: <ArrangementerContent /> },

  chatbot: { title: "Chatbot", content: <ChatbotContent /> },

  annonser: { title: "Annonser", content: <AnnonserContent /> },

  bedkom: { title: "Bedriftskomiteen", content: <BedkomContent /> },
  prokom: { title: "Prosjektgruppen", content: <ProkomContent /> },
  soskom: { title: "Sosialkomiteen", content: <SoskomContent /> },
  okokom: { title: "Økonomikomiteen", content: <OkokomContent /> },
  pr: { title: "PR-gruppen", content: <PRContent /> },

  aiki: { title: "Hva er AIKI?", content: <AikiContent /> },
  fagressurser: { title: "Fagressurser", content: <FagressurserContent /> },
  masterinfo: { title: "Masterinfo", content: <MasterinfoContent /> },
  utveksling: { title: "Utveksling", content: <UtvekslingContent /> },
};

export default function MobileLayout() {
  const [openAppId, setOpenAppId] = useState<string | null>(null);

  // Ligger her (ikke inni MobileHome) slik at den overlever at MobileHome
  // monteres av/på når man åpner og lukker en app - da havner man tilbake
  // på riktig side i stedet for at det alltid hopper til side 1.
  const [activePage, setActivePage] = useState(0);

  const openApp = openAppId ? mobileApps[openAppId] : null;

  if (openApp) {
    return (
      <MobileAppView title={openApp.title} onClose={() => setOpenAppId(null)}>
        {openApp.content}
      </MobileAppView>
    );
  }

  return (
    <>
      <MobileHeader />
      <MobileHome
        activePage={activePage}
        onPageChange={setActivePage}
        onOpenApp={(appId) => {
          if (mobileApps[appId]) {
            setOpenAppId(appId);
          }
        }}
      />
    </>
  );
}
