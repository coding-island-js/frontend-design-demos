"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/Button";
import styles from "./MembershipForm.module.css";

/**
 * Multi-step membership / donation funnel.
 *
 * Goals demonstrated:
 *  - One decision per step (lowers the cost of saying yes).
 *  - Accessible forms: fieldset/legend, labels, inline errors tied to inputs via
 *    aria-describedby + aria-invalid, focus moved to each step heading.
 *  - A real submission: posts to Netlify Forms (no backend/DB needed). A hidden
 *    static form on the page lets Netlify detect the fields at deploy time.
 */

type Billing = "monthly" | "once";

const TIERS = [
  { id: "supporter", name: "Supporter", suggested: 8, perk: "Member newsletter + fewer drives" },
  { id: "member", name: "Member", suggested: 15, perk: "All Supporter perks + members-only sessions" },
  { id: "producer", name: "Producer's Circle", suggested: 40, perk: "All perks + studio invites" },
] as const;

const PRESETS = [8, 15, 25, 50];

const STEPS = ["Tier", "Amount", "Details", "Confirm"] as const;

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");
}

export function MembershipForm() {
  const [step, setStep] = useState(0);
  const [tier, setTier] = useState<string>("member");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [amount, setAmount] = useState<number>(15);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; amount?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  // Focus target for each step heading (a <legend> or the success <h2>). A
  // callback ref accepts any element type, so it works on both without casts.
  const headingRef = useRef<HTMLElement | null>(null);
  const setHeadingRef = (el: HTMLElement | null) => {
    headingRef.current = el;
  };
  const nameErrId = useId();
  const emailErrId = useId();
  const amountErrId = useId();

  const focusHeading = () =>
    requestAnimationFrame(() => headingRef.current?.focus());

  const go = (next: number) => {
    setStep(next);
    focusHeading();
  };

  const validateAmount = () => {
    if (!amount || amount < 1) {
      setErrors((e) => ({ ...e, amount: "Enter an amount of $1 or more." }));
      return false;
    }
    setErrors((e) => ({ ...e, amount: undefined }));
    return true;
  };

  const validateDetails = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    setErrors((e) => ({ ...e, ...next, name: next.name, email: next.email }));
    return !next.name && !next.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = encode({
      "form-name": "membership",
      tier,
      billing,
      amount: String(amount),
      name,
      email,
    });
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
    } catch {
      /* On a non-Netlify host the POST 404s. We still show the success state
         so the flow works everywhere. */
    }
    setSubmitted(true);
    focusHeading();
  };

  const tierObj = TIERS.find((t) => t.id === tier)!;

  if (submitted) {
    return (
      <div className={styles.card}>
        <h2 className={styles.success} tabIndex={-1} ref={setHeadingRef}>
          Thank you, {name.split(" ")[0] || "friend"} 🎉
        </h2>
        <p className={styles.successText}>
          You&apos;re now a <strong>{tierObj.name}</strong> at{" "}
          <strong>
            ${amount}/{billing === "monthly" ? "mo" : "once"}
          </strong>
          . A welcome email is on its way to {email}.
        </p>
        <p className={styles.note}>
          This is a demo. It posted to Netlify Forms and took no payment. The diagram below shows
          how it would sync to Salesforce or HubSpot.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      {/* Progress */}
      <div
        className={styles.progress}
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS.length}
        aria-valuenow={step + 1}
        aria-valuetext={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
      >
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`${styles.progressStep} ${i <= step ? styles.progressDone : ""}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* STEP 1, Tier */}
      {step === 0 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend} tabIndex={-1} ref={setHeadingRef}>
            Choose how you&apos;ll support
          </legend>
          <div className={styles.tierList}>
            {TIERS.map((t) => (
              <label
                key={t.id}
                className={`${styles.tier} ${tier === t.id ? styles.tierActive : ""}`}
              >
                <input
                  type="radio"
                  name="tier-choice"
                  value={t.id}
                  checked={tier === t.id}
                  onChange={() => {
                    setTier(t.id);
                    setAmount(t.suggested);
                  }}
                  className={styles.tierRadio}
                />
                <span className={styles.tierName}>{t.name}</span>
                <span className={styles.tierSuggested}>${t.suggested}/mo suggested</span>
                <span className={styles.tierPerk}>{t.perk}</span>
              </label>
            ))}
          </div>
          <div className={styles.actions}>
            <Button type="button" onClick={() => go(1)}>
              Continue →
            </Button>
          </div>
        </fieldset>
      )}

      {/* STEP 2, Amount */}
      {step === 1 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend} tabIndex={-1} ref={setHeadingRef}>
            Pick your amount
          </legend>

          <div className={styles.billingToggle} role="group" aria-label="Billing frequency">
            <button
              type="button"
              className={`${styles.toggleBtn} ${billing === "monthly" ? styles.toggleActive : ""}`}
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${billing === "once" ? styles.toggleActive : ""}`}
              aria-pressed={billing === "once"}
              onClick={() => setBilling("once")}
            >
              One-time
            </button>
          </div>

          <div className={styles.presets}>
            {PRESETS.map((p) => (
              <button
                type="button"
                key={p}
                className={`${styles.preset} ${amount === p ? styles.presetActive : ""}`}
                aria-pressed={amount === p}
                onClick={() => {
                  setAmount(p);
                  setErrors((e) => ({ ...e, amount: undefined }));
                }}
              >
                ${p}
              </button>
            ))}
          </div>

          <label className={styles.label} htmlFor="custom-amount">
            Or enter a custom amount
          </label>
          <div className={styles.amountInputWrap}>
            <span aria-hidden="true" className={styles.currency}>
              $
            </span>
            <input
              id="custom-amount"
              type="number"
              min={1}
              inputMode="decimal"
              className={styles.amountInput}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-invalid={!!errors.amount}
              aria-describedby={errors.amount ? amountErrId : undefined}
            />
          </div>
          {errors.amount && (
            <p id={amountErrId} className={styles.error} role="alert">
              {errors.amount}
            </p>
          )}

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={() => go(0)}>
              ← Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (validateAmount()) go(2);
              }}
            >
              Continue →
            </Button>
          </div>
        </fieldset>
      )}

      {/* STEP 3, Details */}
      {step === 2 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend} tabIndex={-1} ref={setHeadingRef}>
            Your details
          </legend>

          <label className={styles.label} htmlFor="member-name">
            Full name
          </label>
          <input
            id="member-name"
            type="text"
            autoComplete="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={validateDetails}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? nameErrId : undefined}
          />
          {errors.name && (
            <p id={nameErrId} className={styles.error} role="alert">
              {errors.name}
            </p>
          )}

          <label className={styles.label} htmlFor="member-email">
            Email
          </label>
          <input
            id="member-email"
            type="email"
            autoComplete="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateDetails}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? emailErrId : undefined}
          />
          {errors.email && (
            <p id={emailErrId} className={styles.error} role="alert">
              {errors.email}
            </p>
          )}

          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={() => go(1)}>
              ← Back
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (validateDetails()) go(3);
              }}
            >
              Review →
            </Button>
          </div>
        </fieldset>
      )}

      {/* STEP 4, Confirm */}
      {step === 3 && (
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend} tabIndex={-1} ref={setHeadingRef}>
            Confirm your membership
          </legend>
          <dl className={styles.summary}>
            <div>
              <dt>Tier</dt>
              <dd>{tierObj.name}</dd>
            </div>
            <div>
              <dt>Amount</dt>
              <dd>
                ${amount} {billing === "monthly" ? "/ month" : "one-time"}
              </dd>
            </div>
            <div>
              <dt>Name</dt>
              <dd>{name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
          </dl>
          <div className={styles.actions}>
            <Button type="button" variant="ghost" onClick={() => go(2)}>
              ← Edit
            </Button>
            <Button type="submit">Become a member</Button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
