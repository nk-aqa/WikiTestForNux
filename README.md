# Wikipedia: interface language test

Automated end-to-end test for changing the interface language of Wikipedia by an authorized user.
Built with **Playwright** and **TypeScript**, runs locally or in **Docker**.

## Automated test case

| Field | Value |
|---|---|
| **ID** | TC-WIKI-1 |
| **Title** | Authorized user can change the interface language |
| **Precondition** | A registered Wikipedia account exists; the interface language is English |
| **Test data** | Credentials from `.env`; target language: Italian (`it`) |

**Steps**

1. Open `https://en.wikipedia.org` and check that the Wikipedia logo is visible.
2. Open the login page and log in with the credentials from `.env`.
3. Check that the user is logged in (username is visible in the header).
4. Open **Preferences**.
5. Open the **User profile** tab and go to the **Internationalisation** section.
6. Select **Italian** in the interface language dropdown.
7. Click **Save**.

**Expected result**

- The `lang` attribute of the `<html>` element becomes `it`.
- The page heading is displayed in Italian ("Preferenze").

**Postcondition (cleanup)**

The language is switched back to English (`en`) after the test, so every run starts from the same state. This runs in `afterEach` and is verified by `lang="en"` and the heading "Preferences".

## Project structure

```
tests/                  # test scenarios
pom/pages/              # page objects (base, home, login, preferences)
utils/fixtures/         # Playwright fixtures (`app`)
playwright.config.ts
Dockerfile
docker-compose.yml
.env.example
```

## Prerequisites

- Node.js `v25.2.0` and npm (for local run)
- Docker and Docker Compose (for run in a container)
- A registered Wikipedia account

## Setup

```bash
git clone <repo-url>
cd <repo-name>
cp .env.example .env     # on Windows: copy .env.example .env
```

Fill in `.env`:

```
WIKI_USERNAME=<your username>
WIKI_PASSWORD=<your password>
```

`.env` is git-ignored and is **not** copied into the Docker image, so no credentials are stored in the repository.

## How to run

### In Docker (recommended)

```bash
docker compose up --build --abort-on-container-exit
```

Docker Compose builds the image, runs the test in a container, and mounts the report folders to the host.

### Locally

```bash
npm install
npx playwright install
npx playwright test
```

## Where to find the report

After the run, the HTML report is available on your machine (not only inside the container):

```
playwright-report/index.html
```

Open it by double-clicking the file or with:

```bash
npx playwright show-report
```

The report is kept on the host even if the test fails, because the folder is mounted as a volume (`./playwright-report:/app/playwright-report`). Traces and screenshots of failures are stored in `test-results/`.

## Notes

- Login is automated with credentials from `.env`. Wikipedia may show a captcha or block automated logins for new accounts, so use an account with some history.
- The Playwright version in the Docker image must match `@playwright/test` in `package.json`.
- The test returns the interface language to English afterwards, so it can be re-run without manual steps.