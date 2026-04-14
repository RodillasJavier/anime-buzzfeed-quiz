# Anime BuzzFeed Quiz

A BuzzFeed-style personality quiz that matches the player to an anime character based on their answers.

The app is a small static frontend built with HTML, CSS, JavaScript, and jQuery. Quiz content and character results live in `data.json`, and the interface is rendered dynamically in the browser.

Deployed with Vercel: [https://anime-buzzfeed-quiz.vercel.app/](https://anime-buzzfeed-quiz.vercel.app/)

## Characters

The current quiz can match players with:

- Goku
- Gojo
- Luffy
- Tanjiro
- Guts
- Spike

## Project Structure

- `index.html`: page shell, quiz container, and results modal
- `style.css`: layout, answer states, and modal styling
- `main.js`: loads quiz data, renders questions, handles selections, and calculates results
- `data.json`: quiz title, header image, questions, answers, and character metadata
- `media/`: character art, question assets, and header imagery

## How It Works

1. `main.js` loads `data.json` with `$.getJSON(...)`.
2. The header and all quiz questions are generated from the JSON data.
3. Each answer maps to a character outcome ID.
4. When the user clicks `Done!`, the app counts the selected outcome IDs.
5. The character with the highest count is shown in the results modal.

## Running Locally

Because the app loads `data.json` over HTTP, it should be served from a local web server instead of opened directly with `file://`.

Example options:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

If you prefer Node:

```bash
npx serve .
```

## Customizing the Quiz

Most content changes only require editing `data.json`.

### Add or update characters

Each character entry includes:

- `name`
- `image`
- `description`

### Add or update questions

Each question includes:

- `question_name`
- `question_prompt`
- `question_type`
- `answers`

Supported `question_type` values:

- `text`
- `image`
- `image_text`

Each answer includes:

- `id`
- `text`
- `img_url`
- `outcome`

The `outcome` value should match a key in the `characters` object.

## Notes

- The quiz currently uses jQuery from the public CDN in `index.html`.
- Result calculation is simple highest-count matching.
- If the user clicks `Done!` before answering every question, the modal shows a validation message.
