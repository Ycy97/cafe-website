# Project audit

## Fixed
- Replaced all eight externally hosted placeholder image references with five bundled JPEG photographs. Images now load without an image service or internet access. Added accurate alt text, intrinsic dimensions, lazy loading and image decoding hints.
- Gallery links now open the corresponding photo instead of jumping to the page top.
- Content stays visible with JavaScript disabled. Mobile navigation remains available without JavaScript.
- Fixed menu description wrapping and narrow-screen form padding.
- Added skip links, navigation labels, current-page indication, filter pressed states, mobile Escape handling and hidden-menu focus protection.
- Added accessible validation errors, invalid-field focus, autocomplete and an honest demo status. The form preserves entered text and never claims to send it. Its button is disabled without JavaScript.
- Corrected conflicting opening hours and removed a dated elapsed-year claim.
- Removed the unrelated London map from the fictional address.
- Darkened copper buttons and text for improved contrast and respected reduced motion for the back-to-top action.

## Before production
- Supply verified address, phone, email, location and actual business/team photographs. The included stock photography illustrates this demonstration and is labeled as such.
- Connect the form to a real server or form service, including server-side validation and delivery handling. Currently no messages are transmitted or stored.
- Google Fonts still needs internet; system/Georgia fallbacks are included.

## Image sources
Bundled sample photographs downloaded from Unsplash image URLs (not photographs of the fictional business or its staff):
- images/espresso-bar.jpg: https://images.unsplash.com/photo-1442512595331-e89e73853f31
- images/window-seating.jpg: https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb
- images/pastries.jpg: https://images.unsplash.com/photo-1555507036-ab1f4038808a
- images/coffee-beans.jpg: https://images.unsplash.com/photo-1447933601403-0c6688de566e
- images/coffee-making.jpg: https://images.unsplash.com/photo-1495474472287-4d71bcdd2085

## Running
Open index.html directly, or serve this folder with any static web server. No build step is required.

## Verification
- JavaScript syntax check passed.
- Headless Edge: all three pages passed at 1280px, 375px and 320px; all images decoded and no horizontal overflow was detected.
- Menu filters, mobile Escape, invalid/valid form states, JavaScript-disabled navigation/content and browser error checks passed.


## Malaysian localisation and scroll animation
- Localised English to en-MY, Malaysian spelling, RM menu prices (sample prices, not currency conversions), and MYT opening hours.
- Added a Kuala Lumpur neighbourhood map and external map link for Central Market, with clear sample-location labelling. The address reference was verified against https://centralmarket.com.my/contact/ . No real shop address or phone number was invented.
- Restored once-per-section fade-in with a small upward motion. Elements are only hidden after the observer is created; no-JavaScript and reduced-motion visitors see content normally.

## Custom map, gallery and visual refresh
- Replaced the iframe with locally hosted Leaflet 1.9.4 (license in vendor/leaflet/LICENSE), custom SVG marker, popup and zoom controls. OpenStreetMap tiles still require an internet connection; attribution and a directions fallback are provided. Follow https://operations.osmfoundation.org/policies/tiles/ for deployment.
- Nine local photos in a swipeable, scroll-snap carousel. Home and About photos open a native modal dialog with previous/next controls, arrow keys, touch swiping, Escape, focus restoration and scroll locking. No automatic rotation.
- Original inline SVG cup-and-leaf identity and consistent line icons replace emoji. Solid espresso navigation remains the same colour when sticky; ivory surfaces and caramel accents provide a quieter palette.
- Additional local photo sources:
  - latte-art.jpg: https://images.unsplash.com/photo-1511081692775-05d0f180a065 (cafe interior)
  - coffee-cup.jpg: https://images.unsplash.com/photo-1509042239860-f550ce710b93
  - cafe-table.jpg: https://images.unsplash.com/photo-1445116572660-236099ec97a0
  - coffee-pour.jpg: https://images.unsplash.com/photo-1498804103079-a6351b050096 (coffee arrangement)
- Verified all pages at 1280, 375 and 320 pixels without horizontal overflow; local images decoded. Tested carousel movement, modal wraparound, keyboard navigation, Escape/focus restoration, About gallery, Leaflet popup and live tile loading. No JavaScript errors.

## Swiper carousel update
- Homepage carousel now uses locally bundled Swiper 12.0.3 (vendor/swiper), superseding the manual scroll-snap carousel described above.
- Automatically advances every four seconds, rewinds at the end, and shows three/two/one-plus-partial slides across desktop/tablet/mobile.
- Includes pause/play, touch and arrow controls. Autoplay stops while hovered, focused on photo/navigation controls, off-screen, in a hidden tab, or while the modal is open. Reduced motion disables autoplay.
- Verified autoplay advancement, pause, modal opening, 1280/375/320px layouts and reduced motion in Edge. Documentation: https://swiperjs.com/swiper-api

