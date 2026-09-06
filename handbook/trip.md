# Kyushu itinerary

Preview: http://localhost:8081/spaces/kyushu/. This is a draft: do not push to main or publish until approved. No homepage link or public sitemap entry is present. The page declares noindex, which is not access control.

## Data

- `src/features/trip/data.ts`: dates and flexible day stops; stable place IDs.
- `src/features/trip/reference.ts`: lodging facts, source links, train seats and scenic guidance, schematic map nodes.
- `src/pages/spaces/kyushu/index.astro`: map navigation, selected detail panel, itinerary and templates.
- `src/features/trip/trip.css`: phone-width black/white information layout.

Preserve booking facts independently from flexible meals/visits. Only the two trains are explicitly booked. Approximate times are strings, not false precision. Edit matching nodes when adding map destinations; not every flexible meal requires a map node. Directions links search a place, not a verified transit itinerary.

## Research (2026-09-06)

The supplied Google Maps short link resolves to Comfort Hotel Hakata, 2-1-1 Hakata Ekimae. Official hotel information image `https://www.choice-hotels.jp/hotel/hakata/information/images/short_stay-img.jpg` explicitly shows normal check-in 15:00 and check-out 10:00. Hotel information page lists coin laundry (24h) and library cafe (10:00-24:00). Breakfast page lists free breakfast 06:30-09:30 on floor 1. Official access page lists approximately one minute walking from Hakata west exit 8. These are general hotel policies, not booking-specific guarantees. Early luggage storage was not verified.

The house is Kawamoto Villa 926 (かわもと別邸926), confirmed against the address on https://kawamoto-villa.com/926/. Its official FAQ provides check-in from 15:00, check-out by 10:00, luggage storage from 10:30, self-check-in email instructions, 24-hour baths, kitchen facilities, advance-request baby/BBQ equipment and accessibility limitations. Source links are in reference.ts. Do not publish private entry codes or booking emails.

Train times, seat allocations, facilities and scenery descriptions come from the user, not independently verified operating data. Preserve this qualification in train details. Return train booking details are supplied by the user; flight/terminal remain unknown.

## UX

White background, black text and blue links. No decorative slogans. Dates filter days and highlight city nodes; overall map drills into Fukuoka or Yufuin. Click the rail connection for train details, or places for lodging/map links. All controls have text and keyboard focus. No modal focus trap, mandatory gesture, 3D runtime or external map SDK. Source information lives in disclosures. Print shows all days. Without JavaScript the full itinerary remains readable; interactive maps and panels require JavaScript.
