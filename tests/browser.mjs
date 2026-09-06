import { chromium } from "playwright";
import assert from "node:assert/strict";
const base = process.env.SITE_URL || "http://localhost:8081";
const browser = await chromium.launch({
  args: ["--enable-unsafe-swiftshader"],
});
try {
  // Layout checks do not need six simultaneous software-WebGL scenes.
  for (const width of [360, 390, 768, 820, 1280, 1440]) {
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width, height: 1000 },
    });
    for (const path of [
      "/",
      "/blog/",
      "/blog/page/2/",
      "/blog/20240419/",
      "/work/",
      "/papers/",
      "/about/",
    ]) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${width} ${path}: overflow`,
      );
    }
    await page.goto(base + "/work/");
    const summary = page
      .locator("summary")
      .filter({ hasText: "Workshop among" });
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.equal(await summary.evaluate((el) => el.parentElement.open), true);
    assert.equal(await page.locator("details[open] a").count(), 3);
    await page.goto(base + "/blog/");
    await page.getByRole("link", { name: "2 페이지", exact: true }).click();
    assert.match(page.url(), /page\/2/);
    await page.close();
  }
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base + "/");
    const host = page.locator("window-study");
    await host
      .locator("#loading[hidden]")
      .waitFor({ state: "attached", timeout: 60000 });
    await host.locator("#next").click();
    assert.equal(await host.getAttribute("data-view"), "desk");
    await host.locator("#previous").click();
    assert.equal(await host.getAttribute("data-view"), "room");
    await host.locator("#lamp").click();
    assert.equal(
      await host.locator("#lamp").getAttribute("aria-pressed"),
      "true",
    );
    await host.locator("#lamp").click();
    assert.equal(
      await host.locator("#lamp").getAttribute("aria-pressed"),
      "false",
    );
    const canvas = host.locator("canvas");
    const rect = await canvas.boundingBox();
    // Sample mouse hit testing without exposing internal Three.js state to tests.
    const point = await page.evaluate(({ x, y, width, height }) => {
      const canvas = document
        .querySelector("window-study")
        .shadowRoot.querySelector("canvas");
      for (let py = y + height * 0.2; py < y + height * 0.8; py += 5) {
        for (let px = x + width * 0.5; px < x + width * 0.95; px += 5) {
          canvas.dispatchEvent(
            new PointerEvent("pointermove", {
              clientX: px,
              clientY: py,
              pointerType: "mouse",
            }),
          );
          if (canvas.style.cursor === "pointer") return { x: px, y: py };
        }
      }
    }, rect);
    assert.ok(point, `${width}: frame hit target`);
    await page.mouse.move(point.x, point.y);
    await page.mouse.down();
    await page.mouse.move(point.x + 20, point.y + 10);
    await page.mouse.up();
    assert.equal(new URL(page.url()).pathname, "/");
    await host.locator("#reset").click();
    await page.mouse.click(point.x, point.y);
    await page.waitForURL("**/spaces/juha/index.html");
    assert.equal((await page.request.get(page.url())).status(), 200);
    assert.ok(await page.locator(".ww-home-page").count());
    // Third-party pamphlet scripts are outside the scene error check.
    assert.ok(!errors.some((message) => message.includes("window-study")));
    await page.close();
  }
  console.log(
    "Passed: six responsive widths, no-JS pagination/disclosures, two WebGL widths, lighting, frame navigation and drag cancellation.",
  );
} finally {
  await browser.close();
}
