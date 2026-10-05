import { responsive } from "./image";

const cityInsightLinks = {
  live: "https://city-insight-client.vercel.app/",
  methodology: "https://city-insight-client.vercel.app/methodology",
  client: "https://github.com/aidansoares23/city-insight-client",
  server: "https://github.com/aidansoares23/city-insight-server",
  reviewTransaction:
    "https://github.com/aidansoares23/city-insight-server/blob/6b9df11e2da532089261d1a5e85938a7b5fe0a9d/src/services/reviewService.js#L47-L133",
  ciRuns: "https://github.com/aidansoares23/city-insight-server/actions",
};

// Trimmed from upsertMyReviewForCity; "// …" marks lines left out.
const reviewTransactionCode = `const txResult = await db.runTransaction(async (tx) => {
  // …check the city exists

  const reviewSnap = await tx.get(reviewRef);
  const isNew = !reviewSnap.exists;
  const prevData = reviewSnap.exists ? reviewSnap.data() || {} : {};
  const prevRatings = normalizeRatings(prevData.ratings);

  // …read city_stats, city_metrics, and scoring norms

  // On create: delta = full new ratings. On update: delta = new − old.
  const normalizedRatings = normalizeRatings(ratings);
  const deltaCount = isNew ? 1 : 0;
  const deltaRatings = isNew
    ? normalizedRatings
    : subRatings(normalizedRatings, prevRatings);

  const nextCount = Math.max(0, prevCount + deltaCount);
  const nextSums = addRatings(prevSums, deltaRatings);
  const averages = computeAverages(nextCount, nextSums);

  // …recompute livability from the averages and metrics

  tx.set(reviewRef, reviewPatch, { merge: true });
  tx.set(statsRef, statsPatch, { merge: true });
});

invalidateCityListCache();
invalidateCityDetailsCache(cityId);`;

export const cityInsight = {
  id: "city-insight",
  label: "Featured project",
  title: "City Insight",
  summary:
    "A web application for exploring and comparing 107 California cities using public data and reviews.",
  ownership:
    "I built it as a solo capstone at Oregon State, including the React interface, Express API, data imports, and an assistant for querying the city dataset.",
  facts: [
    { label: "Stack", tech: ["React", "Node.js", "Express", "Firestore"] },
    { label: "Tests", value: "211 server tests in CI · 107 client tests" },
  ],
  links: [
    { label: "Explore City Insight", href: cityInsightLinks.live },
    { label: "How I built it", href: "/city-insight/", kind: "internal" },
    { label: "Client", href: cityInsightLinks.client, kind: "source" },
    { label: "Server", href: cityInsightLinks.server, kind: "source" },
  ],
  leadImage: {
    ...responsive("city-insight-home", [1200, 2400]),
    alt: "City Insight’s home page: “Compare California Cities Using Real Data and Real Reviews”, surrounded by floating city name pins",
    url: "city-insight-client.vercel.app",
  },
  collage: [
    {
      id: "radar",
      label: "Compare cities",
      href: "https://city-insight-client.vercel.app/compare?a=san-francisco-ca&b=sacramento-ca&c=san-diego-ca",
      image: {
        ...responsive("city-insight-radar", [700]),
        alt: "Radar chart comparing San Francisco, Sacramento, and San Diego on safety, affordability, walkability, and cleanliness",
      },
      aspect: "880 / 600",
    },
    {
      id: "card",
      label: "City scores",
      href: "https://city-insight-client.vercel.app/cities/redding-ca",
      image: {
        ...responsive("city-insight-card", [700]),
        alt: "A City Insight card for Redding: livability 99 out of 100, safety 8.8, median rent $1,323",
      },
      aspect: "682 / 530",
    },
  ],
  leadCaption: "Home page, city comparison, and a city card.",
  caseStudy: {
    description: "A web application for researching and comparing California cities.",
    overview:
      "City Insight brings public data and city reviews into one place. Visitors can explore 107 California cities, compare up to four side by side, and ask questions about the dataset.",
    ownership:
      "I built the application as a solo capstone during my final two quarters at Oregon State, with faculty mentorship. I was responsible for the React interface, Express API, Firestore data model, data imports, and AI assistant.",
    stack: ["React", "Node.js", "Express", "Firestore"],
    live: { label: "Explore City Insight", href: cityInsightLinks.live },
    sources: [
      { label: "Client", href: cityInsightLinks.client },
      { label: "Server", href: cityInsightLinks.server },
    ],
    leadImage: {
      ...responsive("city-insight-compare", [1000, 2000]),
      alt: "Comparing San Francisco, Sacramento, and San Diego on a radar chart of safety, affordability, walkability, and cleanliness",
      url: "city-insight-client.vercel.app/compare",
    },
    leadCaption: "Compare up to four cities using public metrics and review ratings.",
    sections: [
      {
        id: "data",
        title: "Bringing the data together",
        paragraphs: [
          "The application combines Census population and rent estimates, FBI crime data, and OpenAQ air-quality readings. I kept public metrics, review aggregates, and generated summaries separate in the data model, so each could be updated through its own workflow.",
          "Each data import writes only the metric fields assigned to it. Refreshing rent data, for example, leaves crime and air-quality fields untouched. Import updates also record source information and snapshots of previous and new values, making changes easier to inspect.",
          "The livability score combines several of these signals. I documented its inputs and weights so visitors can see how the comparison is made.",
        ],
        link: { label: "Read the scoring methodology", href: cityInsightLinks.methodology },
        figure: {
          aspect: "1200 / 975",
          caption: "The livability weights, as published on the methodology page.",
          image: {
            ...responsive("city-insight-livability", [700, 1200]),
            alt: "Livability score weights: community overall rating 45%, objective safety score 30%, rent affordability 15%, air quality 10%, each ranked against every city in the dataset",
          },
        },
      },
      {
        id: "reviews",
        title: "Keeping reviews and scores in sync",
        paragraphs: [
          "Changing a review also changes a city’s rating averages and livability score. I handled those updates in a single Firestore transaction, so the review and its aggregate scores commit together.",
          "The server stores running rating totals and applies the difference when a review is edited or deleted. That avoids reading every review again to calculate the new averages. Each user–city pair also maps to one review record, so another submission updates the existing review.",
          "After a successful write, the server invalidates the city-list and detail caches so subsequent requests reload the updated values.",
        ],
        callout: "Review changes and their aggregate scores commit in one transaction.",
        code: {
          file: "src/services/reviewService.js",
          href: cityInsightLinks.reviewTransaction,
          source: reviewTransactionCode,
        },
      },
      {
        id: "assistant",
        title: "An assistant that queries the application",
        paragraphs: [
          "Visitors can ask questions such as “Which cities have median rent under $2,000 and a safety score above 8?”",
          "I connected Claude to five read-only tools for looking up cities, retrieving review data, filtering, ranking, and comparing. These tools query the same underlying dataset used by the rest of the application.",
          "For recognized ranking questions, the server calculates the ordering before passing the results to Claude to explain. I also capped the tool-call loop, added request limits and a daily user quota, and recorded tool inputs and results for debugging.",
        ],
        figure: {
          aspect: "2232 / 1296",
          caption: "Claude answers through read-only tools that query the city dataset.",
          image: {
            ...responsive("city-insight-ask-ai", [1000, 2000]),
            alt: "Ask AI answering “Which cities have rent under $2,000 and a safety score above 8?” with a ranked table of seven cities and a top pick",
          },
        },
      },
      {
        id: "verification",
        title: "Checking the behavior",
        paragraphs: [
          "I separated HTTP request handling, database operations, and calculation logic so they could be tested independently. The server verifies Google sign-in and checks the session before protected actions.",
          "The project has 211 server tests covering areas such as scoring, validation, authentication, and city queries. They run in GitHub Actions on pushes and pull requests to main. Another 107 client tests cover ratings, formatting, date handling, input sanitization, and safe redirects.",
          "Cursor-based review pagination and an in-memory city cache help manage database reads as visitors browse the application.",
        ],
        link: { label: "See the CI runs", href: cityInsightLinks.ciRuns },
        figure: {
          aspect: "2000 / 1156",
          caption: "Server CI runs in GitHub Actions.",
          image: {
            ...responsive("city-insight-ci-runs", [1000, 2000]),
            alt: "GitHub Actions for the City Insight server: 35 workflow runs, the most recent seven all passing on main and the ai-assist branch",
          },
        },
      },
    ],
    demoNote: "The live application includes sample reviews to demonstrate the review and scoring features.",
  },
};

