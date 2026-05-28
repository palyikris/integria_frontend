export type Language = "hu" | "en" | "de";

export const t = {
  hu: {
    subtitle: "Belső visszaélés-bejelentési rendszer (2023. évi XXV. törvény)",
    secureNotice:
      "A bejelentés és az adatok kezelése végponttól végpontig védett környezetben történik.",
    sec1Title: "1. Esemény jellege",
    categoryLabel: "Bejelentés kategóriája *",
    selectDefault: "Válasszon...",
    incidentDateLabel: "Esemény becsült dátuma",
    sec2Title: "2. Bejelentés részletei",
    involvedPartiesLabel: "Érintett személy(ek) vagy osztály",
    involvedPartiesPlaceholder:
      "Kire / Melyik részlegre vonatkozik a bejelentés?",
    subjectLabel: "Rövid összefoglaló (Tárgy) *",
    contentLabel: "Részletes leírás *",
    contentPlaceholder:
      "Kérjük, írja le a lehető legrészletesebben az eseményeket...",
    sec3Title: "3. Bejelentő adatai és nyilatkozat",
    relationLabel: "Kapcsolata a szervezettel *",
    anonCheckbox: "Teljesen anonim módon teszem meg a bejelentést.",
    anonNotice:
      "(Kijelölés esetén nem kérjük el az e-mail címét, de a vizsgálat eredményéről nem fogjuk tudni közvetlenül értesíteni.)",
    emailLabel: "Értesítési e-mail cím *",
    goodFaithTitle: "Jóhiszeműségi nyilatkozat *",
    goodFaithText:
      "Kijelentem, hogy a bejelentést jóhiszeműen teszem, és a megadott információk a legjobb tudomásom szerint a valóságnak megfelelnek. Tudomásul veszem a rosszhiszemű bejelentés jogi következményeit.",
    submitBtn: "Bejelentés biztonságos benyújtása",
    submittingBtn: "Titkosított küldés folyamatban...",
    successTitle: "Sikeres bejelentés",
    successText:
      "A bejelentést biztonságosan rögzítettük a törvényi előírásoknak megfelelően.",
    suspendedTitle: "A szolgáltatás szünetel",

    categories: [
      {
        value: "Pénzügyi vagy számviteli visszaélés",
        label: "Pénzügyi vagy számviteli visszaélés",
      },
      {
        value: "Munkahelyi zaklatás / Etikai vétség",
        label: "Munkahelyi zaklatás / Etikai vétség",
      },
      {
        value: "Adatvédelmi vagy információbiztonsági incidens",
        label: "Adatvédelmi vagy információbiztonsági incidens",
      },
      {
        value: "Munkavédelmi vagy egészségügyi kockázat",
        label: "Munkavédelmi vagy egészségügyi kockázat",
      },
      { value: "Egyéb jogsértés", label: "Egyéb jogsértés" },
    ],
    relations: [
      { value: "Jelenlegi munkavállaló", label: "Jelenlegi munkavállaló" },
      { value: "Volt munkavállaló", label: "Volt munkavállaló" },
      {
        value: "Alvállalkozó / Beszállító",
        label: "Alvállalkozó / Beszállító",
      },
      { value: "Pályázó (Álláskereső)", label: "Pályázó (Álláskereső)" },
      { value: "Egyéb partner", label: "Egyéb partner" },
    ],
    attachmentLabel: "Bizonyíték csatolása (Opcionális)",
    attachmentHelper: "Támogatott formátumok: PDF, JPG, PNG (Max 5MB).",
  },
  en: {
    subtitle: "Internal Whistleblowing System (Act XXV of 2023)",
    secureNotice:
      "The report and data handling are conducted in an end-to-end secure environment.",
    sec1Title: "1. Nature of the Incident",
    categoryLabel: "Report Category *",
    selectDefault: "Please select...",
    incidentDateLabel: "Estimated Date of Incident",
    sec2Title: "2. Report Details",
    involvedPartiesLabel: "Involved Person(s) or Department",
    involvedPartiesPlaceholder: "Who or which department is this report about?",
    subjectLabel: "Brief Summary (Subject) *",
    contentLabel: "Detailed Description *",
    contentPlaceholder:
      "Please describe the events in as much detail as possible...",
    sec3Title: "3. Reporter Details & Declaration",
    relationLabel: "Relationship to the Organization *",
    anonCheckbox: "I am submitting this report completely anonymously.",
    anonNotice:
      "(If checked, we will not ask for your email address, but we will not be able to notify you directly about the investigation's outcome.)",
    emailLabel: "Notification Email Address *",
    goodFaithTitle: "Declaration of Good Faith *",
    goodFaithText:
      "I declare that I am making this report in good faith, and the information provided is true to the best of my knowledge. I acknowledge the legal consequences of making a bad faith report.",
    submitBtn: "Securely Submit Report",
    submittingBtn: "Encrypted transmission in progress...",
    successTitle: "Report Successfully Submitted",
    successText:
      "The report has been securely recorded in compliance with legal requirements.",
    suspendedTitle: "Service Suspended",

    categories: [
      {
        value: "Pénzügyi vagy számviteli visszaélés",
        label: "Financial or accounting fraud",
      },
      {
        value: "Munkahelyi zaklatás / Etikai vétség",
        label: "Workplace harassment / Ethical violation",
      },
      {
        value: "Adatvédelmi vagy információbiztonsági incidens",
        label: "Data privacy or information security incident",
      },
      {
        value: "Munkavédelmi vagy egészségügyi kockázat",
        label: "Occupational health or safety risk",
      },
      { value: "Egyéb jogsértés", label: "Other violation" },
    ],
    relations: [
      { value: "Jelenlegi munkavállaló", label: "Current Employee" },
      { value: "Volt munkavállaló", label: "Former Employee" },
      { value: "Alvállalkozó / Beszállító", label: "Contractor / Supplier" },
      { value: "Pályázó (Álláskereső)", label: "Applicant (Job Seeker)" },
      { value: "Egyéb partner", label: "Other Partner" },
    ],
    attachmentLabel: "Attach Evidence (Optional)",
    attachmentHelper: "Supported formats: PDF, JPG, PNG (Max 5MB).",
  },
  de: {
    subtitle: "Internes Hinweisgebersystem (Gesetz XXV von 2023)",
    secureNotice:
      "Die Meldung und Datenverarbeitung erfolgen in einer durchgängig sicheren Umgebung.",
    sec1Title: "1. Art des Vorfalls",
    categoryLabel: "Meldekategorie *",
    selectDefault: "Bitte wählen...",
    incidentDateLabel: "Geschätztes Datum des Vorfalls",
    sec2Title: "2. Details der Meldung",
    involvedPartiesLabel: "Beteiligte Person(en) oder Abteilung",
    involvedPartiesPlaceholder:
      "Auf wen oder welche Abteilung bezieht sich diese Meldung?",
    subjectLabel: "Kurze Zusammenfassung (Betreff) *",
    contentLabel: "Detaillierte Beschreibung *",
    contentPlaceholder:
      "Bitte beschreiben Sie die Ereignisse so detailliert wie möglich...",
    sec3Title: "3. Angaben zum Melder & Erklärung",
    relationLabel: "Beziehung zur Organisation *",
    anonCheckbox: "Ich reiche diese Meldung völlig anonym ein.",
    anonNotice:
      "(Wenn angekreuzt, fragen wir nicht nach Ihrer E-Mail-Adresse, können Sie jedoch nicht direkt über das Ergebnis der Untersuchung informieren.)",
    emailLabel: "Benachrichtigungs-E-Mail-Adresse *",
    goodFaithTitle: "Erklärung in gutem Glauben *",
    goodFaithText:
      "Ich erkläre, dass ich diese Meldung in gutem Glauben einreiche und die angegebenen Informationen nach bestem Wissen und Gewissen wahr sind. Ich nehme die rechtlichen Konsequenzen einer bösgläubigen Meldung zur Kenntnis.",
    submitBtn: "Meldung sicher einreichen",
    submittingBtn: "Verschlüsselte Übertragung läuft...",
    successTitle: "Meldung erfolgreich eingereicht",
    successText:
      "Die Meldung wurde unter Einhaltung der gesetzlichen Vorschriften sicher protokolliert.",
    suspendedTitle: "Dienst ausgesetzt",

    categories: [
      {
        value: "Pénzügyi vagy számviteli visszaélés",
        label: "Finanz- oder Buchhaltungsbetrug",
      },
      {
        value: "Munkahelyi zaklatás / Etikai vétség",
        label: "Belästigung am Arbeitsplatz / Ethischer Verstoß",
      },
      {
        value: "Adatvédelmi vagy információbiztonsági incidens",
        label: "Datenschutz- oder Informationssicherheitsvorfall",
      },
      {
        value: "Munkavédelmi vagy egészségügyi kockázat",
        label: "Arbeits- oder Gesundheitsrisiko",
      },
      { value: "Egyéb jogsértés", label: "Sonstiger Verstoß" },
    ],
    relations: [
      { value: "Jelenlegi munkavállaló", label: "Aktueller Mitarbeiter" },
      { value: "Volt munkavállaló", label: "Ehemaliger Mitarbeiter" },
      {
        value: "Alvállalkozó / Beszállító",
        label: "Auftragnehmer / Lieferant",
      },
      { value: "Pályázó (Álláskereső)", label: "Bewerber (Arbeitssuchender)" },
      { value: "Egyéb partner", label: "Anderer Partner" },
    ],
    attachmentLabel: "Beweise anhängen (Optional)",
    attachmentHelper: "Unterstützte Formate: PDF, JPG, PNG (Max. 5MB).",
  },
};
