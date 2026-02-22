"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Trophy,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Section = "FAR" | "AUD" | "REG"

interface MCQ {
  id: string
  topic: string
  difficulty: "Moderate" | "Hard"
  stem: string
  exhibit?: string        // optional exhibit / scenario table (pre-formatted text)
  choices: { key: "A" | "B" | "C" | "D"; text: string }[]
  correct: "A" | "B" | "C" | "D"
  explanation: string     // step-by-step rationale
  whyWrong: { key: "A" | "B" | "C" | "D"; reason: string }[]
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION BANK
// ─────────────────────────────────────────────────────────────────────────────

const QUESTIONS: Record<Section, MCQ[]> = {

  // ══════════════════════════════════════════════════════════════════════ FAR
  FAR: [
    {
      id: "far-1",
      topic: "Lease Accounting — ASC 842",
      difficulty: "Moderate",
      stem: `On January 1, Year 1, Landers Co. enters into a 4-year lease for office equipment with annual payments of $25,000 due at the end of each year. The lease does not transfer ownership, contains no purchase option, and the equipment has a 10-year useful life. Landers' incremental borrowing rate is 8%. The present value annuity factor for 4 years at 8% is 3.3121.

How should Landers classify this lease, and what is the initial right-of-use asset?`,
      choices: [
        { key: "A", text: "Finance lease; ROU asset of $82,803" },
        { key: "B", text: "Operating lease; ROU asset of $82,803" },
        { key: "C", text: "Finance lease; ROU asset of $100,000" },
        { key: "D", text: "Operating lease; no ROU asset recorded" },
      ],
      correct: "B",
      explanation: `Step 1 — Classify the lease. Under ASC 842-20-25-2, a lessee classifies a lease as finance if ANY of five criteria are met:\n• Transfer of ownership — No\n• Purchase option lessee is reasonably certain to exercise — No\n• Lease term is major part of useful life — 4 ÷ 10 = 40%, below the 75% threshold\n• PV of payments is substantially all of fair value — need fair value to confirm, but 40% economic life strongly suggests operating\n• Specialized asset with no alternative use — not indicated\n\nNone of the criteria are met → Operating lease.\n\nStep 2 — Calculate the ROU asset.\nFor an operating lease, the ROU asset = PV of lease payments (same as lease liability at commencement).\nROU asset = $25,000 × 3.3121 = $82,803\n\nAnswer: B — Operating lease; ROU asset of $82,803.`,
      whyWrong: [
        { key: "A", reason: "Finance lease classification is wrong — the 4-year term is only 40% of the 10-year useful life, well below the major part threshold." },
        { key: "C", reason: "Finance classification is wrong, and $100,000 is simply 4 × $25,000 (undiscounted) — you must use the present value." },
        { key: "D", reason: "Under ASC 842, operating leases DO record an ROU asset and lease liability. The old operating lease treatment (no balance sheet impact) was eliminated." },
      ],
    },
    {
      id: "far-2",
      topic: "Revenue Recognition — ASC 606",
      difficulty: "Moderate",
      stem: `Pinnacle Software sells a bundled contract for $120,000 that includes a software license (SSP $80,000), one year of support (SSP $30,000), and implementation training (SSP $10,000). The license is delivered immediately, training is completed on Day 1, and support is provided ratably over 12 months.

How much revenue does Pinnacle recognize on Day 1 of the contract?`,
      choices: [
        { key: "A", text: "$80,000" },
        { key: "B", text: "$90,000" },
        { key: "C", text: "$110,000" },
        { key: "D", text: "$108,000" },
      ],
      correct: "D",
      explanation: `Step 1 — Allocate the $120,000 transaction price using relative SSP.\nTotal SSP = $80,000 + $30,000 + $10,000 = $120,000. Here total SSP equals TP, so no discount to spread.\n\nActually wait — total SSP = $120,000 = TP, so allocation is 1:1:\n• License: $80,000\n• Support: $30,000\n• Training: $10,000\n\nStep 2 — Determine what's recognized on Day 1.\n• License: delivered on Day 1 (point in time) → $80,000 recognized immediately\n• Training: completed on Day 1 (point in time) → $10,000 recognized immediately\n• Support: over time, 12 months → $0 on Day 1 (recognized ratably)\n\nWait — but that gives $90,000, not $108,000. Let me re-check the allocation.\n\nTotal SSP = $120,000, TP = $120,000 — no discount. Day 1 = $80,000 + $10,000 = $90,000.\n\nAnswer: B — $90,000. (If you chose D, re-read the SSPs — they sum exactly to TP here.)`,
      choices: [
        { key: "A", text: "$80,000 (license only)" },
        { key: "B", text: "$90,000 (license + training)" },
        { key: "C", text: "$120,000 (entire contract)" },
        { key: "D", text: "$100,000 (license + training + first month support)" },
      ],
      correct: "B",
      explanation: `Step 1 — Identify performance obligations and delivery timing.\n• Software license: delivered on Day 1 → point-in-time recognition\n• Implementation training: completed on Day 1 → point-in-time recognition\n• Support: provided over 12 months → recognized ratably\n\nStep 2 — Allocate the transaction price.\nTotal SSP = $80,000 + $30,000 + $10,000 = $120,000 = transaction price (no discount).\nAllocation is direct: License $80,000 | Support $30,000 | Training $10,000.\n\nStep 3 — Revenue recognized on Day 1.\n• License: $80,000 ✓ (delivered)\n• Training: $10,000 ✓ (completed)\n• Support: $0 (not yet performed)\n\nDay 1 revenue = $80,000 + $10,000 = $90,000.`,
      whyWrong: [
        { key: "A", reason: "Ignores the training PO, which is also fully completed on Day 1." },
        { key: "C", reason: "The support PO ($30,000) is not yet performed — it must be recognized over 12 months, not upfront." },
        { key: "D", reason: "Only 1/12 of support is earned in month 1 ($2,500), not the full $20,000 implied here. Also mixes timing incorrectly." },
      ],
    },
    {
      id: "far-3",
      topic: "Bond Accounting",
      difficulty: "Hard",
      stem: `On January 1, Year 1, Cortland Corp. issues $500,000 of 6% bonds at 94, with interest paid semi-annually on June 30 and December 31. The bonds mature in 5 years. Cortland uses the straight-line method of amortization.

What is the carrying value of the bonds on December 31, Year 1 (after the second interest payment)?`,
      choices: [
        { key: "A", text: "$473,000" },
        { key: "B", text: "$476,000" },
        { key: "C", text: "$470,000" },
        { key: "D", text: "$480,000" },
      ],
      correct: "B",
      explanation: `Step 1 — Calculate the issue price and discount.\nIssue price = $500,000 × 94% = $470,000\nDiscount = $500,000 − $470,000 = $30,000\n\nStep 2 — Amortize the discount using straight-line.\nTerm = 5 years = 10 semi-annual periods\nAmortization per period = $30,000 ÷ 10 = $3,000\n\nStep 3 — Carrying value after Year 1 (2 periods).\nCarrying value = $470,000 + ($3,000 × 2) = $470,000 + $6,000 = $476,000\n\nAnswer: B — $476,000.`,
      whyWrong: [
        { key: "A", reason: "$473,000 reflects only one period of amortization ($470,000 + $3,000). After Year 1 there have been two semi-annual periods." },
        { key: "C", reason: "$470,000 is the original issue price with zero amortization applied — the discount must be amortized each period." },
        { key: "D", reason: "$480,000 would require $10,000 of amortization in Year 1, which would be $5,000/period — incorrect under straight-line with a $3,000/period rate." },
      ],
    },
    {
      id: "far-4",
      topic: "Governmental Accounting — Fund Types",
      difficulty: "Moderate",
      stem: `A city collects a special assessment from property owners to fund the construction of a new sidewalk. The construction will be accounted for in a Capital Projects Fund. The city is obligated in some manner for the special assessment debt.

Which fund should be used to account for the debt service on the special assessment bonds?`,
      choices: [
        { key: "A", text: "General Fund" },
        { key: "B", text: "Special Revenue Fund" },
        { key: "C", text: "Debt Service Fund" },
        { key: "D", text: "Enterprise Fund" },
      ],
      correct: "C",
      explanation: `Under GASB standards, when a government is obligated in some manner for special assessment debt, it must report the debt and related transactions in its financial statements.\n\nDebt service on special assessment bonds — when the government is obligated — is accounted for in the Debt Service Fund. This fund tracks resources accumulated for and payments of principal and interest on long-term debt.\n\nThe Capital Projects Fund handles the construction activity. The Debt Service Fund handles repayment of the related bonds.\n\nAnswer: C — Debt Service Fund.`,
      whyWrong: [
        { key: "A", reason: "The General Fund accounts for general government operations — not specifically earmarked debt service." },
        { key: "B", reason: "Special Revenue Funds account for revenues legally restricted to specific purposes (like grants), not debt service." },
        { key: "D", reason: "Enterprise Funds are used for business-type activities (utilities, transit) — not governmental debt service." },
      ],
    },
    {
      id: "far-5",
      topic: "Inventory — LCNRV",
      difficulty: "Moderate",
      stem: `Hargrove Inc. has the following inventory data at year-end:

Item A: Cost $40,000 | NRV $35,000
Item B: Cost $25,000 | NRV $28,000
Item C: Cost $15,000 | NRV $12,000

Hargrove applies the lower of cost or net realizable value (LCNRV) rule on an item-by-item basis.

What is the total inventory value reported on the balance sheet?`,
      choices: [
        { key: "A", text: "$75,000" },
        { key: "B", text: "$80,000" },
        { key: "C", text: "$72,000" },
        { key: "D", text: "$70,000" },
      ],
      correct: "C",
      explanation: `LCNRV rule (ASC 330): inventory is reported at the lower of cost or NRV, applied item by item.\n\nItem A: Cost $40,000 vs NRV $35,000 → report at $35,000 (write-down of $5,000)\nItem B: Cost $25,000 vs NRV $28,000 → report at $25,000 (cost is lower)\nItem C: Cost $15,000 vs NRV $12,000 → report at $12,000 (write-down of $3,000)\n\nTotal = $35,000 + $25,000 + $12,000 = $72,000\n\nAnswer: C — $72,000.`,
      whyWrong: [
        { key: "A", reason: "$75,000 applies LCNRV only to Item C but not Item A — both items with cost > NRV must be written down." },
        { key: "B", reason: "$80,000 is the total cost ($40k + $25k + $15k) with no write-downs applied." },
        { key: "D", reason: "$70,000 would result from writing Item B down to NRV ($28k), but Item B's cost ($25k) is already below NRV — no write-down needed." },
      ],
    },
  ],

  // ══════════════════════════════════════════════════════════════════════ AUD
  AUD: [
    {
      id: "aud-1",
      topic: "Risk Assessment — Audit Risk Model",
      difficulty: "Moderate",
      stem: `An auditor is assessing audit risk for a client's accounts receivable balance. The auditor determines that inherent risk is high and control risk is high.

To maintain the same overall audit risk level, which of the following actions should the auditor take regarding detection risk?`,
      choices: [
        { key: "A", text: "Set detection risk at a high level to compensate" },
        { key: "B", text: "Set detection risk at a low level by performing more extensive substantive procedures" },
        { key: "C", text: "Detection risk is not affected by inherent or control risk" },
        { key: "D", text: "Rely more heavily on internal controls to reduce detection risk" },
      ],
      correct: "B",
      explanation: `The audit risk model: AR = IR × CR × DR\n\nWhere:\n• AR = Audit Risk (the acceptable level, set by the auditor — usually low)\n• IR = Inherent Risk (high — given)\n• CR = Control Risk (high — given)\n• DR = Detection Risk (the auditor's lever)\n\nIf IR and CR are both high, the product IR × CR is large. To keep AR at an acceptably low level, DR must be set very LOW — meaning the auditor must perform extensive substantive procedures to catch misstatements that controls did not prevent or detect.\n\nAnswer: B — Set detection risk low by performing more extensive substantive procedures.`,
      whyWrong: [
        { key: "A", reason: "Setting DR high when IR and CR are both high would result in unacceptably high audit risk. DR must move in the opposite direction." },
        { key: "C", reason: "DR is entirely dependent on IR and CR within the model. It's the variable the auditor controls." },
        { key: "D", reason: "Control risk is already assessed as high — meaning controls are not reliable. You cannot rely more on controls that have already been assessed as ineffective." },
      ],
    },
    {
      id: "aud-2",
      topic: "Audit Evidence — Confirmations",
      difficulty: "Moderate",
      stem: `An auditor sends positive confirmation requests to 50 customers regarding accounts receivable balances. By the confirmation deadline, 12 responses have been received. Of the 38 non-responses, the auditor is unable to reach the customers by alternative means.

What is the most appropriate auditor response to the non-responses?`,
      choices: [
        { key: "A", text: "Conclude that the 38 balances are fairly stated because silence implies agreement" },
        { key: "B", text: "Apply alternative procedures such as examining subsequent cash receipts and shipping documents" },
        { key: "C", text: "Issue a qualified opinion due to the high non-response rate" },
        { key: "D", text: "Send a second confirmation request and accept whatever response rate results" },
      ],
      correct: "B",
      explanation: `For positive confirmations, a non-response provides NO audit evidence — the auditor cannot treat silence as agreement.\n\nWhen positive confirmations are not returned, AU-C Section 505 requires the auditor to apply alternative procedures to obtain sufficient appropriate evidence about those balances. Common alternatives include:\n• Examining subsequent cash receipts (cash received after year-end that applies to the balance)\n• Inspecting shipping documents and sales invoices supporting the balance\n• Reviewing customer correspondence\n\nIf alternative procedures cannot be performed and the non-responses are material, the auditor considers the impact on the audit opinion.\n\nAnswer: B — Apply alternative procedures.`,
      whyWrong: [
        { key: "A", reason: "Silence on a positive confirmation is NOT evidence of agreement. This is a fundamental principle — positive confirmations require an explicit response." },
        { key: "C", reason: "A high non-response rate alone does not trigger a qualified opinion. The auditor must first attempt alternative procedures before concluding on sufficiency." },
        { key: "D", reason: "Sending a second request is reasonable, but accepting any remaining non-responses without alternative procedures is not appropriate." },
      ],
    },
    {
      id: "aud-3",
      topic: "Internal Controls — Segregation of Duties",
      difficulty: "Moderate",
      stem: `A company's accounts payable clerk has the ability to add new vendors to the approved vendor master file, approve invoices for payment, and initiate wire transfers to vendors.

Which of the following best describes the internal control weakness in this scenario?`,
      choices: [
        { key: "A", text: "Lack of physical safeguards over assets" },
        { key: "B", text: "Inadequate authorization procedures" },
        { key: "C", text: "Insufficient segregation of duties, creating opportunity for fraud" },
        { key: "D", text: "Failure to perform independent reconciliations" },
      ],
      correct: "C",
      explanation: `This is a classic segregation of duties failure. The accounts payable clerk controls three incompatible functions:\n1. Custody/setup: adding vendors to the master file\n2. Authorization: approving invoices\n3. Recording/execution: initiating wire transfers\n\nWhen one person controls all three stages of a transaction, there is significant fraud risk. In this case, the clerk could create a fictitious vendor, approve fraudulent invoices, and transfer funds — completing an entire fraudulent transaction with no independent check.\n\nProper SOD separates: (1) authorization, (2) recording, and (3) custody functions.\n\nAnswer: C — Insufficient segregation of duties.`,
      whyWrong: [
        { key: "A", reason: "Physical safeguards relate to protecting physical assets (locks, access cards). The issue here is process/access control, not physical." },
        { key: "B", reason: "Inadequate authorization is a symptom but not the root description. The root cause is that one person has too many incompatible responsibilities." },
        { key: "D", reason: "Independent reconciliations are a compensating control, not the primary weakness identified. The weakness is SOD, not the absence of reconciliations." },
      ],
    },
    {
      id: "aud-4",
      topic: "Audit Opinions — Modified Reports",
      difficulty: "Hard",
      stem: `During an audit of Westmore Corp., the auditor discovers that management has not disclosed a material related-party transaction in the financial statements. Management refuses to add the disclosure. The financial statements are otherwise fairly presented.

What type of audit opinion is appropriate?`,
      choices: [
        { key: "A", text: "Unmodified opinion with an emphasis-of-matter paragraph" },
        { key: "B", text: "Qualified opinion" },
        { key: "C", text: "Adverse opinion" },
        { key: "D", text: "Disclaimer of opinion" },
      ],
      correct: "B",
      explanation: `Decision framework for modified opinions:\n\n• The misstatement (omission of required disclosure) is material\n• It is NOT pervasive — the financial statements are otherwise fairly presented\n• Management refuses to correct it\n\nWhen a misstatement is material but NOT pervasive → Qualified opinion ("except for" the specific matter).\nWhen a misstatement is material AND pervasive → Adverse opinion.\nDisclaimer → used when auditor cannot obtain sufficient evidence (scope limitation), not a disclosure issue.\n\nSince the omission is material (related-party transaction) but isolated — the rest of the statements are fine — a qualified opinion is appropriate.\n\nAnswer: B — Qualified opinion.`,
      whyWrong: [
        { key: "A", reason: "An unmodified opinion means no material misstatements. A missing required disclosure is a misstatement — unmodified is not appropriate here." },
        { key: "C", reason: "Adverse opinions are for pervasive misstatements — when the statements as a whole do not present fairly. Here, only one disclosure is missing." },
        { key: "D", reason: "A disclaimer is issued when the auditor cannot obtain sufficient evidence (scope limitation). This is a presentation/disclosure issue, not a scope issue." },
      ],
    },
    {
      id: "aud-5",
      topic: "Sampling — Attribute Sampling",
      difficulty: "Hard",
      stem: `An auditor uses attribute sampling to test controls over cash disbursements. The auditor sets a tolerable deviation rate of 5% and an expected deviation rate of 1%. After testing a sample of 100 items, the auditor finds 4 deviations.

What is the auditor's most appropriate conclusion?`,
      choices: [
        { key: "A", text: "The control is effective because 4% is below the tolerable rate of 5%" },
        { key: "B", text: "Assess control risk as lower than planned because deviations are minimal" },
        { key: "C", text: "The sample deviation rate (4%) exceeds the expected rate (1%); the auditor should evaluate whether to increase control risk assessment" },
        { key: "D", text: "Disregard the results and rely on the prior year's control assessment" },
      ],
      correct: "C",
      explanation: `In attribute sampling:\n• Tolerable deviation rate (TDR): 5% — the maximum rate the auditor will accept and still rely on the control\n• Expected deviation rate (EDR): 1% — what the auditor expected to find\n• Actual sample deviation rate: 4/100 = 4%\n\nThe 4% sample rate is below the 5% TDR — technically within tolerable limits. However, it significantly exceeds the 1% expected rate. This means the control is operating less effectively than assumed when designing the sample.\n\nThe auditor should:\n1. Consider whether the upper deviation limit (at the planned confidence level) still falls within TDR\n2. Evaluate whether to increase the assessed level of control risk\n3. Potentially expand substantive procedures to compensate\n\nSimply concluding the control is effective because 4% < 5% ignores the fact that the sample was designed assuming 1% — the actual results should trigger reassessment.\n\nAnswer: C.`,
      whyWrong: [
        { key: "A", reason: "While 4% < 5% TDR is technically correct, this ignores that the sample was designed for 1% EDR. The auditor must consider the upper deviation limit and reassess." },
        { key: "B", reason: "Finding more deviations than expected (4% vs 1%) means controls are LESS effective than planned, not more. Control risk should potentially increase, not decrease." },
        { key: "D", reason: "Disregarding current-year evidence is never appropriate. Controls must be tested in the current period." },
      ],
    },
  ],

  // ══════════════════════════════════════════════════════════════════════ REG
  REG: [
    {
      id: "reg-1",
      topic: "Individual Taxation — Filing Status",
      difficulty: "Moderate",
      stem: `Marcus and Linda separated in March of the current year but are not yet legally divorced. They have one dependent child who lived with Linda for all of the current year. Marcus paid all household expenses for the home where Linda and the child live.

Which filing status should Marcus use for the current year?`,
      choices: [
        { key: "A", text: "Single" },
        { key: "B", text: "Married Filing Separately" },
        { key: "C", text: "Head of Household" },
        { key: "D", text: "Married Filing Jointly" },
      ],
      correct: "B",
      explanation: `Marcus and Linda are not legally divorced — they are merely separated. Under IRC rules, married taxpayers who have not obtained a final divorce decree are still considered married for tax purposes.\n\nSince they are legally married, their options are:\n• Married Filing Jointly (MFJ)\n• Married Filing Separately (MFS)\n\nMarcus cannot file as Head of Household. HOH for a married taxpayer requires the taxpayer to be considered "unmarried" for tax purposes — which requires living apart from the spouse for the last 6 months of the year AND the taxpayer's home being the principal home of a dependent child.\n\nHere, the child lives with LINDA, not Marcus. Even though Marcus pays expenses, the child's principal home is Linda's — so Marcus does not qualify for HOH.\n\nMarcus should file Married Filing Separately.\n\nAnswer: B — Married Filing Separately.`,
      whyWrong: [
        { key: "A", reason: "Single status requires being unmarried or legally separated/divorced under state law. Marcus is neither — he is married and only informally separated." },
        { key: "C", reason: "HOH requires the taxpayer's home to be the principal residence of the qualifying child. The child lives with Linda, not Marcus — so Marcus fails the HOH test." },
        { key: "D", reason: "MFJ is only possible if both spouses agree to file jointly. Since they are separated and the facts don't indicate agreement, MFJ is not the required answer here." },
      ],
    },
    {
      id: "reg-2",
      topic: "Basis — Partnership",
      difficulty: "Hard",
      stem: `Donna contributes the following to the DK Partnership in exchange for a 30% interest:
• Cash: $20,000
• Equipment (FMV $50,000, adjusted basis $30,000, subject to a liability of $15,000)

The partnership assumes the liability on the equipment.

What is Donna's initial outside basis in the partnership?`,
      choices: [
        { key: "A", text: "$35,000" },
        { key: "B", text: "$50,000" },
        { key: "C", text: "$55,000" },
        { key: "D", text: "$70,000" },
      ],
      correct: "A",
      explanation: `Partnership outside basis rules (IRC §722):\n\nStarting basis = Adjusted basis of property contributed + cash contributed\nLess: Liabilities assumed by partnership (treated as a distribution to Donna)\nPlus: Donna's share of partnership liabilities (30% of the assumed liability)\n\nStep 1 — Initial calculation:\nCash contributed:              $20,000\nAdjusted basis of equipment:  $30,000\nTotal:                         $50,000\n\nStep 2 — Liability assumed by partnership:\nThe partnership assumes $15,000 of Donna's liability → treated as cash distribution to Donna: −$15,000\n\nStep 3 — Donna's share of partnership liabilities:\nDonna's 30% share of the $15,000 assumed liability: +$4,500\n\nNet liability relief = $15,000 − $4,500 = $10,500 reduction\n\nDonna's outside basis = $50,000 − $10,500 = $39,500\n\nHm — let me recheck with the standard formula:\nOutside basis = Cash + Adjusted basis of property − Net liability relief\nNet relief = Liability assumed ($15,000) − Donna's share ($15,000 × 30% = $4,500) = $10,500\nBasis = $20,000 + $30,000 − $10,500 = $39,500\n\nThe closest answer is A ($35,000), which may reflect a simplified version without the share-back. On the actual CPA exam, answer: A — $35,000 (basis of property + cash − full liability relief, before share-back if not tested that granularly).`,
      choices: [
        { key: "A", text: "$39,500" },
        { key: "B", text: "$35,000" },
        { key: "C", text: "$50,000" },
        { key: "D", text: "$70,000" },
      ],
      correct: "A",
      explanation: `Partnership outside basis (IRC §722):\n\nStep 1 — Start with basis of contributed property:\n• Cash:      $20,000\n• Equipment: $30,000 (adjusted basis, not FMV)\nSubtotal:    $50,000\n\nStep 2 — Adjust for the assumed liability.\nWhen a partnership assumes a partner's liability:\n• It reduces Donna's basis (like receiving cash): −$15,000\n• But Donna gets credit for her share of that liability (she's still 30% responsible): +$4,500\nNet reduction: $15,000 − $4,500 = $10,500\n\nStep 3 — Outside basis:\n$50,000 − $10,500 = $39,500\n\nAnswer: A — $39,500.`,
      whyWrong: [
        { key: "B", reason: "$35,000 ignores Donna's share-back of the assumed liability (30% × $15,000 = $4,500). You must add that back." },
        { key: "C", reason: "$50,000 fails to reduce basis for the liability assumed by the partnership at all." },
        { key: "D", reason: "$70,000 uses FMV of the equipment ($50,000) instead of adjusted basis ($30,000). Contributed property is always measured at adjusted basis for outside basis purposes." },
      ],
    },
    {
      id: "reg-3",
      topic: "Corporate Taxation — Dividends Received Deduction",
      difficulty: "Moderate",
      stem: `Crestline Corp. (a C corporation) owns 25% of the stock of Dalton Corp. During the year, Crestline receives a $100,000 dividend from Dalton.

What is Crestline's dividends received deduction (DRD) for the current year, assuming no taxable income limitation applies?`,
      choices: [
        { key: "A", text: "$50,000" },
        { key: "B", text: "$65,000" },
        { key: "C", text: "$80,000" },
        { key: "D", text: "$100,000" },
      ],
      correct: "C",
      explanation: `The Dividends Received Deduction (DRD) under IRC §243 reduces double taxation on inter-corporate dividends. The deduction percentage depends on the receiving corporation's ownership percentage:\n\n• Less than 20% ownership → 50% DRD\n• 20% to less than 80% ownership → 65% DRD\n• 80% or more ownership (affiliated group) → 100% DRD\n\nCrestline owns 25% of Dalton → falls in the 20%–80% range → 65% DRD.\n\nDRD = $100,000 × 65% = $65,000\n\nWait — re-checking current law. The TCJA (2017) changed the rates:\n• <20% ownership: 50%\n• 20%–<80%: 65%\n• ≥80%: 100%\n\n25% ownership → 65% DRD = $65,000.\n\nAnswer: B — $65,000.`,
      choices: [
        { key: "A", text: "$50,000" },
        { key: "B", text: "$65,000" },
        { key: "C", text: "$80,000" },
        { key: "D", text: "$100,000" },
      ],
      correct: "B",
      explanation: `The Dividends Received Deduction (DRD) — IRC §243 (post-TCJA rates):\n\n• Less than 20% ownership → 50% DRD\n• 20% to less than 80% ownership → 65% DRD\n• 80% or more (affiliated group) → 100% DRD\n\nCrestline owns 25% of Dalton → 20%–80% bracket → 65% DRD.\n\nDRD = $100,000 × 65% = $65,000\n\nAnswer: B — $65,000.`,
      whyWrong: [
        { key: "A", reason: "$50,000 is the DRD for less than 20% ownership. Crestline owns 25% — it falls in the 65% bracket." },
        { key: "C", reason: "$80,000 (80% DRD) was the pre-TCJA rate for 20%–80% ownership. The TCJA reduced this to 65%." },
        { key: "D", reason: "$100,000 (100% DRD) applies only to affiliated groups with 80%+ ownership. Crestline owns only 25%." },
      ],
    },
    {
      id: "reg-4",
      topic: "Business Law — Agency",
      difficulty: "Moderate",
      stem: `Paula, a real estate agent, is authorized to sell Wilson's home for no less than $400,000. Without Wilson's knowledge, Paula accepts an offer of $385,000 from a buyer and signs a purchase agreement on Wilson's behalf.

Which of the following best describes the legal effect of Paula's actions?`,
      choices: [
        { key: "A", text: "The contract is void because Paula lacked authority" },
        { key: "B", text: "The contract is voidable by Wilson because Paula exceeded her actual authority" },
        { key: "C", text: "The contract is binding on Wilson because the buyer had apparent authority" },
        { key: "D", text: "Paula has apparent authority, so the contract binds Wilson" },
      ],
      correct: "B",
      explanation: `Agency authority framework:\n• Actual authority (express): Paula was authorized to sell for no less than $400,000 — she exceeded this limit by accepting $385,000\n• Apparent authority: exists when a third party reasonably believes the agent has authority based on the principal's conduct — requires the PRINCIPAL to have created that appearance\n\nPaula had NO actual authority to accept less than $400,000. The question is whether apparent authority exists.\n\nFor apparent authority to bind Wilson, the BUYER must have reasonably believed Paula had authority based on Wilson's (the principal's) representations — not just Paula's own actions.\n\nIf the buyer had no reason to know of the $400,000 floor and reasonably believed Paula could accept $385,000, the contract may be voidable rather than void (not automatically void because Paula's authority wasn't zero — she had authority to sell, just not below $400k).\n\nWilson can ratify or disaffirm. Since Paula exceeded actual authority, the contract is voidable by Wilson.\n\nAnswer: B — Voidable by Wilson.`,
      whyWrong: [
        { key: "A", reason: "The contract is not void — Paula had authority to sell (just not below $400k). Exceeding authority makes a contract voidable, not void." },
        { key: "C", reason: "The buyer doesn't have authority — you're confusing the buyer with the agent. Apparent authority applies to the agent (Paula), not the buyer." },
        { key: "D", reason: "Apparent authority requires the PRINCIPAL (Wilson) to have created the appearance of authority. Paula cannot create her own apparent authority through her own actions." },
      ],
    },
    {
      id: "reg-5",
      topic: "S Corporation — Shareholder Basis",
      difficulty: "Hard",
      stem: `At the beginning of Year 1, Owen's basis in his S corporation stock is $30,000. He also has a $10,000 loan to the S corporation. During Year 1, the S corporation reports:\n• Ordinary loss: $45,000\n• Tax-exempt income: $5,000\nOwen owns 100% of the S corporation.

How much of the loss can Owen deduct in Year 1, and what is his stock basis after the allowed deductions?`,
      choices: [
        { key: "A", text: "Deduct $35,000; stock basis $0" },
        { key: "B", text: "Deduct $40,000; stock basis $0, debt basis $0" },
        { key: "C", text: "Deduct $45,000; stock basis $0" },
        { key: "D", text: "Deduct $35,000; stock basis $0, debt basis $5,000" },
      ],
      correct: "D",
      explanation: `S corporation loss deductibility is limited to the shareholder's basis in stock + basis in any direct loans to the corporation.\n\nStep 1 — Adjust stock basis for income BEFORE losses:\nOpening stock basis:     $30,000\n+ Tax-exempt income:     + $5,000  (increases basis per IRC §1367)\nAdjusted stock basis:   $35,000\n\nStep 2 — Total basis available:\nStock basis:  $35,000\nDebt basis:   $10,000\nTotal:        $45,000\n\nStep 3 — Apply the $45,000 ordinary loss:\nFirst reduce stock basis: $35,000 → $0 (absorbs $35,000 of loss)\nThen reduce debt basis:   $10,000 → reduces by remaining $10,000 → $0\nTotal loss absorbed:      $45,000\n\nBut wait — that means Owen can deduct all $45,000 (answer C). However, let me re-examine...\n\nActually with $35,000 stock basis + $10,000 debt basis = $45,000 total, the entire $45,000 loss IS deductible.\n\nStock basis after: $0. Debt basis after: $0.\n\nThe correct answer is B if the full loss is allowed. But D ($35,000 deductible, debt basis $5,000 remaining) would be correct if debt basis is only partially used.\n\nLet me recalculate carefully:\nStock basis + tax-exempt: $35,000\nDebt basis: $10,000\nTotal available: $45,000\nLoss: $45,000 → fully deductible.\nStock basis: $0. Debt basis: $0. → Answer B.\n\nAnswer: B — Deduct $40,000; stock basis $0, debt basis $0.\n\nWait — $40,000 doesn't match either. The correct answer with $35k stock + $10k debt = $45k available vs $45k loss → all deductible. Answer B ($40,000) seems to have a different starting point.\n\nCorrect answer: D reflects $35,000 deductible (stock basis only) + $5,000 remaining debt basis — this would apply if debt basis is not used until stock basis is zero AND there's a nuance in the calculation. On the CPA exam, the correct treatment: stock basis fully absorbs first, then debt basis. With $35k stock and $10k debt against $45k loss → $45k deductible, both bases to zero.`,
      choices: [
        { key: "A", text: "Deduct $30,000; stock basis $0, no debt basis used" },
        { key: "B", text: "Deduct $45,000; stock basis $0, debt basis $0" },
        { key: "C", text: "Deduct $35,000; stock basis $0, debt basis $10,000 intact" },
        { key: "D", text: "Deduct $45,000; stock basis $5,000 remaining" },
      ],
      correct: "B",
      explanation: `S corporation loss deduction — IRC §1366 and §1367:\n\nStep 1 — Adjust stock basis for tax-exempt income FIRST (income items increase basis before losses reduce it):\nOpening stock basis:   $30,000\n+ Tax-exempt income:  +$ 5,000\nAdjusted stock basis:  $35,000\n\nStep 2 — Total basis available for loss deduction:\nStock basis:  $35,000\nDebt basis:   $10,000 (direct loan from Owen to S corp)\nTotal:        $45,000\n\nStep 3 — Apply the $45,000 ordinary loss:\nLoss first reduces stock basis to $0 (absorbs $35,000)\nRemaining loss ($10,000) then reduces debt basis to $0\nAll $45,000 is fully deductible.\n\nStep 4 — Ending bases:\nStock basis: $0\nDebt basis: $0\n\nAnswer: B — Deduct $45,000; stock basis $0, debt basis $0.`,
      whyWrong: [
        { key: "A", reason: "$30,000 ignores the tax-exempt income that increases stock basis to $35,000 before applying losses. Tax-exempt income must be added first." },
        { key: "C", reason: "$35,000 only uses stock basis and leaves debt basis intact. When stock basis reaches $0 and there is remaining loss, debt basis is used next." },
        { key: "D", reason: "If the full $45,000 is deducted, both stock and debt basis go to $0 — there is no $5,000 remaining stock basis." },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// QUESTION CARD — stable module-level component
// ─────────────────────────────────────────────────────────────────────────────

interface QuestionCardProps {
  q: MCQ
  index: number
  selected: string | null
  revealed: boolean
  onSelect: (key: string) => void
  onReveal: () => void
  onReset: () => void
}

function QuestionCard({ q, index, selected, revealed, onSelect, onReveal, onReset }: QuestionCardProps) {
  const isCorrect = selected === q.correct
  const hasAnswered = selected !== null

  const diffColor = q.difficulty === "Hard"
    ? "bg-red-100 text-red-700"
    : "bg-yellow-100 text-yellow-700"

  return (
    <Card className="p-4 md:p-6 shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          Question {index + 1}
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-xs font-semibold text-gray-500">{q.topic}</span>
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${diffColor}`}>
          {q.difficulty}
        </span>
      </div>

      {/* Stem */}
      <p className="text-sm text-gray-800 leading-relaxed mb-5 whitespace-pre-line">{q.stem}</p>

      {/* Choices */}
      <div className="space-y-2.5 mb-5">
        {q.choices.map(choice => {
          const isSelected = selected === choice.key
          const isTheCorrect = choice.key === q.correct

          let bg = "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          if (revealed) {
            if (isTheCorrect)  bg = "bg-green-50 border-green-400"
            else if (isSelected && !isTheCorrect) bg = "bg-red-50 border-red-400"
            else bg = "bg-white border-gray-100 opacity-60"
          } else if (isSelected) {
            bg = "bg-yellow-50 border-yellow-400"
          }

          return (
            <button
              key={choice.key}
              onClick={() => !revealed && onSelect(choice.key)}
              disabled={revealed}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-colors ${bg} ${revealed ? "cursor-default" : "cursor-pointer"}`}
            >
              {/* Key bubble */}
              <span className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                revealed && isTheCorrect  ? "bg-green-500 text-white" :
                revealed && isSelected   ? "bg-red-500 text-white" :
                isSelected               ? "bg-yellow-500 text-white" :
                                           "bg-gray-100 text-gray-600"
              }`}>
                {choice.key}
              </span>
              <span className={`flex-1 leading-relaxed ${revealed && isTheCorrect ? "font-semibold text-green-800" : "text-gray-700"}`}>
                {choice.text}
              </span>
              {revealed && isTheCorrect  && <CheckCircle2 className="shrink-0 h-4 w-4 text-green-500 mt-0.5" />}
              {revealed && isSelected && !isTheCorrect && <XCircle className="shrink-0 h-4 w-4 text-red-500 mt-0.5" />}
            </button>
          )
        })}
      </div>

      {/* Result banner */}
      {hasAnswered && !revealed && (
        <div className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 mb-4 ${
          isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {isCorrect
            ? <><CheckCircle2 className="h-4 w-4 shrink-0" /> Correct! Click Show Explanation to see the full reasoning.</>
            : <><XCircle className="h-4 w-4 shrink-0" /> Incorrect. Review the explanation to understand why.</>}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        {hasAnswered && (
          <Button size="sm" variant="ghost" onClick={onReveal}
            className="text-blue-600 hover:text-blue-700">
            {revealed
              ? <><ChevronUp className="h-3.5 w-3.5 mr-1" />Hide Explanation</>
              : <><ChevronDown className="h-3.5 w-3.5 mr-1" />Show Explanation</>}
          </Button>
        )}
        {(hasAnswered || revealed) && (
          <Button size="sm" variant="outline" onClick={onReset}
            className="text-gray-500 border-gray-300 hover:bg-gray-50">
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
          </Button>
        )}
        {!hasAnswered && (
          <p className="text-xs text-gray-400 self-center">Select an answer above</p>
        )}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="mt-4 p-4 md:p-5 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-4">
          <p className="font-bold text-blue-800">Explanation</p>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed text-xs md:text-sm">{q.explanation}</p>

          {/* Why wrong */}
          <div className="space-y-2 border-t border-blue-200 pt-3">
            <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Why the other choices are wrong:</p>
            {q.whyWrong.map(w => (
              <div key={w.key} className="flex gap-2 text-xs text-gray-600">
                <span className="shrink-0 h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">{w.key}</span>
                <p className="leading-relaxed">{w.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCORE SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

function ScoreSummary({ questions, answers }: { questions: MCQ[]; answers: Record<string, string | null> }) {
  const answered  = questions.filter(q => answers[q.id] !== null && answers[q.id] !== undefined)
  const correct   = answered.filter(q => answers[q.id] === q.correct)
  const pct       = answered.length ? Math.round((correct.length / answered.length) * 100) : 0

  if (answered.length === 0) return null

  return (
    <div className={`rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
      pct === 100 ? "bg-green-50 border border-green-200" :
      pct >= 60   ? "bg-yellow-50 border border-yellow-200" :
                    "bg-red-50 border border-red-200"
    }`}>
      <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
        pct === 100 ? "bg-green-500" : pct >= 60 ? "bg-yellow-500" : "bg-red-500"
      }`}>
        <Trophy className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-gray-900">{correct.length} / {answered.length} correct ({pct}%)</p>
        <p className="text-sm text-gray-600 mt-0.5">
          {pct === 100 ? "Perfect score! Strong command of this material." :
           pct >= 80   ? "Great work — a few areas to review." :
           pct >= 60   ? "Solid foundation. Focus on the explanations for missed questions." :
                         "Keep studying — review each explanation carefully and retry."}
        </p>
      </div>
      {answered.length < questions.length && (
        <p className="text-xs text-gray-400">{questions.length - answered.length} question(s) remaining</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function PracticeMCQPage() {
  const [activeSection, setActiveSection] = useState<Section>("FAR")
  // answers[section][questionId] = selected key or null
  const [answers,  setAnswers]  = useState<Record<Section, Record<string, string | null>>>({ FAR: {}, AUD: {}, REG: {} })
  const [revealed, setRevealed] = useState<Record<Section, Record<string, boolean>>>({ FAR: {}, AUD: {}, REG: {} })

  const questions = QUESTIONS[activeSection]
  const sectionAnswers  = answers[activeSection]
  const sectionRevealed = revealed[activeSection]

  const handleSelect = (qId: string, key: string) => {
    setAnswers(p => ({ ...p, [activeSection]: { ...p[activeSection], [qId]: key } }))
  }

  const handleReveal = (qId: string) => {
    setRevealed(p => ({ ...p, [activeSection]: { ...p[activeSection], [qId]: !p[activeSection][qId] } }))
  }

  const handleReset = (qId: string) => {
    setAnswers(p => { const s = { ...p[activeSection] }; delete s[qId]; return { ...p, [activeSection]: s } })
    setRevealed(p => { const s = { ...p[activeSection] }; delete s[qId]; return { ...p, [activeSection]: s } })
  }

  const handleResetAll = () => {
    setAnswers(p => ({ ...p, [activeSection]: {} }))
    setRevealed(p => ({ ...p, [activeSection]: {} }))
  }

  const sections: { id: Section; label: string; full: string; color: string }[] = [
    { id: "FAR", label: "FAR", full: "Financial Accounting & Reporting", color: "yellow" },
    { id: "AUD", label: "AUD", full: "Auditing & Attestation",           color: "blue"   },
    { id: "REG", label: "REG", full: "Taxation & Regulation",            color: "teal"   },
  ]

  const accentClass: Record<string, string> = {
    yellow: "border-yellow-500 text-yellow-700 bg-yellow-50/50",
    blue:   "border-blue-500 text-blue-700 bg-blue-50/50",
    teal:   "border-teal-500 text-teal-700 bg-teal-50/50",
  }
  const activeColor = sections.find(s => s.id === activeSection)?.color ?? "yellow"

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden shrink-0">
              <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={32} height={32} className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight">CPABee</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features"      className="text-sm font-medium hover:text-yellow-600 transition-colors">Reports</Link>
            <Link href="/study-plan"     className="text-sm font-medium hover:text-yellow-600 transition-colors">Study Plan</Link>
            <Link href="/practice-mcq"   className="text-sm font-medium text-yellow-600 border-b-2 border-yellow-400 pb-0.5">Practice MCQs</Link>
            <Link href="/practice-sims"  className="text-sm font-medium hover:text-yellow-600 transition-colors">Practice SIMs</Link>
            <Link href="/#pricing"       className="text-sm font-medium hover:text-yellow-600 transition-colors">Pricing</Link>
          </nav>
          <Link href="/#pricing">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs md:text-sm px-3 md:px-4">
              Free Sample
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-10 md:py-16">
          <div className="container max-w-4xl text-center space-y-4 px-4">
            <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Free Practice Resource
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">CPA Exam Practice MCQs</h1>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
              Exam-style multiple choice questions for FAR, AUD, and REG — with instant feedback
              and full step-by-step explanations.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-1 text-xs md:text-sm">
              {["📝 5 questions per section","✅ Instant answer feedback","📖 Full explanations","❌ Why wrong breakdowns"].map(f => (
                <span key={f} className="bg-white/10 px-3 py-1 rounded-full text-slate-200">{f}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section Tabs ── */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="container max-w-4xl px-0">
            <div className="flex">
              {sections.map(({ id, label, full, color }) => (
                <button key={id} onClick={() => setActiveSection(id)}
                  className={`flex-1 py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm font-semibold border-b-2 transition-colors text-left ${
                    activeSection === id ? accentClass[color] : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}>
                  <span className="font-bold block">{label}</span>
                  <span className="text-xs font-normal opacity-80 hidden sm:block">{full}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="container max-w-4xl py-6 md:py-10 px-4 md:px-6">

          {/* Instructions */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 mb-6 flex gap-3">
            <BookOpen className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 mb-1 text-sm">How to use these MCQs</p>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Select your answer for each question. You'll get immediate feedback on whether you're
                correct. Click <strong>Show Explanation</strong> to see the full step-by-step reasoning
                and why each wrong answer is incorrect.
              </p>
            </div>
          </div>

          {/* Score summary */}
          <div className="mb-6">
            <ScoreSummary questions={questions} answers={sectionAnswers} />
          </div>

          {/* Reset all + section label */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-800">
              {sections.find(s => s.id === activeSection)?.full} — {questions.length} Questions
            </h2>
            <Button size="sm" variant="outline" onClick={handleResetAll}
              className="text-gray-500 border-gray-300 hover:bg-gray-50 text-xs">
              <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset All
            </Button>
          </div>

          {/* Questions */}
          <div className="space-y-6">
            {questions.map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                selected={sectionAnswers[q.id] ?? null}
                revealed={!!sectionRevealed[q.id]}
                onSelect={key => handleSelect(q.id, key)}
                onReveal={() => handleReveal(q.id)}
                onReset={() => handleReset(q.id)}
              />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <section className="py-8 md:py-10 bg-white border-t">
          <div className="container max-w-3xl px-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1">Study smarter</p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Know which topics appear most on your exam.</h3>
                <p className="text-sm text-gray-600">
                  These MCQs cover high-yield areas — but knowing which topics are generating the most
                  candidate discussion right now gives you an edge. CPABee reports show you exactly where
                  to focus your MCQ volume.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto shrink-0">
                <Link href="/#pricing">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-full md:w-auto whitespace-nowrap">
                    Get a Report <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#pricing">
                  <Button variant="outline" className="border-amber-400 text-amber-800 hover:bg-amber-50 w-full md:w-auto text-sm whitespace-nowrap">
                    Get Free Sample First
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t py-8 bg-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-6 w-6 overflow-hidden">
                <Image src="/images/cpabee-logo.png" alt="CPABee Logo" width={24} height={24} className="object-contain" />
              </div>
              <span className="text-sm font-semibold">CPABee</span>
            </Link>
            <div className="flex gap-4 text-sm flex-wrap justify-center">
              <Link href="/terms-of-service" className="text-gray-500 hover:text-yellow-600">Terms</Link>
              <Link href="/privacy-policy"   className="text-gray-500 hover:text-yellow-600">Privacy</Link>
              <Link href="/study-plan"       className="text-gray-500 hover:text-yellow-600">Study Plan</Link>
              <Link href="/practice-mcq"     className="text-gray-500 hover:text-yellow-600">Practice MCQs</Link>
              <Link href="/practice-sims"    className="text-gray-500 hover:text-yellow-600">Practice SIMs</Link>
            </div>
            <div className="text-sm text-gray-500 text-center md:text-right">
              <p>Contact: <a href="mailto:info@cpabee.com" className="text-teal-700 hover:text-teal-600 underline">info@cpabee.com</a></p>
              <p>© {new Date().getFullYear()} CPABee. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
