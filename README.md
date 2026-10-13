# LevelUp

LevelUp is a small gaming website I built for my Dynamic Websites and Applications course (Assignment 1). You can browse a library of games, open a details popup for each one, and sign up for a tournament. It's based on the approved Game Zone concept and aimed at teen and adult gamers in Jamaica.

## Pages

- `index.html`: a hero heading, a carousel of highlights, a stats row and a few feature cards
- `games.html`: the game library with a category filter, cover images and a details modal
- `register.html`: the tournament registration form

Every page uses the same navbar, footer, colours and back to top button.

## Folder structure

```
LevelUp/
├── index.html
├── games.html
├── register.html
├── css/styles.css
├── js/app.js
├── images/
└── README.md
```

The `images` folder holds the three carousel photos and the six game covers. Every file has comments for each section, so the code is easy to follow: HTML by page part, CSS by section, JavaScript by function.

## Design

I went with a near-black background and a single amber accent, with square corners, flat colours and a sticky navbar. Headings use Barlow Condensed in uppercase and body text uses Barlow, both from Google Fonts. There are no gradients, glows or animations. Buttons only change colour slightly on hover, and keyboard focus always shows a visible outline. The colours are CSS variables at the top of `styles.css`, so they are easy to change.

## Built with

- HTML5 and CSS3 (`css/styles.css`), with the Barlow and Barlow Condensed fonts from Google Fonts
- Bootstrap 5.3.3 from the jsDelivr CDN, using its dark colour mode
- JavaScript (`js/app.js`)
- jQuery 3.7.1 from the jQuery CDN

## Bootstrap components

- Navbar with Collapse for the mobile menu
- Carousel for the three highlight slides on the home page
- Modal for the game details, which JavaScript fills in
- Toast for the confirmation after a successful registration
- Grid, cards, buttons, form controls, alerts and spacing utilities

## How it works

**Category filter.** The buttons on the Games page (All, Action, Racing, Puzzle, Sports) change which games are shown and update the count. The games live in a `const` array of objects, each with a title, category, rating, price, description and image. A `for` loop in `showGames` builds the cards, and `if`/`else` handles the filter and the price text.

**Details modal.** "View details" fills the modal with the game's cover, description, category, rating and price. The cards are created by JavaScript after the page loads, so I used a delegated jQuery handler, `$("#gameGrid").on("click", ".details-btn", ...)`. It reads the game's position with `$(this).data("index")` and sets the modal content with `.text()` and `.attr()`.

**Registration form.** The form uses `novalidate` and a `submit` listener. It checks that:

- the name has at least 2 characters
- the email contains an `@` and a `.`
- a tournament is selected
- the rules box is ticked

Fields that fail get Bootstrap's `is-invalid` style and a message underneath. If everything is valid, a green confirmation and a toast appear and the form clears. The site has no backend, so registrations aren't stored.

**Back to top button.** A jQuery scroll listener shows it with `.show()` once you scroll down and hides it with `.hide()` near the top. Clicking it uses `.scrollTop(0)`.

## Tournaments

The registration dropdown has one tournament per game:

- Neon Drift Grand Prix (Kingston)
- Cricket Clash Cup (Montego Bay)
- Star Striker Showdown (Online)
- Castle Siege Showdown (Online)
- Pixel Dominoes Open (Kingston)
- Brain Blocks Challenge (Online)

## Accessibility and responsiveness

Each page has one `h1` and a logical heading order. Every form control has a label and every image has `alt` text. Icon only buttons have an `aria-label`, the filter buttons use `aria-pressed`, and the result count uses `aria-live`. The Bootstrap grid keeps the pages usable on phones, tablets and desktops, and the carousel caption moves under the picture on small screens, and the game covers are never cropped because the game name is part of the picture.

## Running it

Open `index.html` in a browser. You need an internet connection because Bootstrap and jQuery load from CDNs.

## Image credits

- Carousel slide 1 (`banner.jpg`): photo by Alexey Savchenko
- Carousel slide 2 (`banner-tournaments.jpg`): photo by Giorgio Trovato
- Carousel slide 3 (`banner-community.jpg`): photo by Samsung Memory
- Game covers: generated with Gemini. The games and their titles are fictional.

## AI use

I used Claude a little for research and brainstorming, and Gemini to generate the six game cover images.

## Credits

[Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/) are used under the MIT licence.
