# SignSight — Academic Research Project Website

Modern, responsive static website for the final-year research project
**Dynamic Sign Language Recognition Using Computer Vision** by
**Jeran Mark (Mark J J)** at SLIIT (Project 25-26J-404).

## Tech stack

- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5.3 (via CDN)
- Bootstrap Icons 1.11 (via CDN)
- Google Fonts — Inter + Poppins

No build step. No backend. Just open the files in a browser or serve the
folder with any static file server.

## File structure

```
project-website/
├── index.html          Home (hero, overview, features, tech, highlights)
├── domain.html         Literature, gap, problem, objectives, methodology, tech
├── milestones.html     Timeline of 5 project milestones with marks
├── documents.html      Downloadable project documents
├── presentations.html  Slide deck cards
├── about.html          Researcher + supervision team
├── contact.html        Contact form + map + info
├── css/
│   └── style.css       Single shared stylesheet (theme, layout, responsive)
├── js/
│   └── script.js       Navbar, reveal animations, counters, form
├── images/             (reserved for future assets)
└── assets/             Place PDFs & slide decks here (filenames below)
```

## Expected asset files

Drop these files into `assets/` to make every download / view-slides button work:

- `project-charter.pdf`
- `proposal-report.pdf`
- `status-1.pdf`
- `status-2.pdf`
- `ieee-research-paper.pdf`
- `final-report.pdf`
- `checklist.pdf`
- `research-poster.pdf`
- `proposal-slides.pdf`
- `progress-1-slides.pdf`
- `progress-2-slides.pdf`
- `final-slides.pdf`

## Running locally

**Recommended** — double-click `start-server.bat`. It opens the site in your
default browser at <http://localhost:5500> with fully working download
buttons. Requires Python (or Node.js) on your PC. Close the black window
to stop the server.

**Alternative** — double-click `index.html`. The site still opens, but PDF
"Download" buttons may open the file in-browser instead of downloading.
Workaround: **right-click** any Download button → **Save link as…**.

## Customising

- **Theme colours**: edit the CSS variables at the top of `css/style.css`
  (`--primary`, `--secondary`, `--gradient-primary`, etc.).
- **Supervisor name**: replace the "Dr. Prasanna Sumathipala" entry on
  `about.html` if the official supervisor differs.
- **Dates / marks on milestones**: update `milestones.html`.
- **Contact details**: update `contact.html` and all footers.
