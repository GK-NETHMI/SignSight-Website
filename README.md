# SignSight — Academic Research Project Website

Responsive static website for the final-year research project
**Dynamic Sign Language Recognition Using Computer Vision**
(SLIIT Project ID: **25-26J-404**).

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 5.3 (CDN)
- Bootstrap Icons 1.11 (CDN)
- Google Fonts: Inter + Poppins

No build step and no backend.

## Project Structure

```
SignSight-Website/
├── index.html
├── domain.html
├── milestones.html
├── documents.html
├── presentations.html
├── about.html
├── contact.html
├── components/
│   ├── navbar.html
│   └── footer.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logo.png
│   ├── ieee-research-paper.pdf
│   ├── IT22328120_Thesis Draft.pdf
│   ├── PP2 Presentation.pdf
│   ├── Proposal_Report_25-IT22328120 .pdf
│   ├── Proposal_Report_25-IT22328120  (1).pdf
│   ├── proposal-IT22328120.pdf
│   ├── proposal.pptx
│   └── TAF-25-26J-404.pdf
└── README.md
```

## Important Note About Running

This project loads `components/navbar.html` and `components/footer.html`
via JavaScript (`fetch` / `XMLHttpRequest`).

Use a local server for full behavior (recommended), not just `file://`.

## Run Locally

### Option 1 (Windows helper)

Double-click `start-server.bat`.

### Option 2 (manual server, any OS)

```zsh
cd "/Users/farsithfawzer/Desktop/Farsith AudioToSign/Website/SignSight-Website"
python3 -m http.server 5500
```

Then open:

- <http://localhost:5500/index.html>

## Assets Referenced by Pages

The pages currently reference the following filenames in `assets/`:

- `TAF-25-26J-404.pdf`
- `project-charter.pdf`
- `Proposal_Report_25-IT22328120 .pdf`
- `proposal-member-02.pdf`
- `proposal-member-03.pdf`
- `proposal-member-04.pdf`
- `status-1.pdf`
- `status-2.pdf`
- `IT22328120_Thesis Draft.pdf`
- `final-member-02.pdf`
- `final-member-03.pdf`
- `final-member-04.pdf`
- `final-group-report.pdf`
- `ieee-research-paper.pdf`
- `proposal-slides.pdf`
- `progress-1-slides.pdf`
- `PP2 Presentation.pdf`
- `final-slides.pdf`
- `proposal.pptx`

If a linked file is missing, either:

1. Add the file with the exact referenced name to `assets/`, or
2. Update the corresponding link in `documents.html` / `presentations.html`.

## Customization Guide

- **Theme colors**: update `:root` variables in `css/style.css`.
- **Footer / navbar content**: edit `components/footer.html` and `components/navbar.html`.
- **Milestone timeline**: edit `milestones.html`.
- **Document links**: edit `documents.html`.
- **Presentation links**: edit `presentations.html`.
- **Contact details**: edit `contact.html` and `components/footer.html`.
