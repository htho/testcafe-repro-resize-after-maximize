import { fixture, test, ClientFunction } from "testcafe";

const targetWidth = 640;
const targetHeight = 480;
const targetDimensions = {width: targetWidth, height: targetHeight};

const getWindowInnerDimensions = ClientFunction(() => ({width: window.innerWidth, height: window.innerHeight}));

fixture("screenshot")
    .page("about:blank").
    // set size to something else so resize is necessary
    afterEach(async t => t.resizeWindow(targetWidth+13, targetHeight+13));

test("resizeWindow()", async t => {
    await t.resizeWindow(targetWidth, targetHeight);

    await t.expect(getWindowInnerDimensions()).eql(targetDimensions, "Window not resized properly!");
});

test("maximizeWindow() then resizeWindow() - fails", async t => {
    await t.maximizeWindow();
    
    await t.resizeWindow(targetWidth, targetHeight);
    
    await t.expect(getWindowInnerDimensions()).eql(targetDimensions, "Window not resized properly!");
});

test("maximizeWindow() then resizeWindow() twice", async t => {
    await t.maximizeWindow();
    
    await t.resizeWindow(targetWidth, targetHeight);
    await t.resizeWindow(targetWidth, targetHeight);
    
    await t.expect(getWindowInnerDimensions()).eql(targetDimensions, "Window not resized properly!");
});
