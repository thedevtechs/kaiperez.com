# Kai Perez Next.js Site

Small Next.js App Router site for Kai Perez.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## Service Inquiry Form Capture

The homepage service inquiry form posts to `POST /api/inquiry`.

To connect it to HubSpot, create a HubSpot form with fields for email, website, and message, then set:

```bash
HUBSPOT_PORTAL_ID=
HUBSPOT_INQUIRY_FORM_ID=
```

By default the endpoint submits fields named `email`, `website`, and `message`. If the HubSpot form uses different internal names, set:

```bash
HUBSPOT_INQUIRY_SITE_FIELD=website
HUBSPOT_INQUIRY_MESSAGE_FIELD=message
```

As an alternative to HubSpot, set `INQUIRY_CAPTURE_WEBHOOK_URL` to post the inquiry payload to a Zapier, Make, or custom webhook.

If no capture destination is configured, the form keeps the lead from dead-ending by opening an email fallback.

## Structure

- `app/page.jsx` renders the page and JSON-LD.
- `app/components` contains focused page components.
- `app/lib/content.js` contains editable site copy and section data.
- `app/globals.css` contains base styles and tokens.
- `app/styles/site.css` contains page-specific styling.
