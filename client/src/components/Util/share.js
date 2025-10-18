export async function shareCurrentUrl({ title, text } = {}) {
  try {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return { ok: true, method: "share" };
    } else {
      await navigator.clipboard.writeText(url);
      return { ok: true, method: "clipboard" };
    }
  } catch (e) {
    return { ok: false, error: e?.message || "Share failed" };
  }
}