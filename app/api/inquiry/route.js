const maxLength = 1600;

function clean(value, limit = maxLength) {
  return String(value || "").trim().slice(0, limit);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function inquiryPayload(body) {
  return {
    site: clean(body.site, 300),
    email: clean(body.email, 300).toLowerCase(),
    message: clean(body.bottleneck || body.message),
    pageUri: clean(body.pageUri, 500),
  };
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook capture failed with ${response.status}`);
  }
}

async function submitHubSpot(payload) {
  const portalId = process.env.HUBSPOT_PORTAL_ID?.trim();
  const formId = process.env.HUBSPOT_INQUIRY_FORM_ID?.trim();
  const siteField = process.env.HUBSPOT_INQUIRY_SITE_FIELD?.trim() || "website";
  const messageField = process.env.HUBSPOT_INQUIRY_MESSAGE_FIELD?.trim() || "message";

  if (!portalId || !formId) {
    return false;
  }

  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "email", value: payload.email },
          { name: siteField, value: payload.site },
          { name: messageField, value: payload.message || "Project context not provided yet." },
        ],
        context: {
          pageName: "Kai Perez - Service inquiry",
          pageUri: payload.pageUri || "https://kaiperez.com/",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HubSpot capture failed with ${response.status}`);
  }

  return true;
}

export async function POST(request) {
  let payload;

  try {
    payload = inquiryPayload(await request.json());
  } catch {
    return Response.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidHttpUrl(payload.site)) {
    return Response.json({ ok: false, error: "Enter a valid website URL." }, { status: 400 });
  }

  if (!isValidEmail(payload.email)) {
    return Response.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const webhookUrl = process.env.INQUIRY_CAPTURE_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      await postJson(webhookUrl, {
        ...payload,
        source: "service inquiry",
        submittedAt: new Date().toISOString(),
      });

      return Response.json({ ok: true, capturedBy: "webhook" });
    }

    if (await submitHubSpot(payload)) {
      return Response.json({ ok: true, capturedBy: "hubspot" });
    }

    return Response.json(
      {
        ok: false,
        fallback: "mailto",
        error: "Inquiry capture is not configured yet.",
      },
      { status: 202 }
    );
  } catch {
    return Response.json(
      {
        ok: false,
        fallback: "mailto",
        error: "Inquiry capture failed.",
      },
      { status: 502 }
    );
  }
}
