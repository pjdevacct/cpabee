// mcq-data.ts — CPA Exam MCQ Question Bank
// FAR: 50 questions | AUD: 5 questions | REG: 5 questions

export type ChoiceKey = "A" | "B" | "C" | "D"

export interface MCQ {
  id: string
  topic: string
  difficulty: "Moderate" | "Hard"
  stem: string
  choices: { key: ChoiceKey; text: string }[]
  correct: ChoiceKey
  explanation: string
  whyWrong: { key: ChoiceKey; reason: string }[]
}

export type Section = "FAR" | "AUD" | "REG"

export const FAR_QUESTIONS: MCQ[] = [

  // ── REVENUE RECOGNITION ────────────────────────────────────────────────────

  {
    id: "far-1",
    topic: "Revenue Recognition — Multiple POs",
    difficulty: "Moderate",
    stem: `Pinnacle Software sells a bundled contract for $120,000 that includes a software license (SSP $80,000), one year of support (SSP $30,000), and implementation training (SSP $10,000). The license and training are both delivered on Day 1. Support is provided ratably over 12 months.

How much revenue does Pinnacle recognize on Day 1?`,
    choices: [
      { key: "A", text: "$80,000" },
      { key: "B", text: "$90,000" },
      { key: "C", text: "$120,000" },
      { key: "D", text: "$100,000" },
    ],
    correct: "B",
    explanation: `Step 1 — Allocate the transaction price.\nTotal SSP = $80,000 + $30,000 + $10,000 = $120,000 = TP. No discount — allocation is direct.\n\nStep 2 — Revenue on Day 1:\n• License: point in time, delivered Day 1 → $80,000\n• Training: point in time, completed Day 1 → $10,000\n• Support: over time, 12 months → $0 on Day 1\n\nDay 1 revenue = $80,000 + $10,000 = $90,000.`,
    whyWrong: [
      { key: "A", reason: "Ignores the training PO, which is also fully satisfied on Day 1." },
      { key: "C", reason: "The $30,000 support PO must be recognized ratably — it is not earned on Day 1." },
      { key: "D", reason: "Only license + training are point-in-time on Day 1. Support is recognized over 12 months." },
    ],
  },

  {
    id: "far-2",
    topic: "Revenue Recognition — Variable Consideration",
    difficulty: "Hard",
    stem: `Northgate Construction has a contract for $5,000,000. It includes a $500,000 performance bonus if the project is completed before a specified date. Based on historical experience, Northgate estimates a 30% probability of earning the bonus.

Under ASC 606, using the expected value method, how much variable consideration should be included in the transaction price?`,
    choices: [
      { key: "A", text: "$0 — excluded until earned" },
      { key: "B", text: "$500,000 — include the full bonus" },
      { key: "C", text: "$150,000 — expected value" },
      { key: "D", text: "$350,000 — constrained amount" },
    ],
    correct: "C",
    explanation: `ASC 606 requires variable consideration to be estimated and included in the transaction price to the extent it is probable that a significant reversal will NOT occur.\n\nExpected value method: probability-weighted amount.\n$500,000 × 30% = $150,000\n\nIf including $150,000 does not create a significant revenue reversal risk, it is included in the TP.`,
    whyWrong: [
      { key: "A", reason: "ASC 606 does not require waiting until variable consideration is earned — it must be estimated and included subject to the constraint." },
      { key: "B", reason: "The full $500,000 ignores probability weighting. Only the expected value is used under this method." },
      { key: "D", reason: "$350,000 is not derived from either ASC 606 estimation method and has no basis here." },
    ],
  },

  {
    id: "far-3",
    topic: "Revenue Recognition — Principal vs. Agent",
    difficulty: "Moderate",
    stem: `StyleHub operates an online marketplace where vendors list products. StyleHub collects the full purchase price from customers and remits to vendors keeping a 15% commission. StyleHub never takes title to inventory and bears no inventory risk.

How should StyleHub recognize revenue?`,
    choices: [
      { key: "A", text: "Gross revenue equal to the full sales price" },
      { key: "B", text: "Net revenue equal to the 15% commission only" },
      { key: "C", text: "Net revenue equal to the full price less cost of goods" },
      { key: "D", text: "Gross revenue, offset by vendor remittances as cost of sales" },
    ],
    correct: "B",
    explanation: `ASC 606 principal vs. agent: An agent arranges for another party's goods to be transferred without controlling them → recognizes only its fee as net revenue.\n\nStyleHub indicators of agent:\n• Does not take title to inventory\n• Bears no inventory risk\n• Earns a fixed commission\n\nRevenue = 15% commission only (net presentation).`,
    whyWrong: [
      { key: "A", reason: "Gross revenue applies to principals who control the goods before transfer. StyleHub never controls inventory." },
      { key: "C", reason: "A gross presentation with COGS also requires principal status — StyleHub is an agent." },
      { key: "D", reason: "An agent cannot show gross revenue. Net commission is the correct presentation." },
    ],
  },

  {
    id: "far-4",
    topic: "Revenue Recognition — Contract Asset vs. Liability",
    difficulty: "Moderate",
    stem: `Beacon Builders has a 2-year construction contract for $800,000. By year-end, Beacon has satisfied performance obligations worth $320,000 (40% complete) but has only billed the customer $280,000.

What does Beacon report on its balance sheet at year-end?`,
    choices: [
      { key: "A", text: "Contract liability of $40,000" },
      { key: "B", text: "Contract asset of $40,000" },
      { key: "C", text: "Accounts receivable of $320,000" },
      { key: "D", text: "Deferred revenue of $40,000" },
    ],
    correct: "B",
    explanation: `Revenue earned: $320,000\nAmount billed: $280,000\n\nBeacon has earned MORE than billed. When performance precedes the right to bill, the difference is a Contract Asset.\n\nContract Asset = $320,000 − $280,000 = $40,000\n\nA contract asset is a conditional right; it becomes a receivable once the billing milestone is reached.`,
    whyWrong: [
      { key: "A", reason: "A contract liability arises when billings EXCEED revenue earned. Here earnings exceed billings." },
      { key: "C", reason: "The $280,000 billed is the receivable; the additional $40,000 is a contract asset, not a receivable." },
      { key: "D", reason: "Deferred revenue is a contract liability — it arises when cash is received before performing." },
    ],
  },

  {
    id: "far-5",
    topic: "Revenue Recognition — Bill-and-Hold",
    difficulty: "Hard",
    stem: `On December 28, Year 1, Vantage Corp. receives a purchase order for $200,000 of equipment. At the customer's request, Vantage holds the equipment in its warehouse until January 15, Year 2. The equipment is identified and segregated. The customer has paid in full and accepted all risks of ownership.

Should Vantage recognize revenue in Year 1?`,
    choices: [
      { key: "A", text: "No — revenue cannot be recognized until physical delivery in Year 2" },
      { key: "B", text: "Yes — all criteria for bill-and-hold recognition are met" },
      { key: "C", text: "No — bill-and-hold arrangements always defer revenue" },
      { key: "D", text: "Yes — receipt of cash triggers recognition" },
    ],
    correct: "B",
    explanation: `Under ASC 606-10-55-83, bill-and-hold revenue recognition is permitted when ALL criteria are met:\n1. The reason for the arrangement is substantive (customer requested — ✓)\n2. The product is identified as belonging to the customer (segregated — ✓)\n3. The product is ready for physical transfer — ✓\n4. The seller cannot redirect the product to another customer — ✓\n\nAll criteria met → Vantage recognizes $200,000 in Year 1.`,
    whyWrong: [
      { key: "A", reason: "Physical delivery is NOT required when bill-and-hold criteria are satisfied. Control can transfer without physical movement." },
      { key: "C", reason: "Bill-and-hold does NOT automatically defer revenue. ASC 606 allows recognition when all four criteria are met." },
      { key: "D", reason: "Cash receipt alone does not trigger recognition — the performance obligation criteria must be satisfied." },
    ],
  },

  {
    id: "far-6",
    topic: "Revenue Recognition — Contract Modifications",
    difficulty: "Hard",
    stem: `Alderman Corp. has a contract to deliver 100 units at $50 each. After delivering 60 units, the customer requests 50 additional units at $45 each — below the original $50 price but reflecting current market conditions.

How should Alderman account for this modification?`,
    choices: [
      { key: "A", text: "Terminate the old contract and create a new one" },
      { key: "B", text: "Treat as a separate contract — additional goods are distinct" },
      { key: "C", text: "Modify prospectively — additional goods are distinct but price is not at SSP" },
      { key: "D", text: "Treat as a separate contract — price reflects standalone selling price" },
    ],
    correct: "C",
    explanation: `ASC 606-10-25-12: A modification is a separate contract only if (1) goods are distinct AND (2) price reflects standalone selling price.\n\n• Distinct: Yes — same units, separately useful ✓\n• SSP: $45 < original $50 — does NOT reflect SSP ✗\n\nBecause condition 2 fails, this is NOT a separate contract. Since remaining goods are the same type as those already delivered, account for prospectively — blend the remaining units and update pricing going forward.`,
    whyWrong: [
      { key: "A", reason: "Termination + new contract applies when remaining obligations are NOT distinct from already-delivered items." },
      { key: "B", reason: "Separate contract treatment requires BOTH distinct goods AND SSP pricing. The $45 price fails the SSP test." },
      { key: "D", reason: "$45 is below original $50. The problem states it reflects market conditions, not the standalone selling price." },
    ],
  },

  // ── LEASES ─────────────────────────────────────────────────────────────────

  {
    id: "far-7",
    topic: "Leases — Classification",
    difficulty: "Moderate",
    stem: `On January 1, Year 1, Landers Co. enters a 4-year lease for office equipment. Annual payments of $25,000 are due at year-end. The lease has no ownership transfer, no purchase option, and the equipment has a 10-year useful life. IBR is 8%. PV annuity factor (4 yrs, 8%) = 3.3121.

How should Landers classify this lease and what is the initial ROU asset?`,
    choices: [
      { key: "A", text: "Finance lease; ROU asset $82,803" },
      { key: "B", text: "Operating lease; ROU asset $82,803" },
      { key: "C", text: "Finance lease; ROU asset $100,000" },
      { key: "D", text: "Operating lease; no ROU asset recorded" },
    ],
    correct: "B",
    explanation: `Finance lease criteria (any one triggers finance):\n• Ownership transfer — No\n• Bargain purchase option — No\n• Lease term = major part of useful life — 4÷10 = 40%, below ~75% threshold\n• PV = substantially all of fair value — not indicated\n• Specialized asset — No\n\nNo criterion met → Operating lease.\n\nROU asset = $25,000 × 3.3121 = $82,803. Under ASC 842, all leases record an ROU asset.`,
    whyWrong: [
      { key: "A", reason: "Finance classification requires at least one criterion. 4-year term on a 10-year asset is only 40% — well below major part." },
      { key: "C", reason: "Finance classification is wrong, and $100,000 is undiscounted (4 × $25,000) — must use PV." },
      { key: "D", reason: "ASC 842 eliminated off-balance-sheet operating leases. All leases require ROU asset and lease liability recognition." },
    ],
  },

  {
    id: "far-8",
    topic: "Leases — Operating Lease Expense",
    difficulty: "Moderate",
    stem: `On January 1, Year 1, Redwood Co. enters a 3-year operating lease with annual payments of $30,000 at year-end. IBR is 5%. PV annuity factor (3 yrs, 5%) = 2.7232.

What is Redwood's total lease expense in Year 1?`,
    choices: [
      { key: "A", text: "$30,000" },
      { key: "B", text: "$27,232" },
      { key: "C", text: "$4,084" },
      { key: "D", text: "$34,084" },
    ],
    correct: "A",
    explanation: `For an operating lease under ASC 842, the lessee recognizes a single straight-line lease cost over the lease term.\n\nTotal payments = $30,000 × 3 = $90,000\nAnnual straight-line expense = $90,000 ÷ 3 = $30,000\n\nOne income statement line — "lease expense" of $30,000 — not separate interest and amortization as with a finance lease.`,
    whyWrong: [
      { key: "B", reason: "$27,232 is the PV of lease payments — a balance sheet amount, not the expense." },
      { key: "C", reason: "$4,084 is only the interest component — applicable to finance leases, not operating." },
      { key: "D", reason: "$34,084 combines cash payment with interest, which is the finance lease approach." },
    ],
  },

  {
    id: "far-9",
    topic: "Leases — Finance Lease Liability",
    difficulty: "Hard",
    stem: `On January 1, Year 1, Meridian Co. enters a 5-year finance lease. Annual payments are $60,000 at year-end. IBR is 6%. PV annuity factor (5 yrs, 6%) = 4.2124, giving an initial lease liability of $252,742.

What is the lease liability carrying value at December 31, Year 1?`,
    choices: [
      { key: "A", text: "$192,742" },
      { key: "B", text: "$208,906" },
      { key: "C", text: "$207,906" },
      { key: "D", text: "$222,742" },
    ],
    correct: "C",
    explanation: `Effective interest method:\n\nOpening balance Jan 1: $252,742\n+ Interest (6%): $252,742 × 6% = $15,164\n− Cash payment: $(60,000)\nEnding balance Dec 31: $252,742 + $15,164 − $60,000 = $207,906`,
    whyWrong: [
      { key: "A", reason: "$192,742 subtracts the full $60,000 without first adding interest accrued." },
      { key: "B", reason: "Close but reflects a rounding difference — $207,906 is the precise answer." },
      { key: "D", reason: "$222,742 only reduces the liability by $30,000 rather than the full $60,000 payment." },
    ],
  },

  {
    id: "far-10",
    topic: "Leases — Short-Term Exemption",
    difficulty: "Moderate",
    stem: `Harmon Co. elects the short-term lease exemption under ASC 842. On March 1, Year 1, it enters a 10-month equipment lease with monthly payments of $2,000. There are no renewal options.

How should Harmon account for this lease?`,
    choices: [
      { key: "A", text: "Record ROU asset and lease liability; expense payments as made" },
      { key: "B", text: "Expense lease payments straight-line; no balance sheet impact" },
      { key: "C", text: "Capitalize and amortize over 10 months" },
      { key: "D", text: "Disclose only; no accounting entry required" },
    ],
    correct: "B",
    explanation: `The short-term lease exemption (ASC 842-20-25-2) applies to leases with terms of 12 months or less. When elected:\n• No ROU asset or lease liability is recorded\n• Payments are expensed straight-line\n• Disclosure of the exemption is required\n\n10-month lease qualifies. Monthly expense = $2,000.`,
    whyWrong: [
      { key: "A", reason: "ROU/liability recognition is the default. The short-term exemption eliminates this for qualifying leases." },
      { key: "C", reason: "Capitalization is not appropriate when the short-term exemption is elected." },
      { key: "D", reason: "Expense entries ARE required — simply disclosing would misstate the income statement." },
    ],
  },

  {
    id: "far-11",
    topic: "Leases — Sale-Leaseback",
    difficulty: "Hard",
    stem: `Cannon Corp. sells a building (carrying value $800,000) to an investor for $1,000,000 and simultaneously leases it back as an operating lease. The transaction qualifies as a sale under ASC 606.

How does Cannon record the transaction?`,
    choices: [
      { key: "A", text: "Recognize $200,000 gain immediately only" },
      { key: "B", text: "Defer the $200,000 gain until leaseback ends" },
      { key: "C", text: "Recognize $200,000 gain and record ROU asset and lease liability" },
      { key: "D", text: "Recognize gain reduced by prepaid rent on leaseback" },
    ],
    correct: "C",
    explanation: `Under ASC 842-40, a qualifying sale-leaseback:\n1. Derecognize the asset (carrying value $800,000)\n2. Record proceeds ($1,000,000)\n3. Recognize the full gain: $1,000,000 − $800,000 = $200,000\n4. Record the leaseback as an operating lease (ROU asset + lease liability)\n\nUnlike legacy GAAP, ASC 842 does NOT defer gains on qualifying sale-leasebacks at market terms.`,
    whyWrong: [
      { key: "A", reason: "The gain IS recognized, but you must also record the ROU asset and lease liability from the leaseback." },
      { key: "B", reason: "Under ASC 842, gains on qualifying sale-leasebacks at market terms are recognized immediately — not deferred." },
      { key: "D", reason: "There is no gain offset by prepaid rent in this scenario." },
    ],
  },

  {
    id: "far-12",
    topic: "Leases — Lessor Classification",
    difficulty: "Hard",
    stem: `Greenfield Leasing (a manufacturer) leases equipment to a customer for 5 years. The equipment has a 5-year useful life and fair value of $100,000. PV of lease payments = $95,000. No ownership transfer, no purchase option.

How should Greenfield classify this lease?`,
    choices: [
      { key: "A", text: "Operating lease" },
      { key: "B", text: "Sales-type lease" },
      { key: "C", text: "Direct financing lease" },
      { key: "D", text: "Leveraged lease" },
    ],
    correct: "B",
    explanation: `Lessor classification — criteria:\n• Lease term equals useful life (5 = 5 → 100%) — major part ✓\n• PV of payments ($95,000) is 95% of fair value ($100,000) — substantially all ✓\n\nCriteria are met. Since Greenfield is the manufacturer, there is selling profit (fair value differs from carrying value) → Sales-type lease.\n\nSales-type: lessor recognizes selling profit and interest income over the lease term.`,
    whyWrong: [
      { key: "A", reason: "Operating lease requires none of the criteria to be met. Multiple criteria are satisfied here." },
      { key: "C", reason: "Direct financing applies when criteria are met but fair value equals carrying value (no selling profit). Greenfield is the manufacturer, so selling profit exists." },
      { key: "D", reason: "Leveraged leases were eliminated for new leases under ASC 842." },
    ],
  },

  // ── BONDS & DEBT ───────────────────────────────────────────────────────────

  {
    id: "far-13",
    topic: "Bonds — Effective Interest Method",
    difficulty: "Hard",
    stem: `On January 1, Year 1, Cortland Corp. issues $1,000,000 of 8% bonds at $946,000 (effective rate 9%). Interest is paid semi-annually June 30 and December 31.

What is interest expense for the first semi-annual period ended June 30, Year 1?`,
    choices: [
      { key: "A", text: "$40,000" },
      { key: "B", text: "$42,570" },
      { key: "C", text: "$45,000" },
      { key: "D", text: "$80,000" },
    ],
    correct: "B",
    explanation: `Effective interest method:\nInterest expense = Carrying value × Effective rate × Period\n\nCarrying value: $946,000\nSemi-annual effective rate: 9% ÷ 2 = 4.5%\nInterest expense: $946,000 × 4.5% = $42,570\n\nCash paid (stated): $1,000,000 × 8% ÷ 2 = $40,000\nDiscount amortization: $42,570 − $40,000 = $2,570`,
    whyWrong: [
      { key: "A", reason: "$40,000 is cash interest paid at the stated rate — not the effective interest expense. The discount must be amortized." },
      { key: "C", reason: "$45,000 incorrectly applies 9% annual rate to face value for a semi-annual period." },
      { key: "D", reason: "$80,000 is the full-year stated interest — this question asks for the semi-annual effective rate." },
    ],
  },

  {
    id: "far-14",
    topic: "Bonds — Issuance Between Interest Dates",
    difficulty: "Moderate",
    stem: `Westmore Corp. issues $500,000 of 6% bonds on March 1, Year 1. The bonds are dated January 1, Year 1, and pay interest semi-annually on June 30 and December 31. The bonds are issued at par.

How much cash does Westmore collect at issuance on March 1?`,
    choices: [
      { key: "A", text: "$500,000" },
      { key: "B", text: "$505,000" },
      { key: "C", text: "$515,000" },
      { key: "D", text: "$495,000" },
    ],
    correct: "B",
    explanation: `When bonds are issued between interest dates, the buyer pays accrued interest from the bond date to the issue date.\n\nAccrued interest (Jan 1 to Mar 1 = 2 months):\n$500,000 × 6% × (2/12) = $5,000\n\nTotal cash = $500,000 (face) + $5,000 (accrued interest) = $505,000\n\nOn June 30, Westmore pays the full $15,000 semi-annual interest — the $5,000 collected at issuance is returned to the buyer.`,
    whyWrong: [
      { key: "A", reason: "$500,000 ignores the 2-month accrued interest the buyer must pay." },
      { key: "C", reason: "$515,000 implies 4 months of accrued interest — the period is only 2 months (Jan 1 to Mar 1)." },
      { key: "D", reason: "$495,000 subtracts interest instead of adding it. The buyer pays accrued interest to the seller." },
    ],
  },

  {
    id: "far-15",
    topic: "Bonds — Early Extinguishment",
    difficulty: "Moderate",
    stem: `On January 1, Year 3, Halcyon Corp. retires bonds with a face value of $500,000 and unamortized discount of $20,000 by paying $495,000 cash.

What is the gain or loss on extinguishment?`,
    choices: [
      { key: "A", text: "$5,000 gain" },
      { key: "B", text: "$15,000 loss" },
      { key: "C", text: "$20,000 loss" },
      { key: "D", text: "$5,000 loss" },
    ],
    correct: "B",
    explanation: `Gain/loss = Carrying value − Reacquisition price\n\nCarrying value = $500,000 − $20,000 = $480,000\nReacquisition price = $495,000\n\nLoss = $480,000 − $495,000 = $(15,000)\n\nRecognized in net income in the period of extinguishment.`,
    whyWrong: [
      { key: "A", reason: "A gain arises when carrying value EXCEEDS reacquisition price. Here Halcyon paid MORE — that is a loss." },
      { key: "C", reason: "$20,000 is the unamortized discount alone — the loss calculation uses carrying value vs. reacquisition price." },
      { key: "D", reason: "$5,000 compares reacquisition price to face value ($500,000 − $495,000). Use carrying value, not face." },
    ],
  },

  {
    id: "far-16",
    topic: "Bonds — Straight-Line Amortization",
    difficulty: "Moderate",
    stem: `On January 1, Year 1, Fairfield Corp. issues $500,000 of 6% bonds at 94, with interest paid semi-annually. The bonds mature in 5 years. Fairfield uses straight-line amortization.

What is the carrying value of the bonds at December 31, Year 1 (after the second interest payment)?`,
    choices: [
      { key: "A", text: "$473,000" },
      { key: "B", text: "$476,000" },
      { key: "C", text: "$470,000" },
      { key: "D", text: "$480,000" },
    ],
    correct: "B",
    explanation: `Issue price: $500,000 × 94% = $470,000\nDiscount: $500,000 − $470,000 = $30,000\n\nStraight-line amortization:\nTerm = 5 years = 10 semi-annual periods\nAmortization per period: $30,000 ÷ 10 = $3,000\n\nAfter Year 1 (2 periods):\n$470,000 + ($3,000 × 2) = $476,000`,
    whyWrong: [
      { key: "A", reason: "$473,000 applies only one period of amortization. Year 1 has two semi-annual periods." },
      { key: "C", reason: "$470,000 is the original issue price — no amortization has been applied." },
      { key: "D", reason: "$480,000 would require $5,000/period amortization, which is incorrect." },
    ],
  },

  {
    id: "far-17",
    topic: "Bonds — Troubled Debt Restructuring",
    difficulty: "Hard",
    stem: `Dunmore Corp. owes $300,000 on a note. The creditor agrees to accept land (carrying value $200,000, fair value $260,000) in full settlement.

What does Dunmore recognize?`,
    choices: [
      { key: "A", text: "Gain of $100,000 as extraordinary item" },
      { key: "B", text: "Gain on land transfer $60,000; gain on restructuring $40,000 — both ordinary income" },
      { key: "C", text: "Gain of $60,000 on land transfer only; no debt gain" },
      { key: "D", text: "No gain — deferred under troubled debt rules" },
    ],
    correct: "B",
    explanation: `Under ASC 470-60, when assets are transferred in a TDR:\n\nStep 1 — Recognize gain/loss on the asset transfer:\nFV ($260,000) − Carrying value ($200,000) = $60,000 gain on land\n\nStep 2 — Recognize gain on debt extinguishment:\nDebt retired ($300,000) − FV of asset ($260,000) = $40,000 gain\n\nBoth are ordinary income. Extraordinary items were eliminated by ASU 2015-01.`,
    whyWrong: [
      { key: "A", reason: "Total $100,000 gain is correct, but extraordinary items no longer exist under ASU 2015-01." },
      { key: "C", reason: "The debt extinguishment gain ($40,000) must also be recognized — the debt was settled for less than face." },
      { key: "D", reason: "Gains are always recognized when debt is settled below carrying value in a TDR." },
    ],
  },

  // ── PP&E & DEPRECIATION ───────────────────────────────────────────────────

  {
    id: "far-18",
    topic: "PP&E — Capitalization vs. Expense",
    difficulty: "Moderate",
    stem: `Larkin Co. incurs these costs on its manufacturing equipment:
• Routine maintenance: $8,000
• Part replacement extending useful life 3 years: $25,000
• Painting the equipment: $4,000
• Overhaul increasing productive capacity 20%: $40,000

What total amount should Larkin capitalize?`,
    choices: [
      { key: "A", text: "$65,000" },
      { key: "B", text: "$40,000" },
      { key: "C", text: "$25,000" },
      { key: "D", text: "$77,000" },
    ],
    correct: "A",
    explanation: `Capitalize costs that extend useful life, increase capacity, or improve efficiency beyond original specs. Expense routine maintenance and cosmetic items.\n\n• Routine maintenance $8,000 → Expense (no future benefit beyond maintenance)\n• Part replacement extending life $25,000 → Capitalize ✓\n• Painting $4,000 → Expense (cosmetic)\n• Overhaul increasing capacity 20% $40,000 → Capitalize ✓\n\nTotal capitalized: $25,000 + $40,000 = $65,000`,
    whyWrong: [
      { key: "B", reason: "$40,000 misses the part replacement ($25,000), which extends useful life and must be capitalized." },
      { key: "C", reason: "$25,000 misses the overhaul ($40,000) that increases productive capacity." },
      { key: "D", reason: "$77,000 includes painting ($4,000), which is cosmetic and should be expensed." },
    ],
  },

  {
    id: "far-19",
    topic: "PP&E — Double-Declining Balance",
    difficulty: "Moderate",
    stem: `Kelton Corp. acquires equipment for $120,000 with a $20,000 salvage value and 5-year useful life on January 1, Year 1.

What is depreciation expense in Year 2 using the double-declining balance (DDB) method?`,
    choices: [
      { key: "A", text: "$20,000" },
      { key: "B", text: "$28,800" },
      { key: "C", text: "$48,000" },
      { key: "D", text: "$19,200" },
    ],
    correct: "B",
    explanation: `DDB rate = 2 ÷ 5 = 40% (ignores salvage value until carrying value approaches salvage)\n\nYear 1: $120,000 × 40% = $48,000 → Ending CV: $72,000\nYear 2: $72,000 × 40% = $28,800`,
    whyWrong: [
      { key: "A", reason: "$20,000 is straight-line depreciation ($100,000 depreciable base ÷ 5 years). DDB applies 40% to the declining balance." },
      { key: "C", reason: "$48,000 is Year 1 DDB applied to the original balance. Year 2 uses the Year 1 ending balance of $72,000." },
      { key: "D", reason: "$19,200 applies 40% to an incorrect Year 2 starting balance." },
    ],
  },

  {
    id: "far-20",
    topic: "PP&E — Impairment (ASC 360)",
    difficulty: "Hard",
    stem: `Danbury Corp. has equipment with a carrying value of $500,000. Undiscounted expected future cash flows are $480,000. Fair value is $420,000.

What impairment loss, if any, should Danbury recognize?`,
    choices: [
      { key: "A", text: "No impairment — fair value exceeds carrying value" },
      { key: "B", text: "$80,000 impairment loss" },
      { key: "C", text: "$20,000 impairment loss" },
      { key: "D", text: "$80,000 impairment — recorded in OCI" },
    ],
    correct: "B",
    explanation: `ASC 360 two-step test:\n\nStep 1 — Recoverability: carrying value ($500,000) vs. undiscounted cash flows ($480,000)\n$500,000 > $480,000 → NOT recoverable → proceed to Step 2\n\nStep 2 — Measure: Impairment = Carrying value − Fair value\n= $500,000 − $420,000 = $80,000\n\nRecognized in net income. Asset written down to $420,000.`,
    whyWrong: [
      { key: "A", reason: "Fair value ($420,000) is LESS than carrying value. The recoverability test (undiscounted flows) also fails." },
      { key: "C", reason: "$20,000 is the gap between carrying value and undiscounted flows. Step 2 measures impairment using FAIR VALUE, not undiscounted flows." },
      { key: "D", reason: "PP&E impairment is recognized in net income, not OCI." },
    ],
  },

  {
    id: "far-21",
    topic: "PP&E — Interest Capitalization",
    difficulty: "Hard",
    stem: `Thornwood Co. is constructing a new headquarters. Weighted-average accumulated expenditures are $2,000,000. There is a $1,500,000 specific construction loan at 7% and $3,000,000 of other debt at 9%.

What is total interest to capitalize?`,
    choices: [
      { key: "A", text: "$105,000" },
      { key: "B", text: "$135,000" },
      { key: "C", text: "$150,000" },
      { key: "D", text: "$180,000" },
    ],
    correct: "C",
    explanation: `ASC 835-20: apply specific borrowing rate first, then weighted-average rate to the remainder.\n\nSpecific loan: $1,500,000 × 7% = $105,000\n\nExcess WAAE: $2,000,000 − $1,500,000 = $500,000\nOther debt rate: 9%\nAdditional: $500,000 × 9% = $45,000\n\nTotal capitalized: $105,000 + $45,000 = $150,000`,
    whyWrong: [
      { key: "A", reason: "$105,000 applies only the specific loan and ignores the $500,000 excess that uses the weighted-average rate." },
      { key: "B", reason: "Check the calculation of the excess WAAE and weighted-average rate application." },
      { key: "D", reason: "$180,000 applies 9% to the full $2,000,000, ignoring that the specific 7% rate must be applied first." },
    ],
  },

  {
    id: "far-22",
    topic: "PP&E — Donated Assets (NFP)",
    difficulty: "Moderate",
    stem: `Sunrise Charity (a private NFP) receives donated land with a fair value of $300,000. The donor's original cost was $180,000.

At what amount should Sunrise record the land?`,
    choices: [
      { key: "A", text: "$180,000 — donor's original cost" },
      { key: "B", text: "$300,000 — fair value at donation date" },
      { key: "C", text: "$0 — donated assets are not recognized" },
      { key: "D", text: "$240,000 — average of cost and fair value" },
    ],
    correct: "B",
    explanation: `Under ASC 958-605, NFPs recognize contributed assets at FAIR VALUE at the donation date.\n\nSunrise records land at $300,000 and contribution revenue of $300,000.\n\nThe donor's original cost is irrelevant to the recipient.`,
    whyWrong: [
      { key: "A", reason: "Donor's cost is irrelevant. The NFP measures at fair value at the donation date." },
      { key: "C", reason: "Donated assets ARE recognized — unconditional contributions are recorded as assets and revenue." },
      { key: "D", reason: "Averaging cost and fair value is not a GAAP measurement basis." },
    ],
  },

  // ── INVENTORY ──────────────────────────────────────────────────────────────

  {
    id: "far-23",
    topic: "Inventory — LCNRV",
    difficulty: "Moderate",
    stem: `Hargrove Inc. has inventory at year-end (item-by-item basis):
• Item A: Cost $40,000 | NRV $35,000
• Item B: Cost $25,000 | NRV $28,000
• Item C: Cost $15,000 | NRV $12,000

What is total inventory on the balance sheet?`,
    choices: [
      { key: "A", text: "$75,000" },
      { key: "B", text: "$80,000" },
      { key: "C", text: "$72,000" },
      { key: "D", text: "$70,000" },
    ],
    correct: "C",
    explanation: `LCNRV (ASC 330): report at lower of cost or NRV, item by item.\n\nItem A: $40,000 vs $35,000 → $35,000 ✓\nItem B: $25,000 vs $28,000 → $25,000 (cost is lower)\nItem C: $15,000 vs $12,000 → $12,000 ✓\n\nTotal: $35,000 + $25,000 + $12,000 = $72,000`,
    whyWrong: [
      { key: "A", reason: "$75,000 only writes down Item C. Item A also has cost > NRV." },
      { key: "B", reason: "$80,000 is total cost with no write-downs." },
      { key: "D", reason: "$70,000 incorrectly writes down Item B, which already has cost below NRV." },
    ],
  },

  {
    id: "far-24",
    topic: "Inventory — FIFO Cost of Goods Sold",
    difficulty: "Moderate",
    stem: `Garrison Co. has these January transactions:
• Jan 1: 100 units @ $10
• Jan 8: Purchase 200 units @ $12
• Jan 15: Purchase 150 units @ $14
• Jan 20: Sale of 280 units

What is cost of goods sold under FIFO?`,
    choices: [
      { key: "A", text: "$3,160" },
      { key: "B", text: "$3,440" },
      { key: "C", text: "$3,360" },
      { key: "D", text: "$3,080" },
    ],
    correct: "A",
    explanation: `FIFO — sell oldest inventory first:\n\n280 units sold:\n• 100 units @ $10 = $1,000 (clears beginning inventory)\n• 180 units @ $12 = $2,160 (from Jan 8 purchase)\n\nCOGS = $1,000 + $2,160 = $3,160`,
    whyWrong: [
      { key: "B", reason: "$3,440 may use LIFO layers. FIFO uses oldest cost layers first." },
      { key: "C", reason: "Verify FIFO layers: 100 × $10 + 180 × $12 = $3,160." },
      { key: "D", reason: "$3,080 understates by not fully using the Jan 8 purchase layer at $12." },
    ],
  },

  {
    id: "far-25",
    topic: "Inventory — Gross Profit Method",
    difficulty: "Moderate",
    stem: `Dalton Co. estimates inventory destroyed in a fire:
• Beginning inventory: $80,000
• Net purchases: $320,000
• Net sales: $500,000
• Historical gross profit rate: 40%

What is estimated ending inventory?`,
    choices: [
      { key: "A", text: "$100,000" },
      { key: "B", text: "$200,000" },
      { key: "C", text: "$120,000" },
      { key: "D", text: "$80,000" },
    ],
    correct: "A",
    explanation: `Step 1 — Estimate COGS:\nGP rate = 40%, so COGS rate = 60%\nEstimated COGS = $500,000 × 60% = $300,000\n\nStep 2 — Ending inventory:\nGoods available = $80,000 + $320,000 = $400,000\nEnding inventory = $400,000 − $300,000 = $100,000`,
    whyWrong: [
      { key: "B", reason: "$200,000 incorrectly applies the GP rate to GAFS rather than using it to estimate COGS from sales." },
      { key: "C", reason: "Applying 40% to $300,000 COGS is not the correct sequence." },
      { key: "D", reason: "$80,000 is beginning inventory — it ignores all purchases and sales activity." },
    ],
  },

  {
    id: "far-26",
    topic: "Inventory — Retail Method (Conventional)",
    difficulty: "Hard",
    stem: `Manning Stores uses the conventional (LCM) retail method:
• Beginning inventory: Cost $60,000 | Retail $90,000
• Purchases: Cost $240,000 | Retail $360,000
• Net markups: $20,000
• Net markdowns: $30,000
• Net sales: $310,000

What is estimated ending inventory at cost?`,
    choices: [
      { key: "A", text: "$83,000" },
      { key: "B", text: "$90,000" },
      { key: "C", text: "$84,000" },
      { key: "D", text: "$92,000" },
    ],
    correct: "A",
    explanation: `Conventional (LCM) retail: include markups but EXCLUDE markdowns from the cost ratio denominator.\n\nGoods available:\nCost: $60,000 + $240,000 = $300,000\nRetail: $90,000 + $360,000 + $20,000 = $470,000\n\nCost ratio: $300,000 ÷ $470,000 = 63.83%\n\nEnding retail (include markdowns here):\n$470,000 − $30,000 − $310,000 = $130,000\n\nEnding cost: $130,000 × 63.83% ≈ $83,000`,
    whyWrong: [
      { key: "B", reason: "$90,000 is ending retail — must apply cost ratio to convert to cost." },
      { key: "C", reason: "Close — verify the cost ratio and retail balance calculation exactly." },
      { key: "D", reason: "$92,000 includes markdowns in the cost ratio, which overstates it. LCM excludes markdowns from the ratio denominator." },
    ],
  },

  {
    id: "far-27",
    topic: "Inventory — Consignment",
    difficulty: "Moderate",
    stem: `Seller Co. ships goods (cost $50,000) to Consignee Inc. on consignment. By year-end, Consignee sells 60% of the goods for $45,000 cash and keeps a 20% commission. Consignee remits net proceeds to Seller.

What revenue does Seller recognize?`,
    choices: [
      { key: "A", text: "$45,000 — gross selling price to end customers" },
      { key: "B", text: "$36,000 — net proceeds after commission" },
      { key: "C", text: "$30,000 — cost of goods" },
      { key: "D", text: "$0 — revenue deferred until remittance" },
    ],
    correct: "A",
    explanation: `Consignment: the consignor (Seller) retains title until goods are sold to the end customer. Seller is the PRINCIPAL.\n\nRevenue = gross selling price charged to end customers = $45,000.\nCommission ($9,000) is a selling expense, not a revenue reduction.\n\nSeller records: Revenue $45,000, Commission expense $9,000, COGS $30,000 (60% × $50,000).\n\nGoods on consignment are Seller's inventory — not on Consignee's balance sheet.`,
    whyWrong: [
      { key: "B", reason: "$36,000 is net cash received. Revenue is the gross selling price for the principal." },
      { key: "C", reason: "$30,000 is COGS, not revenue." },
      { key: "D", reason: "Revenue is recognized when Consignee sells to the end customer — not deferred until remittance." },
    ],
  },

  // ── GOVERNMENTAL ACCOUNTING ────────────────────────────────────────────────

  {
    id: "far-28",
    topic: "Governmental — Fund Types",
    difficulty: "Moderate",
    stem: `A city collects special assessments to fund sidewalk construction and is obligated for the debt. Construction is accounted for in a Capital Projects Fund.

Which fund accounts for debt service on the special assessment bonds?`,
    choices: [
      { key: "A", text: "General Fund" },
      { key: "B", text: "Special Revenue Fund" },
      { key: "C", text: "Debt Service Fund" },
      { key: "D", text: "Enterprise Fund" },
    ],
    correct: "C",
    explanation: `The Debt Service Fund accumulates resources and makes principal and interest payments on long-term governmental debt. When the government is obligated for special assessment debt, the Debt Service Fund handles repayment.\n\nThe Capital Projects Fund handles the construction activity only.`,
    whyWrong: [
      { key: "A", reason: "The General Fund covers general government operations — not specific debt service." },
      { key: "B", reason: "Special Revenue Funds account for restricted operating revenues — not debt repayment." },
      { key: "D", reason: "Enterprise Funds are for business-type activities (utilities, transit)." },
    ],
  },

  {
    id: "far-29",
    topic: "Governmental — Modified Accrual Revenue",
    difficulty: "Moderate",
    stem: `Riverton City levies property taxes of $5,000,000 for Year 1. Collections: $4,600,000 in Year 1; $250,000 within 60 days of year-end; $150,000 collected later in Year 2 (beyond 60 days).

Under modified accrual, how much property tax revenue is recognized in Year 1?`,
    choices: [
      { key: "A", text: "$5,000,000" },
      { key: "B", text: "$4,600,000" },
      { key: "C", text: "$4,850,000" },
      { key: "D", text: "$4,750,000" },
    ],
    correct: "C",
    explanation: `Modified accrual (GASB): revenues are recognized when "available" — measurable and collectible within the current period OR within 60 days after year-end.\n\n• $4,600,000 collected in Year 1 → recognized ✓\n• $250,000 collected within 60 days → recognized ✓ (meets "available")\n• $150,000 beyond 60 days → deferred revenue ✗\n\nYear 1 revenue = $4,600,000 + $250,000 = $4,850,000`,
    whyWrong: [
      { key: "A", reason: "$5,000,000 is full accrual — modified accrual requires the "available" criterion." },
      { key: "B", reason: "$4,600,000 is cash-basis — modified accrual also includes amounts due within 60 days of year-end." },
      { key: "D", reason: "$4,750,000 does not align with the 60-day cutoff rule." },
    ],
  },

  {
    id: "far-30",
    topic: "Governmental — Capital Outlay in General Fund",
    difficulty: "Moderate",
    stem: `A city purchases a police vehicle for $45,000 using General Fund resources. The vehicle has a 5-year life.

How is the purchase recorded in the General Fund?`,
    choices: [
      { key: "A", text: "Debit Capital Asset $45,000; Credit Cash $45,000" },
      { key: "B", text: "Debit Expenditure $45,000; Credit Cash $45,000, with annual depreciation" },
      { key: "C", text: "Debit Capital Outlay Expenditure $45,000; Credit Cash $45,000; no depreciation recorded" },
      { key: "D", text: "No entry — capital assets are tracked in a memorandum system only" },
    ],
    correct: "C",
    explanation: `Governmental funds use modified accrual. Key rules:\n1. Capital assets are NOT capitalized in governmental funds — the full cost is an expenditure\n2. Depreciation is NOT recorded in governmental funds\n\nCapital assets appear in government-wide statements (Statement of Net Position), not within the General Fund.\n\nEntry: Dr. Capital Outlay Expenditure $45,000 / Cr. Cash $45,000`,
    whyWrong: [
      { key: "A", reason: "Capitalizing assets applies to proprietary funds and government-wide statements — not governmental funds." },
      { key: "B", reason: "Depreciation is not recorded in governmental funds." },
      { key: "D", reason: "An expenditure entry IS required — the General Fund records it as a capital outlay expenditure." },
    ],
  },

  {
    id: "far-31",
    topic: "Governmental — Encumbrances",
    difficulty: "Moderate",
    stem: `On November 1, Year 1, Hillcrest City issues a purchase order for $80,000. The goods arrive January 15, Year 2 with an invoice for $82,000. The fiscal year ends December 31.

What entry is made on December 31, Year 1 related to the encumbrance?`,
    choices: [
      { key: "A", text: "No additional entry — the encumbrance was already recorded November 1" },
      { key: "B", text: "Debit Expenditure $80,000; Credit Cash $80,000" },
      { key: "C", text: "Reverse encumbrance and record $80,000 expenditure" },
      { key: "D", text: "Debit Encumbrances $80,000; Credit Reserve for Encumbrances $80,000 — first time recorded" },
    ],
    correct: "A",
    explanation: `When the purchase order was issued November 1:\nDr. Encumbrances $80,000 / Cr. Reserve for Encumbrances $80,000\n\nAt December 31, the goods have NOT arrived. No additional entry is needed — the encumbrance already on the books represents the outstanding commitment.\n\nThe encumbrance is reversed (and expenditure recorded at actual cost $82,000) in Year 2 when goods arrive.`,
    whyWrong: [
      { key: "B", reason: "Goods have not been received — recording an expenditure at year-end is premature." },
      { key: "C", reason: "Reversing and recording expenditure happens when goods are RECEIVED (Year 2), not at fiscal year-end." },
      { key: "D", reason: "The encumbrance was already recorded November 1 when the PO was issued." },
    ],
  },

  {
    id: "far-32",
    topic: "Governmental — Government-Wide Conversion",
    difficulty: "Hard",
    stem: `Grantwood City's General Fund reports revenues of $10,000,000 and expenditures of $9,200,000. Conversion to government-wide statements requires: add depreciation $400,000; reclassify capital outlay expenditure $200,000 as an asset.

What is the net change in net position on the government-wide Statement of Activities?`,
    choices: [
      { key: "A", text: "$800,000 increase" },
      { key: "B", text: "$600,000 increase" },
      { key: "C", text: "$400,000 increase" },
      { key: "D", text: "$1,000,000 increase" },
    ],
    correct: "B",
    explanation: `Fund surplus: $10,000,000 − $9,200,000 = $800,000\n\nGovernment-wide adjustments:\n+ $200,000 (capital outlay is an asset, not expense → reduces expenses)\n− $400,000 (add depreciation → increases expenses)\n\nNet adjustment: −$200,000\n\nGovernment-wide net position change: $800,000 − $200,000 = $600,000`,
    whyWrong: [
      { key: "A", reason: "$800,000 is the fund-basis surplus before government-wide adjustments." },
      { key: "C", reason: "$400,000 applies only the depreciation without adding back the capital outlay reclassification." },
      { key: "D", reason: "$1,000,000 applies the adjustments in the wrong direction." },
    ],
  },

  {
    id: "far-33",
    topic: "Governmental — Budgetary Accounting",
    difficulty: "Moderate",
    stem: `At the beginning of the year, Lakewood City adopts an annual budget with estimated revenues of $8,000,000 and appropriations of $7,500,000.

What journal entry does Lakewood record when it adopts the budget?`,
    choices: [
      { key: "A", text: "Debit Estimated Revenues $8,000,000; Credit Appropriations $7,500,000; Credit Budgetary Fund Balance $500,000" },
      { key: "B", text: "Debit Cash $8,000,000; Credit Appropriations $7,500,000; Credit Retained Earnings $500,000" },
      { key: "C", text: "No entry — budgets are disclosed in footnotes only" },
      { key: "D", text: "Debit Appropriations $7,500,000; Credit Estimated Revenues $8,000,000; Debit Budgetary Fund Balance $500,000" },
    ],
    correct: "A",
    explanation: `Governmental funds record the budget formally:\n\nDr. Estimated Revenues      $8,000,000\nCr. Appropriations          $7,500,000\nCr. Budgetary Fund Balance  $500,000\n\nEstimated Revenues is a debit (represents expected inflows). Appropriations is a credit (represents spending authority). The $500,000 difference goes to Budgetary Fund Balance.`,
    whyWrong: [
      { key: "B", reason: "Cash is not debited — revenues haven't been collected. Budgetary entries use Estimated Revenues, not Cash." },
      { key: "C", reason: "Governmental accounting uses formal budgetary integration — journal entries are required, not just disclosure." },
      { key: "D", reason: "The debits and credits are reversed. Estimated Revenues is debited; Appropriations is credited." },
    ],
  },

  // ── NOT-FOR-PROFIT (NFP) ───────────────────────────────────────────────────

  {
    id: "far-34",
    topic: "NFP — Net Asset Classification",
    difficulty: "Moderate",
    stem: `Horizon Foundation (private NFP) receives in Year 1:
• $100,000 unrestricted cash donation
• $50,000 restricted to scholarships
• $30,000 unconditional pledge receivable in 3 years
• Donated equipment FMV $20,000 (no donor restrictions stated)

What is the total increase in net assets WITHOUT donor restrictions?`,
    choices: [
      { key: "A", text: "$120,000" },
      { key: "B", text: "$150,000" },
      { key: "C", text: "$100,000" },
      { key: "D", text: "$200,000" },
    ],
    correct: "A",
    explanation: `Classification under ASC 958:\n• $100,000 cash: Without donor restrictions ✓\n• $50,000 scholarship restricted: With donor restrictions ✗\n• $30,000 pledge in 3 years: With donor restrictions (time restriction) ✗\n• $20,000 equipment: Without donor restrictions ✓ (no explicit restriction)\n\nWithout donor restrictions: $100,000 + $20,000 = $120,000`,
    whyWrong: [
      { key: "B", reason: "$150,000 incorrectly includes the $30,000 pledge. A pledge receivable in 3 years carries an implied time restriction." },
      { key: "C", reason: "$100,000 omits the donated equipment. Property received without explicit restrictions is without donor restrictions." },
      { key: "D", reason: "$200,000 includes all items. The scholarship restriction and 3-year pledge both carry donor restrictions." },
    ],
  },

  {
    id: "far-35",
    topic: "NFP — Conditional Contributions",
    difficulty: "Hard",
    stem: `A foundation receives a $500,000 grant with these terms: "Funds will be released when the organization completes construction of its new community center." Construction has not begun.

How should the $500,000 be classified when received?`,
    choices: [
      { key: "A", text: "Contribution revenue — with donor restrictions" },
      { key: "B", text: "Refundable advance (liability)" },
      { key: "C", text: "Contribution revenue — without donor restrictions" },
      { key: "D", text: "Deferred revenue recognized over construction period" },
    ],
    correct: "B",
    explanation: `ASC 958-605: conditional contributions (those with a barrier) are NOT recognized as revenue until the condition is met.\n\n"Funds released when construction COMPLETED" = a barrier/condition — the NFP must complete construction to have the right to the funds.\n\nRecord as a REFUNDABLE ADVANCE (liability) until the condition is met, then recognize as contribution revenue.`,
    whyWrong: [
      { key: "A", reason: "Contribution revenue is correct for unconditional restricted contributions. A completion requirement is a condition/barrier, not merely a restriction on use." },
      { key: "C", reason: "Fails both the conditional test and the restriction test." },
      { key: "D", reason: "Deferred revenue applies in exchange transactions. Conditional contributions are liabilities until the barrier is overcome." },
    ],
  },

  {
    id: "far-36",
    topic: "NFP — Functional Expense Allocation",
    difficulty: "Moderate",
    stem: `Community Arts NFP has total expenses of $300,000 (salaries $200,000, rent $60,000, supplies $40,000). Activities: 60% program, 25% management & general, 15% fundraising.

What is total program expense?`,
    choices: [
      { key: "A", text: "$180,000" },
      { key: "B", text: "$120,000" },
      { key: "C", text: "$150,000" },
      { key: "D", text: "$200,000" },
    ],
    correct: "A",
    explanation: `Under ASC 958-720, NFPs allocate ALL expenses by function.\n\nTotal expenses: $200,000 + $60,000 + $40,000 = $300,000\nProgram (60%): $300,000 × 60% = $180,000`,
    whyWrong: [
      { key: "B", reason: "$120,000 applies 60% to salaries alone — all expenses must be allocated, not just salaries." },
      { key: "C", reason: "$150,000 uses 50% — incorrect percentage." },
      { key: "D", reason: "$200,000 is total salaries only, not total allocated program expense." },
    ],
  },

  {
    id: "far-37",
    topic: "NFP — Endowments (UPMIFA)",
    difficulty: "Hard",
    stem: `Oakdale Foundation receives a $1,000,000 permanent endowment: principal must be maintained in perpetuity; investment income may be used for programs. In Year 1, investment income is $50,000 and portfolio appreciation is $30,000.

Under ASC 958 and UPMIFA, how are the appreciation and income classified before board appropriation?`,
    choices: [
      { key: "A", text: "Both appreciation and income: without donor restrictions" },
      { key: "B", text: "Appreciation: with donor restrictions; income: without donor restrictions" },
      { key: "C", text: "Appreciation: with donor restrictions; income: with donor restrictions (until appropriated)" },
      { key: "D", text: "Both: with donor restrictions in perpetuity" },
    ],
    correct: "C",
    explanation: `Under UPMIFA and ASC 958:\n• Principal ($1,000,000): with donor restrictions (in perpetuity)\n• Appreciation ($30,000): with donor restrictions UNTIL appropriated by the governing board\n• Income ($50,000): with donor restrictions UNTIL appropriated for the donor-specified purpose\n\nAll endowment returns are treated as restricted until the board appropriates them for spending. Once appropriated and spent for programs, they are reclassified to without donor restrictions.`,
    whyWrong: [
      { key: "A", reason: "Neither income nor appreciation is automatically without restrictions. Both require board appropriation first." },
      { key: "B", reason: "Income is also restricted until appropriated — UPMIFA treats all endowment returns as restricted by default." },
      { key: "D", reason: "Income and appreciation are NOT permanently restricted — they are temporarily restricted until board appropriation." },
    ],
  },

  // ── CONSOLIDATIONS & EQUITY METHOD ────────────────────────────────────────

  {
    id: "far-38",
    topic: "Equity Method — Investment Carrying Value",
    difficulty: "Moderate",
    stem: `On January 1, Year 1, Paragon Corp. purchases 30% of Simco Inc. for $600,000. Simco's net assets book value is $1,800,000. During Year 1, Simco reports net income of $200,000 and pays dividends of $80,000.

What is Paragon's investment in Simco at December 31, Year 1?`,
    choices: [
      { key: "A", text: "$600,000" },
      { key: "B", text: "$636,000" },
      { key: "C", text: "$660,000" },
      { key: "D", text: "$624,000" },
    ],
    correct: "B",
    explanation: `Equity method:\n\nOpening investment:         $600,000\n+ Share of income (30%):    $200,000 × 30% = +$60,000\n− Share of dividends (30%): $80,000 × 30% = −$24,000\nEnding investment:          $636,000`,
    whyWrong: [
      { key: "A", reason: "$600,000 ignores both the income and dividend adjustments required by the equity method." },
      { key: "C", reason: "$660,000 adds $60,000 income but forgets to subtract $24,000 in dividends." },
      { key: "D", reason: "$624,000 subtracts dividends but incorrectly calculates or omits the income." },
    ],
  },

  {
    id: "far-39",
    topic: "Equity Method — Excess Purchase Price",
    difficulty: "Hard",
    stem: `On January 1, Year 1, Inland Corp. pays $800,000 for 40% of Shoreline Inc. Shoreline's net asset book value is $1,500,000. The excess purchase price is attributed to a patent with a 10-year remaining life. Shoreline earns $100,000 net income in Year 1.

What is Inland's equity in earnings of Shoreline for Year 1?`,
    choices: [
      { key: "A", text: "$40,000" },
      { key: "B", text: "$20,000" },
      { key: "C", text: "$30,000" },
      { key: "D", text: "$32,000" },
    ],
    correct: "B",
    explanation: `Step 1 — Excess purchase price:\nPurchase price: $800,000\n40% of book value: $1,500,000 × 40% = $600,000\nExcess: $800,000 − $600,000 = $200,000 (attributed to patent)\n\nStep 2 — Annual amortization:\n$200,000 ÷ 10 years = $20,000/year\n\nStep 3 — Equity in earnings:\nShare of net income: $100,000 × 40% = $40,000\n− Excess amortization: $20,000\nEquity in earnings: $20,000`,
    whyWrong: [
      { key: "A", reason: "$40,000 is the unadjusted income share. Excess purchase price attributable to depreciable assets must be amortized." },
      { key: "C", reason: "$30,000 reflects an incorrect amortization amount. $200,000 ÷ 10 years = $20,000/year." },
      { key: "D", reason: "$32,000 does not follow from the correct calculation." },
    ],
  },

  {
    id: "far-40",
    topic: "Consolidations — Intercompany Profit Elimination",
    difficulty: "Hard",
    stem: `Parent Corp. owns 100% of Sub Inc. Sub sells inventory to Parent for $150,000; Sub's cost was $90,000. At year-end, Parent holds 40% of the purchased inventory.

What elimination entry is required for consolidation?`,
    choices: [
      { key: "A", text: "Eliminate $60,000 intercompany profit from income" },
      { key: "B", text: "Eliminate $24,000 unrealized profit from inventory and retained earnings" },
      { key: "C", text: "Eliminate $150,000 intercompany sales and $90,000 COGS only" },
      { key: "D", text: "No elimination — the transaction is at arm's length" },
    ],
    correct: "B",
    explanation: `Intercompany profits on inventory not yet sold externally must be eliminated.\n\nTotal profit: $150,000 − $90,000 = $60,000\nRemaining unsold: 40%\nUnrealized profit: $60,000 × 40% = $24,000\n\nElimination: Dr. Retained Earnings / Cr. Inventory $24,000\n\nThe 60% already sold to external parties ($36,000) is realized and stays in income.`,
    whyWrong: [
      { key: "A", reason: "$60,000 is total profit. Only the unrealized portion still in inventory (40% = $24,000) is eliminated." },
      { key: "C", reason: "The sales/COGS elimination is a separate step; the inventory profit elimination addresses the balance sheet." },
      { key: "D", reason: "Even arm's-length intercompany transactions require elimination in consolidation." },
    ],
  },

  {
    id: "far-41",
    topic: "Consolidations — Non-Controlling Interest",
    difficulty: "Hard",
    stem: `Monarch Corp. acquires 80% of Regent Inc. for $640,000. Regent's net assets have a fair value of $750,000. Monarch uses the full goodwill (fair value) method under ASC 805.

What is goodwill and the non-controlling interest?`,
    choices: [
      { key: "A", text: "Goodwill $40,000; NCI $150,000 (proportionate share of book value)" },
      { key: "B", text: "Goodwill $50,000; NCI $150,000 (proportionate share of net asset FV)" },
      { key: "C", text: "Goodwill $50,000; NCI $160,000 (fair value method)" },
      { key: "D", text: "Goodwill $0; NCI $160,000" },
    ],
    correct: "C",
    explanation: `Full goodwill method (ASC 805):\n\nImplied 100% fair value: $640,000 ÷ 80% = $800,000\n\nGoodwill: $800,000 − $750,000 (net asset FV) = $50,000\n\nNCI at fair value: 20% × $800,000 = $160,000\n\nUnder the full goodwill method, NCI is measured at its fair value share of the entire entity — not the proportionate share of net asset fair value.`,
    whyWrong: [
      { key: "A", reason: "$40,000 goodwill is wrong. Correct goodwill = $800,000 implied FV − $750,000 net asset FV = $50,000." },
      { key: "B", reason: "$150,000 NCI uses proportionate share of net asset FV — that is the partial goodwill method, not the full goodwill method." },
      { key: "D", reason: "Goodwill exists because total FV ($800,000) > net asset FV ($750,000)." },
    ],
  },

  {
    id: "far-42",
    topic: "Business Combinations — Goodwill vs. Bargain Purchase",
    difficulty: "Hard",
    stem: `Bridger Corp. acquires 100% of Cascade Inc. for $2,000,000. Cascade's assets have a fair value of $2,500,000 and liabilities fair value of $800,000.

What is recognized?`,
    choices: [
      { key: "A", text: "Goodwill of $300,000" },
      { key: "B", text: "Bargain purchase gain of $300,000" },
      { key: "C", text: "Goodwill of $600,000" },
      { key: "D", text: "No goodwill — book values are used" },
    ],
    correct: "A",
    explanation: `ASC 805 — Acquisition method:\n\nFair value of net assets: $2,500,000 − $800,000 = $1,700,000\nConsideration: $2,000,000\n\nGoodwill = $2,000,000 − $1,700,000 = $300,000\n\nGoodwill arises when consideration exceeds FV of identifiable net assets. Book values are irrelevant — use fair values.`,
    whyWrong: [
      { key: "B", reason: "A bargain purchase gain arises when consideration is LESS than FV of net assets. Here consideration ($2M) > net asset FV ($1.7M)." },
      { key: "C", reason: "$600,000 uses book value of net assets — ASC 805 requires fair value measurement." },
      { key: "D", reason: "Book values are not used under ASC 805. Goodwill is based on fair values." },
    ],
  },

  // ── CASH FLOW STATEMENT ───────────────────────────────────────────────────

  {
    id: "far-43",
    topic: "Cash Flow — Activity Classification",
    difficulty: "Moderate",
    stem: `Which of the following is classified as an INVESTING activity?`,
    choices: [
      { key: "A", text: "Payment of dividends to shareholders" },
      { key: "B", text: "Purchase of equipment for cash" },
      { key: "C", text: "Proceeds from issuance of long-term bonds" },
      { key: "D", text: "Collection of accounts receivable" },
    ],
    correct: "B",
    explanation: `Activity classifications:\n• Operating: normal business operations (collections, payments to suppliers, taxes)\n• Investing: acquisition/disposal of long-term assets and investments\n• Financing: debt/equity transactions, dividends paid\n\nPurchase of equipment → Investing activity ✓\nDividends paid → Financing\nBond proceeds → Financing\nCollections from customers → Operating`,
    whyWrong: [
      { key: "A", reason: "Dividends paid are a financing activity — returns to equity investors." },
      { key: "C", reason: "Bond proceeds are a financing activity — raising capital from creditors." },
      { key: "D", reason: "Collecting receivables is an operating activity — flows from revenue-generating operations." },
    ],
  },

  {
    id: "far-44",
    topic: "Cash Flow — Indirect Method",
    difficulty: "Moderate",
    stem: `Perkins Corp. reports net income of $150,000. Additional data:
• Depreciation: $30,000
• Increase in accounts receivable: $20,000
• Decrease in inventory: $15,000
• Increase in accounts payable: $10,000
• Gain on sale of equipment: $8,000

Using the indirect method, what is cash from operating activities?`,
    choices: [
      { key: "A", text: "$177,000" },
      { key: "B", text: "$185,000" },
      { key: "C", text: "$163,000" },
      { key: "D", text: "$155,000" },
    ],
    correct: "A",
    explanation: `Indirect method:\n\nNet income:               $150,000\n+ Depreciation:          +$ 30,000\n− Gain on equipment:     −$  8,000 (remove — belongs in investing)\n− Increase in AR:        −$ 20,000\n+ Decrease in inventory: +$ 15,000\n+ Increase in AP:        +$ 10,000\n\nCash from operations: $177,000`,
    whyWrong: [
      { key: "B", reason: "$185,000 adds the gain instead of subtracting it. Gains on asset sales are removed and reported in investing." },
      { key: "C", reason: "$163,000 likely misapplies one or more working capital changes." },
      { key: "D", reason: "$155,000 omits depreciation or misapplies adjustments." },
    ],
  },

  {
    id: "far-45",
    topic: "Cash Flow — Non-Cash Disclosures",
    difficulty: "Moderate",
    stem: `During the year, Halton Corp. acquires land valued at $200,000 by issuing common stock. Also, it exchanges equipment (carrying value $50,000) for a delivery truck (FMV $65,000).

How are these reported on the cash flow statement?`,
    choices: [
      { key: "A", text: "Both shown in the investing section" },
      { key: "B", text: "Both disclosed as supplemental non-cash investing and financing activities" },
      { key: "C", text: "Land acquisition is non-cash; truck exchange is an investing activity" },
      { key: "D", text: "Neither disclosed — non-cash transactions are excluded" },
    ],
    correct: "B",
    explanation: `ASC 230: Non-cash investing and financing transactions do NOT appear in the body of the cash flow statement. They are disclosed in a supplemental schedule.\n\n• Land for stock: non-cash investing + financing → supplemental\n• Equipment for truck: non-cash investing → supplemental\n\nBoth involve no cash and are disclosed separately.`,
    whyWrong: [
      { key: "A", reason: "Non-cash transactions are NOT included in the investing section of the statement itself." },
      { key: "C", reason: "The truck exchange also involves no cash — it is also a supplemental disclosure." },
      { key: "D", reason: "ASC 230 requires disclosure. Non-cash transactions must be disclosed, not ignored." },
    ],
  },

  {
    id: "far-46",
    topic: "Cash Flow — Direct Method",
    difficulty: "Hard",
    stem: `Saxton Corp. uses the direct method:
• Sales: $800,000; Beginning AR $60,000; Ending AR $80,000
• COGS: $480,000; Beginning inventory $90,000; Ending inventory $70,000
• Beginning AP $50,000; Ending AP $65,000

What are cash collected from customers and cash paid to suppliers?`,
    choices: [
      { key: "A", text: "Collected $780,000 | Paid $445,000" },
      { key: "B", text: "Collected $820,000 | Paid $445,000" },
      { key: "C", text: "Collected $780,000 | Paid $460,000" },
      { key: "D", text: "Collected $820,000 | Paid $460,000" },
    ],
    correct: "A",
    explanation: `Cash collected:\nSales $800,000 − Increase in AR ($80k−$60k = $20k) = $780,000\n\nCash paid to suppliers:\nPurchases = COGS + End inv − Beg inv = $480,000 + $70,000 − $90,000 = $460,000\nCash paid = Purchases − Increase in AP ($65k−$50k = $15k) = $460,000 − $15,000 = $445,000`,
    whyWrong: [
      { key: "B", reason: "$820,000 adds the AR increase instead of subtracting. AR went UP, so less cash was collected than revenue recorded." },
      { key: "C", reason: "$460,000 paid ignores the AP increase. More AP means less cash was paid than purchases made." },
      { key: "D", reason: "Both errors combined." },
    ],
  },

  // ── PENSIONS & DEFERRED TAXES ─────────────────────────────────────────────

  {
    id: "far-47",
    topic: "Pensions — Net Periodic Cost",
    difficulty: "Hard",
    stem: `Stonegate Corp. defined benefit pension data for Year 1:
• Service cost: $80,000
• Interest cost: $45,000
• Expected return on plan assets: $30,000
• Amortization of prior service cost: $10,000
• Amortization of net actuarial loss: $5,000

What is net periodic pension cost?`,
    choices: [
      { key: "A", text: "$110,000" },
      { key: "B", text: "$140,000" },
      { key: "C", text: "$100,000" },
      { key: "D", text: "$125,000" },
    ],
    correct: "A",
    explanation: `Net periodic pension cost (ASC 715):\n\n+ Service cost:               $80,000\n+ Interest cost:              $45,000\n− Expected return on assets: $(30,000)\n+ PSC amortization:          $10,000\n+ Actuarial loss amort:      $ 5,000\n\nTotal: $110,000`,
    whyWrong: [
      { key: "B", reason: "$140,000 adds the expected return instead of subtracting. Plan asset returns REDUCE pension cost." },
      { key: "C", reason: "$100,000 omits the amortization items." },
      { key: "D", reason: "$125,000 misapplies one of the components." },
    ],
  },

  {
    id: "far-48",
    topic: "Pensions — Funded Status",
    difficulty: "Moderate",
    stem: `At December 31, Year 1, Farrell Co.'s pension plan has a PBO of $900,000 and plan assets with fair value of $750,000.

How does Farrell present this on the balance sheet?`,
    choices: [
      { key: "A", text: "Pension asset of $150,000" },
      { key: "B", text: "Pension liability of $150,000" },
      { key: "C", text: "Disclose only in footnotes" },
      { key: "D", text: "Net pension cost of $150,000 on the income statement" },
    ],
    correct: "B",
    explanation: `ASC 715: funded status IS recognized on the balance sheet.\n\nFunded status = Plan assets − PBO = $750,000 − $900,000 = $(150,000) → Underfunded\n\nRecord pension LIABILITY of $150,000.\n\nAn overfunded plan (assets > PBO) is a pension asset.`,
    whyWrong: [
      { key: "A", reason: "A pension asset arises when plan assets EXCEED PBO. Here PBO > assets." },
      { key: "C", reason: "ASC 715 requires balance sheet recognition. Footnote-only was old GAAP." },
      { key: "D", reason: "Funded status is a balance sheet item. Net periodic pension cost appears on the income statement." },
    ],
  },

  {
    id: "far-49",
    topic: "Deferred Taxes — Temporary Differences",
    difficulty: "Moderate",
    stem: `Cranston Corp. uses straight-line depreciation for GAAP and MACRS for taxes. Year 1 book depreciation: $50,000; tax depreciation: $80,000. Tax rate: 25%.

What is the deferred tax consequence?`,
    choices: [
      { key: "A", text: "Deferred tax asset of $7,500" },
      { key: "B", text: "Deferred tax liability of $7,500" },
      { key: "C", text: "Deferred tax liability of $12,500" },
      { key: "D", text: "No deferred tax — depreciation differences are permanent" },
    ],
    correct: "B",
    explanation: `Tax deduction ($80,000) > Book expense ($50,000) → taxable income is lower now. Taxes are lower today but will be higher in the future — DEFERRED TAX LIABILITY.\n\nTemporary difference: $80,000 − $50,000 = $30,000\nDTL: $30,000 × 25% = $7,500`,
    whyWrong: [
      { key: "A", reason: "A DTA arises when you pay MORE taxes now than book suggests. Here taxes are LOWER (bigger deduction) → DTL." },
      { key: "C", reason: "$12,500 applies 25% to book depreciation ($50,000) rather than the temporary difference ($30,000)." },
      { key: "D", reason: "Depreciation differences are TEMPORARY — both methods will fully depreciate the asset; timing differs. Deferred taxes are required." },
    ],
  },

  {
    id: "far-50",
    topic: "Deferred Taxes — Valuation Allowance",
    difficulty: "Hard",
    stem: `Merrill Corp. has a deferred tax asset (DTA) of $200,000 related to net operating loss carryforwards. Merrill's management assesses that it is more likely than not that only $120,000 of the DTA will be realized.

What is the proper accounting treatment?`,
    choices: [
      { key: "A", text: "Record the DTA at $200,000 — no adjustment needed" },
      { key: "B", text: "Record the DTA at $120,000 — reduce to realizable amount" },
      { key: "C", text: "Record a valuation allowance of $80,000 against the DTA" },
      { key: "D", text: "Expense $200,000 immediately — NOL carryforwards are not recognized" },
    ],
    correct: "C",
    explanation: `ASC 740: a valuation allowance is required when it is more likely than not (>50% probability) that some portion of a DTA will NOT be realized.\n\nDTA: $200,000\nExpected to be realized: $120,000\nUnlikely to be realized: $80,000\n\nRecord a valuation allowance of $80,000:\nDr. Income Tax Expense $80,000\nCr. Valuation Allowance — DTA $80,000\n\nNet DTA on balance sheet: $200,000 − $80,000 = $120,000`,
    whyWrong: [
      { key: "A", reason: "If realization is not more likely than not for the full amount, a valuation allowance is required. Recording the full $200,000 overstates the asset." },
      { key: "B", reason: "The DTA gross amount stays at $200,000. The reduction is shown as a contra account (valuation allowance), not by reducing the DTA itself." },
      { key: "D", reason: "NOL carryforwards ARE recognized as DTAs. They are only reduced by a valuation allowance to the extent realization is uncertain." },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// AUD — 5 QUESTIONS (to be expanded in next update)
// ─────────────────────────────────────────────────────────────────────────────

export const AUD_QUESTIONS: MCQ[] = [
  {
    id: "aud-1",
    topic: "Risk Assessment — Audit Risk Model",
    difficulty: "Moderate",
    stem: `An auditor determines that inherent risk is high and control risk is high for accounts receivable.

To maintain the same overall audit risk level, what should the auditor do regarding detection risk?`,
    choices: [
      { key: "A", text: "Set detection risk high to compensate" },
      { key: "B", text: "Set detection risk low by performing more extensive substantive procedures" },
      { key: "C", text: "Detection risk is not affected by inherent or control risk" },
      { key: "D", text: "Rely more on internal controls to reduce detection risk" },
    ],
    correct: "B",
    explanation: `Audit risk model: AR = IR × CR × DR\n\nIf IR and CR are both high, their product is large. To keep AR at an acceptably low level, DR must be set LOW — meaning extensive substantive procedures are required to catch errors that controls didn't prevent.`,
    whyWrong: [
      { key: "A", reason: "Setting DR high when IR and CR are high results in unacceptably high audit risk." },
      { key: "C", reason: "DR is the auditor's lever in the model — it is directly affected by IR and CR." },
      { key: "D", reason: "Control risk is assessed as high — controls are unreliable. You cannot rely more on controls already deemed ineffective." },
    ],
  },
  {
    id: "aud-2",
    topic: "Audit Evidence — Positive Confirmations",
    difficulty: "Moderate",
    stem: `An auditor sends positive confirmation requests to 50 customers for accounts receivable. By the deadline, 12 responses are received. The auditor cannot reach the remaining 38 customers by alternative means.

What is the most appropriate response?`,
    choices: [
      { key: "A", text: "Conclude balances are fairly stated — silence implies agreement" },
      { key: "B", text: "Apply alternative procedures such as examining subsequent cash receipts and shipping documents" },
      { key: "C", text: "Issue a qualified opinion due to the high non-response rate" },
      { key: "D", text: "Send a second request and accept the resulting response rate" },
    ],
    correct: "B",
    explanation: `For positive confirmations, a non-response provides NO audit evidence — silence is not agreement.\n\nAU-C Section 505: when positive confirmations are not returned, apply alternative procedures:\n• Examine subsequent cash receipts\n• Inspect shipping documents and sales invoices\n\nIf alternatives cannot be performed and the non-responses are material, consider the audit opinion impact.`,
    whyWrong: [
      { key: "A", reason: "Silence on a positive confirmation is NOT evidence. Positive confirmations require an explicit response." },
      { key: "C", reason: "A high non-response rate alone does not trigger qualification — alternative procedures must be attempted first." },
      { key: "D", reason: "Sending a second request is reasonable, but remaining non-responses still require alternative procedures." },
    ],
  },
  {
    id: "aud-3",
    topic: "Internal Controls — Segregation of Duties",
    difficulty: "Moderate",
    stem: `A company's accounts payable clerk can add new vendors, approve invoices for payment, and initiate wire transfers.

Which internal control weakness does this best describe?`,
    choices: [
      { key: "A", text: "Lack of physical safeguards over assets" },
      { key: "B", text: "Inadequate authorization procedures" },
      { key: "C", text: "Insufficient segregation of duties, creating fraud opportunity" },
      { key: "D", text: "Failure to perform independent reconciliations" },
    ],
    correct: "C",
    explanation: `The clerk controls three incompatible functions:\n1. Setup (adding vendors)\n2. Authorization (approving invoices)\n3. Execution (initiating wire transfers)\n\nOne person controlling all three stages enables fraud: create fictitious vendor → approve invoice → wire funds. Proper SOD separates authorization, recording, and custody.`,
    whyWrong: [
      { key: "A", reason: "Physical safeguards protect tangible assets. This is a process/access control issue." },
      { key: "B", reason: "Inadequate authorization is a symptom, not the root description. The core issue is one person having too many incompatible functions." },
      { key: "D", reason: "Reconciliations are a compensating control, not the primary weakness identified here." },
    ],
  },
  {
    id: "aud-4",
    topic: "Audit Opinions — Modified Reports",
    difficulty: "Hard",
    stem: `During an audit of Westmore Corp., the auditor discovers that management did not disclose a material related-party transaction. Management refuses to add the disclosure. The financial statements are otherwise fairly presented.

What audit opinion is appropriate?`,
    choices: [
      { key: "A", text: "Unmodified with an emphasis-of-matter paragraph" },
      { key: "B", text: "Qualified opinion" },
      { key: "C", text: "Adverse opinion" },
      { key: "D", text: "Disclaimer of opinion" },
    ],
    correct: "B",
    explanation: `Decision framework:\n• Misstatement is MATERIAL (required disclosure omitted) ✓\n• Misstatement is NOT pervasive — statements are otherwise fairly presented ✓\n• Management refuses to correct\n\nMaterial but NOT pervasive → Qualified opinion ("except for" the specific omission).\nMaterial AND pervasive → Adverse.\nScope limitation → Disclaimer.`,
    whyWrong: [
      { key: "A", reason: "Unmodified means no material misstatements. A missing required disclosure is a misstatement." },
      { key: "C", reason: "Adverse opinions apply to pervasive misstatements. Here only one disclosure is missing." },
      { key: "D", reason: "Disclaimers apply to scope limitations (inability to obtain evidence), not disclosure issues." },
    ],
  },
  {
    id: "aud-5",
    topic: "Sampling — Attribute Sampling",
    difficulty: "Hard",
    stem: `An auditor uses attribute sampling with a tolerable deviation rate of 5% and expected deviation rate of 1%. After testing 100 items, 4 deviations are found (4% sample rate).

What is the most appropriate conclusion?`,
    choices: [
      { key: "A", text: "Control is effective — 4% is below the tolerable rate of 5%" },
      { key: "B", text: "Assess control risk as lower — deviations are minimal" },
      { key: "C", text: "Sample rate (4%) significantly exceeds expected rate (1%); evaluate whether to increase control risk assessment" },
      { key: "D", text: "Disregard results and rely on prior year control assessment" },
    ],
    correct: "C",
    explanation: `The 4% sample rate is below the 5% TDR — technically within tolerable limits. However, it significantly exceeds the 1% expected rate, meaning controls are operating worse than assumed when designing the sample.\n\nThe auditor should:\n1. Consider the upper deviation limit (confidence interval)\n2. Evaluate whether to increase the assessed control risk level\n3. Potentially expand substantive procedures`,
    whyWrong: [
      { key: "A", reason: "Simply concluding 4% < 5% = effective ignores that the sample was designed assuming 1%. The auditor must consider the upper deviation limit and reassess." },
      { key: "B", reason: "Finding MORE deviations than expected means controls are LESS effective — control risk should potentially increase, not decrease." },
      { key: "D", reason: "Current-year evidence must be evaluated. Relying on prior year assessment ignores current findings." },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// REG — 5 QUESTIONS (to be expanded in next update)
// ─────────────────────────────────────────────────────────────────────────────

export const REG_QUESTIONS: MCQ[] = [
  {
    id: "reg-1",
    topic: "Individual Taxation — Filing Status",
    difficulty: "Moderate",
    stem: `Marcus and Linda separated in March but are not legally divorced. Their one dependent child lives with Linda all year. Marcus pays all household expenses for Linda's home.

Which filing status should Marcus use?`,
    choices: [
      { key: "A", text: "Single" },
      { key: "B", text: "Married Filing Separately" },
      { key: "C", text: "Head of Household" },
      { key: "D", text: "Married Filing Jointly" },
    ],
    correct: "B",
    explanation: `Marcus and Linda are not legally divorced — merely separated. Under IRC rules, they are still married for tax purposes.\n\nMarcus cannot file HOH because the child's principal home is Linda's, not Marcus's — even though Marcus pays expenses. HOH requires the taxpayer's home to be the qualifying child's principal residence.\n\nMarcus must file Married Filing Separately.`,
    whyWrong: [
      { key: "A", reason: "Single requires being unmarried or legally separated/divorced under state law. An informal separation doesn't qualify." },
      { key: "C", reason: "HOH requires the qualifying child to live in the TAXPAYER's home. The child lives with Linda." },
      { key: "D", reason: "MFJ requires both spouses to agree. With the facts given, MFS is the required status." },
    ],
  },
  {
    id: "reg-2",
    topic: "Basis — Partnership (Outside Basis)",
    difficulty: "Hard",
    stem: `Donna contributes to a partnership for a 30% interest:
• Cash: $20,000
• Equipment: FMV $50,000, adjusted basis $30,000, subject to $15,000 liability (assumed by partnership)

What is Donna's initial outside basis?`,
    choices: [
      { key: "A", text: "$39,500" },
      { key: "B", text: "$35,000" },
      { key: "C", text: "$50,000" },
      { key: "D", text: "$70,000" },
    ],
    correct: "A",
    explanation: `Outside basis (IRC §722):\n\nContributed property basis + Cash:  $30,000 + $20,000 = $50,000\n\nLiability adjustment:\n− Liability assumed by partnership: −$15,000 (treated as cash distribution)\n+ Donna's share of liability (30%): +$4,500 (she's still responsible for 30%)\nNet reduction: $10,500\n\nOutside basis: $50,000 − $10,500 = $39,500`,
    whyWrong: [
      { key: "B", reason: "$35,000 omits Donna's share-back of the liability (30% × $15,000 = $4,500 must be added back)." },
      { key: "C", reason: "$50,000 fails to reduce basis for the net liability relief." },
      { key: "D", reason: "$70,000 uses FMV ($50,000) instead of adjusted basis ($30,000). Always use adjusted basis for outside basis." },
    ],
  },
  {
    id: "reg-3",
    topic: "Corporate Taxation — Dividends Received Deduction",
    difficulty: "Moderate",
    stem: `Crestline Corp. owns 25% of Dalton Corp. and receives a $100,000 dividend. No taxable income limitation applies.

What is the dividends received deduction?`,
    choices: [
      { key: "A", text: "$50,000" },
      { key: "B", text: "$65,000" },
      { key: "C", text: "$80,000" },
      { key: "D", text: "$100,000" },
    ],
    correct: "B",
    explanation: `DRD rates (post-TCJA, IRC §243):\n• <20% ownership → 50%\n• 20%–<80% ownership → 65%\n• ≥80% ownership → 100%\n\nCrestline owns 25% → 65% DRD\nDRD = $100,000 × 65% = $65,000`,
    whyWrong: [
      { key: "A", reason: "$50,000 is the DRD for less than 20% ownership. Crestline owns 25%." },
      { key: "C", reason: "$80,000 was the pre-TCJA rate. The TCJA (2017) reduced 20%–80% ownership DRD from 80% to 65%." },
      { key: "D", reason: "$100,000 (100% DRD) applies only to affiliated groups with ≥80% ownership." },
    ],
  },
  {
    id: "reg-4",
    topic: "Business Law — Agency Authority",
    difficulty: "Moderate",
    stem: `Paula is authorized to sell Wilson's home for no less than $400,000. Without Wilson's knowledge, Paula accepts $385,000 and signs a purchase agreement on Wilson's behalf.

What is the legal effect of Paula's actions?`,
    choices: [
      { key: "A", text: "The contract is void — Paula lacked authority" },
      { key: "B", text: "The contract is voidable by Wilson — Paula exceeded actual authority" },
      { key: "C", text: "The contract binds Wilson — the buyer had apparent authority" },
      { key: "D", text: "Paula has apparent authority — the contract binds Wilson" },
    ],
    correct: "B",
    explanation: `Paula had actual authority to sell — but NOT below $400,000. Exceeding actual authority does not make the contract void (zero authority); it makes it voidable by the principal.\n\nWilson may ratify or disaffirm. Since Paula exceeded her express authority, the contract is voidable at Wilson's election.`,
    whyWrong: [
      { key: "A", reason: "Void requires no authority at all. Paula had authority to sell — just not below $400k. Excess authority → voidable, not void." },
      { key: "C", reason: "Apparent authority applies to the AGENT, not the buyer. Confuses who holds authority." },
      { key: "D", reason: "Apparent authority requires the PRINCIPAL to create the appearance of authority — Paula cannot create her own apparent authority." },
    ],
  },
  {
    id: "reg-5",
    topic: "S Corporation — Shareholder Basis and Loss Deductibility",
    difficulty: "Hard",
    stem: `Owen's S corp stock basis is $30,000 at year-start. He has a $10,000 loan to the S corp. Year 1: ordinary loss $45,000; tax-exempt income $5,000. Owen owns 100%.

How much loss can Owen deduct in Year 1?`,
    choices: [
      { key: "A", text: "$30,000" },
      { key: "B", text: "$45,000" },
      { key: "C", text: "$35,000" },
      { key: "D", text: "$40,000" },
    ],
    correct: "B",
    explanation: `S corp loss deductibility (IRC §1366, §1367): limited to stock basis + debt basis.\n\nStep 1 — Add tax-exempt income to stock basis FIRST:\n$30,000 + $5,000 = $35,000 stock basis\n\nStep 2 — Total available:\nStock basis: $35,000\nDebt basis: $10,000\nTotal: $45,000\n\nStep 3 — Apply $45,000 loss:\nFirst reduces stock to $0 ($35,000 absorbed)\nThen reduces debt basis by remaining $10,000 → $0\n\nAll $45,000 is deductible.`,
    whyWrong: [
      { key: "A", reason: "$30,000 ignores tax-exempt income that increases stock basis to $35,000 before losses are applied." },
      { key: "C", reason: "$35,000 only uses stock basis, ignoring the $10,000 debt basis available after stock is exhausted." },
      { key: "D", reason: "$40,000 may add only partial debt basis. Total available = $45,000 (stock $35k + debt $10k)." },
    ],
  },
]

export const ALL_QUESTIONS: Record<Section, MCQ[]> = {
  FAR: FAR_QUESTIONS,
  AUD: AUD_QUESTIONS,
  REG: REG_QUESTIONS,
}
