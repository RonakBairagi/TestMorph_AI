/**
 * Benchmark target web applications for TestMorph AI
 * Models realistic production applications with happy paths, boundary edge cases, and runtime failures.
 */

export const BENCHMARK_APPS = [
  {
    id: 'promptgenius',
    name: 'PromptGenius AI',
    url: 'https://promptgenius.ai/studio',
    badge: 'SaaS / AI Studio',
    category: 'AI Application',
    expectedOutcome: 'pass',
    description: 'Autonomous generation of production-ready system prompts and LLM architectures.',
    defaultInputs: {
      topic: 'Scalable Microservices with Rust & Kafka',
      tone: 'Engineering Authority',
      temperature: 0.7,
      maxTokens: 2048,
    },
    testPlan: [
      {
        id: 'step_1',
        title: 'Ingest DOM & Detect Input Selectors',
        targetSelector: '#topic-input',
        action: 'type',
        inputValue: 'Scalable Microservices with Rust & Kafka',
        caption: 'AI Agent scans DOM: locating #topic-input and typing prompt parameters',
        fieldLabel: 'Prompt Architecture Goal',
        delay: 1200,
        cameraFocus: { zoom: 1.25, x: -10, y: -20 },
      },
      {
        id: 'step_2',
        title: 'Configure Inference Persona & Tone',
        targetSelector: '#tone-select',
        action: 'select',
        inputValue: 'Engineering Authority',
        caption: 'Selecting specialized tone profile: Engineering Authority',
        fieldLabel: 'Target Persona Tone',
        delay: 900,
        cameraFocus: { zoom: 1.25, x: 10, y: -15 },
      },
      {
        id: 'step_3',
        title: 'Adjust Model Hyperparameters',
        targetSelector: '#temperature-slider',
        action: 'slider',
        inputValue: 0.7,
        caption: 'Calibrating creativity temperature index to 0.70',
        fieldLabel: 'Temperature Slider',
        delay: 800,
        cameraFocus: { zoom: 1.2, x: 0, y: 0 },
      },
      {
        id: 'step_4',
        title: 'Dispatch Inference & Monitor Telemetry',
        targetSelector: '#generate-btn',
        action: 'click',
        caption: 'Triggering generation request: intercepting TTFB and stream payload',
        fieldLabel: 'Generate Button',
        delay: 1500,
        cameraFocus: { zoom: 1.1, x: 0, y: 20 },
      },
      {
        id: 'step_5',
        title: 'Verify Generated Output & Token Metrics',
        targetSelector: '#output-result',
        action: 'assert',
        expectedResult: 'SYSTEM_PROMPT_GENERATED_SUCCESS',
        caption: 'Output validated: 842 tokens generated in 380ms with 100% schema integrity',
        fieldLabel: 'Rendered Output Card',
        delay: 1000,
        cameraFocus: { zoom: 1.0, x: 0, y: 0 },
      },
    ],
    generatedDemoDetails: {
      headline: 'Autonomous Architecture Showcase: PromptGenius AI',
      subheadline: 'Watch how PromptGenius transforms raw prompts into enterprise LLM specs in under 400ms.',
      duration: '18s',
      originalDuration: '32s',
      timeSaved: '14s (43% dead latency trimmed)',
      chapters: [
        { time: '0:00', label: 'DOM Ingestion' },
        { time: '0:04', label: 'Parameter Tuning' },
        { time: '0:09', label: 'Inference Execution' },
        { time: '0:14', label: 'Verified Output' },
      ],
      metrics: {
        ttfb: '142ms',
        totalLatency: '380ms',
        accessibilityScore: '98/100',
        domMutations: 18,
      },
    },
  },
  {
    id: 'payvault',
    name: 'PayVault Express',
    url: 'https://payvault.io/checkout/enterprise',
    badge: 'FinTech / E-Commerce',
    category: 'Payment Gateway',
    expectedOutcome: 'fail',
    failureType: 'EDGE_CASE_CALCULATION_BUG',
    description: 'Enterprise multi-currency checkout with promo code validation and tax calculation.',
    defaultInputs: {
      promoCode: 'DISCOUNT-300-SUPER',
      cardNumber: '4242 •••• •••• 4242',
      country: 'US - California',
    },
    testPlan: [
      {
        id: 'step_1',
        title: 'Verify Cart Subtotal & Item State',
        targetSelector: '#subtotal-amount',
        action: 'read',
        expectedValue: '$199.00',
        caption: 'Validating base enterprise subscription pricing: $199.00 USD',
        fieldLabel: 'Base Plan Subtotal',
        delay: 1000,
        cameraFocus: { zoom: 1.15, x: 0, y: -20 },
      },
      {
        id: 'step_2',
        title: 'Input Adversarial Boundary Promo Voucher',
        targetSelector: '#promo-input',
        action: 'type',
        inputValue: 'DISCOUNT-300-SUPER',
        caption: 'Injecting high-value coupon: $300 discount on $199 order (Edge Case Test)',
        fieldLabel: 'Promo Code Field',
        delay: 1200,
        cameraFocus: { zoom: 1.3, x: -10, y: 0 },
      },
      {
        id: 'step_3',
        title: 'Submit Promo Code Application',
        targetSelector: '#apply-promo-btn',
        action: 'click',
        caption: 'Triggering promo code reduction logic: calculating total after coupon',
        fieldLabel: 'Apply Voucher Button',
        delay: 900,
        cameraFocus: { zoom: 1.25, x: 15, y: 0 },
      },
      {
        id: 'step_4',
        title: 'Intercept Calculation Assertion & DOM State',
        targetSelector: '#final-total',
        action: 'assert_fail',
        caption: 'CRITICAL DEFECT DETECTED: Total calculated as -$101.00 (Negative Cart Total & Tax NaN)',
        fieldLabel: 'Order Total Display',
        delay: 1400,
        cameraFocus: { zoom: 1.35, x: 0, y: 15 },
      },
    ],
    diagnostics: {
      errorCode: 'ERR_UNHANDLED_NEGATIVE_BALANCE',
      failingSelector: '#final-total',
      failingValue: '-$101.00 (Tax: NaN)',
      httpStatus: 422,
      endpoint: 'POST /api/v1/checkout/calculate',
      severity: 'CRITICAL_BLOCKER',
      developerView: {
        stackTrace: `TypeError: Cannot read properties of negative balance (total: -101)
    at calculateTaxAndDiscounts (checkout-engine.ts:84:19)
    at updateCartState (cartStore.js:142:9)
    at HTMLButtonElement.applyPromo (checkout.js:52:7)`,
        suggestedFix: `// FIX in checkout-engine.ts line 84:
- const subtotalAfterDiscount = subtotal - promoValue;
+ const subtotalAfterDiscount = Math.max(0, subtotal - promoValue);
+ const tax = subtotalAfterDiscount > 0 ? subtotalAfterDiscount * TAX_RATE : 0;`,
        playwrightRepro: `import { test, expect } from '@playwright/test';

test('reproduce negative cart total bug with large discount', async ({ page }) => {
  await page.goto('https://payvault.io/checkout/enterprise');
  await page.fill('#promo-input', 'DISCOUNT-300-SUPER');
  await page.click('#apply-promo-btn');
  
  const totalText = await page.locator('#final-total').innerText();
  // Fails here: expected >= $0.00, received -$101.00
  expect(Number(totalText.replace('$', ''))).toBeGreaterThanOrEqual(0);
});`,
      },
      productManagerView: {
        verdict: 'NO-GO FOR PRODUCTION RELEASE',
        userImpactRisk: '94/100 (Immediate revenue leakage & cart abandonment)',
        dropoffRate: '100% of users applying coupons > subtotal freeze checkout',
        recommendation: 'Block deployment until hotfix patch is merged and automated test passes.',
      },
      judgeView: {
        resilienceScore: '38/100',
        architectureVulnerability: 'Missing client and server-side boundary condition guards.',
        maintainabilityImpact: 'High risk of silent checkout fraud and unhandled promise crashes.',
      },
      userView: {
        summary: 'When a discount code worth more than the total price is entered, the checkout screen turns negative and freezes the payment button instead of capping the discount at 100% free.',
        actionRequired: 'Update the price calculator so it never allows a negative price.',
      },
    },
  },
  {
    id: 'healthsync',
    name: 'HealthSync Telehealth',
    url: 'https://healthsync.dev/book/cardiology',
    badge: 'Healthcare / Portal',
    category: 'Booking System',
    expectedOutcome: 'fail',
    failureType: 'SERVER_EXCEPTION_500',
    description: 'Real-time specialist appointment scheduling with concurrency calendar locking.',
    defaultInputs: {
      doctor: 'Dr. Sarah Chen, MD (Cardiology)',
      slot: '02:30 PM - Today',
      symptoms: 'Acute resting tachycardia and dizziness',
    },
    testPlan: [
      {
        id: 'step_1',
        title: 'Select Practitioner & Time Window',
        targetSelector: '#slot-0230',
        action: 'click',
        caption: 'Selecting consultation slot: 02:30 PM with Dr. Sarah Chen',
        fieldLabel: 'Time Slot Picker',
        delay: 1100,
        cameraFocus: { zoom: 1.2, x: -10, y: -15 },
      },
      {
        id: 'step_2',
        title: 'Enter Patient Clinical Symptoms',
        targetSelector: '#symptoms-textarea',
        action: 'type',
        inputValue: 'Acute resting tachycardia and dizziness',
        caption: 'Entering clinical reason for consultation',
        fieldLabel: 'Symptoms Textarea',
        delay: 1200,
        cameraFocus: { zoom: 1.25, x: 0, y: 5 },
      },
      {
        id: 'step_3',
        title: 'Submit Reservation Request',
        targetSelector: '#confirm-booking-btn',
        action: 'click',
        caption: 'Attempting slot reservation: calling POST /api/v2/appointments/reserve',
        fieldLabel: 'Confirm Booking Button',
        delay: 1500,
        cameraFocus: { zoom: 1.15, x: 0, y: 25 },
      },
      {
        id: 'step_4',
        title: 'Intercept Backend Response & State',
        targetSelector: '#error-banner',
        action: 'assert_fail',
        caption: 'HTTP 500 INTERNAL SERVER ERROR: Uncaught SlotRaceConditionLockException',
        fieldLabel: 'System Error Banner',
        delay: 1300,
        cameraFocus: { zoom: 1.3, x: 0, y: 0 },
      },
    ],
    diagnostics: {
      errorCode: 'HTTP_500_LOCK_ACQUISITION_TIMEOUT',
      failingSelector: '#error-banner',
      failingValue: 'Server Error 500: Database transaction aborted',
      httpStatus: 500,
      endpoint: 'POST /api/v2/appointments/reserve',
      severity: 'HIGH_BACKEND_FAILURE',
      developerView: {
        stackTrace: `SlotRaceConditionLockException: Could not obtain distributed Redis lock on slot_2026_09_10_1430
    at acquireSlotLock (appointment-service.ts:112:15)
    at async bookAppointment (routes/appointments.ts:67:5)`,
        suggestedFix: `// FIX in appointment-service.ts line 112:
- const lock = await redis.lock(slotKey, { timeout: 100 });
+ const lock = await redis.acquireLockWithRetry(slotKey, { 
+   retries: 3, 
+   backoffMs: 150, 
+   timeout: 1500 
+ });`,
        playwrightRepro: `import { test, expect } from '@playwright/test';

test('verify appointment reservation handles slot locking cleanly', async ({ page }) => {
  await page.goto('https://healthsync.dev/book/cardiology');
  await page.click('#slot-0230');
  await page.fill('#symptoms-textarea', 'Acute resting tachycardia');
  await page.click('#confirm-booking-btn');

  // Should succeed or show polite slot conflict message, not a 500 server crash
  const status = await page.waitForResponse(res => res.url().includes('/appointments/reserve'));
  expect(status.status()).not.toBe(500);
});`,
      },
      productManagerView: {
        verdict: 'NO-GO: SEVERE USER BLOCKED IN CRITICAL MEDICAL FLOW',
        userImpactRisk: '88/100 (Patients unable to schedule urgent telehealth care)',
        dropoffRate: '24% of simultaneous slot bookings hit dead-end crash screen',
        recommendation: 'Implement distributed locking with retry policy before opening slots.',
      },
      judgeView: {
        resilienceScore: '46/100',
        architectureVulnerability: 'Inadequate distributed concurrency control under parallel bookings.',
        maintainabilityImpact: 'Requires idempotent retry handling on API gateway level.',
      },
      userView: {
        summary: 'The booking system crashed with a server error when confirming the 02:30 PM appointment because two users tried to view the calendar at the same time.',
        actionRequired: 'Retry the booking automatically in the background instead of showing a raw error code.',
      },
    },
  },
];