export const wildfireCommand = {
  id: "wildfire-command",
  label: "Team project",
  title: "Wildfire Command",
  summary: "A browser-based wildfire simulation game, built with a small team.",
  description: "Players use crews and aircraft to contain fires that spread with wind, weather, and terrain.",
  contribution:
    "I built the fire-spread and weather systems, including the simulation clock and how crews and aircraft suppress the fire. I also contributed to scoring, the win condition, and the interface.",
  stack: ["JavaScript", "Phaser 3", "Firebase"],
  links: [
    { label: "Play", href: "https://wildfire-command.com/" },
    { label: "Source", href: "https://github.com/hornbuck/fire-sim" },
  ],
  caption:
    "A minute of play at 4× speed: the fire front spreads with the wind and burns out behind itself.",
  image: {
    // Generated by `npm run clip` from recorded frames.
    src: "/images/wildfire-command-gameplay.webp",
    still: "/images/wildfire-command-gameplay-still.webp",
    width: 1000,
    height: 625,
    alt: "Wildfire Command gameplay: a fire spreads across grassland and forest tiles, leaving a growing burned scar behind it",
  },
};

export const redevs = {
  id: "red-evs",
  label: "Client work",
  title: "RED EVS",
  summary: "Paid client website · Wix",
  description:
    "A website for a mobile fire-apparatus mechanic in Dallas–Fort Worth. I worked with the owner on the structure and content, built the responsive Wix site, and handled domain setup and launch. I rebuilt the original React site in Wix so the owner could manage it more easily.",
  // Text-only credit: both sites have since been redesigned by others, so no screenshots or links.
  otherWork:
    "I also designed and launched paid WordPress websites for J.D. Moody Construction and Jack It Up Concrete Repair, including service pages, project photos, contact forms, and domain setup.",
  links: [{ label: "Visit site", href: "https://www.redevs.info/" }],
  caption: "Home page, redevs.info.",
  image: {
    ...responsive("redevs-home", [1000, 2000]),
    alt: "The RED EVS home page: a mechanic working on a fire engine under the headline “Fire apparatus repair and maintenance specialists”",
    url: "redevs.info",
  },
};
