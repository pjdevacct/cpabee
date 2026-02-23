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
    explanation: `Modified accrual (GASB): revenues are recognized when "available" — measurable and collectible within the current period OR within 60 days after year-end.
• $4,600,000 collected in Year 1 → recognized ✓
• $250,000 collected within 60 days → recognized ✓
• $150,000 beyond 60 days → deferred revenue ✗
Year 1 revenue = $4,600,000 + $250,000 = $4,850,000`,
    whyWrong: [
      { key: "A", reason: "$5,000,000 is full accrual — modified accrual requires the 'available' criterion." },
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
// AUD — 50 QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const AUD_QUESTIONS: MCQ[] = [

  // ── AUDIT RISK (aud-1 to aud-6) ───────────────────────────────────────────

  {
    id: "aud-1",
    topic: "Audit Risk — Risk Model",
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
    explanation: `Audit risk model: AR = IR x CR x DR

If IR and CR are both high, their product is large. To keep overall audit risk at an acceptable level, detection risk must be set LOW -- achieved by performing more extensive substantive procedures.

DR is the only component the auditor directly controls. When IR and CR are high, the auditor compensates by doing more substantive work.`,
    whyWrong: [
      { key: "A", reason: "Setting DR high when IR and CR are high results in unacceptably high overall audit risk." },
      { key: "C", reason: "DR is the auditor's lever -- it is directly and inversely affected by IR and CR." },
      { key: "D", reason: "Control risk is assessed as HIGH -- controls are unreliable. You cannot rely more on controls already deemed ineffective." },
    ],
  },

  {
    id: "aud-2",
    topic: "Audit Risk — Significant Risks",
    difficulty: "Moderate",
    stem: `During risk assessment, the auditor identifies a risk requiring special consideration due to its complexity and the likelihood of material misstatement. The risk involves highly subjective revenue recognition judgments.

How should the auditor respond?`,
    choices: [
      { key: "A", text: "Perform only analytical procedures at the financial statement level" },
      { key: "B", text: "Obtain an understanding of controls related to the risk and perform substantive procedures specifically responsive to it" },
      { key: "C", text: "Issue a qualified opinion based on the identified risk" },
      { key: "D", text: "Rely on management representations to address the significant risk" },
    ],
    correct: "B",
    explanation: `AU-C Section 315 -- Significant risks require special audit consideration.

Required responses:
1. Obtain an understanding of the entity's controls related to the significant risk
2. Design substantive procedures specifically responsive to the risk -- analytical procedures alone are insufficient
3. Consider testing operating effectiveness of relevant controls

Management representations alone are never sufficient for significant risks.`,
    whyWrong: [
      { key: "A", reason: "Analytical procedures alone are insufficient for significant risks. Specifically designed substantive procedures are required." },
      { key: "C", reason: "Identifying a significant risk shapes the audit approach -- it does not result in a modified opinion." },
      { key: "D", reason: "Management representations are not sufficient evidence, especially for significant risks involving judgment." },
    ],
  },

  {
    id: "aud-3",
    topic: "Audit Risk — Inherent Risk Factors",
    difficulty: "Moderate",
    stem: `Which of the following factors would INCREASE inherent risk for an assertion?`,
    choices: [
      { key: "A", text: "Routine, non-complex transactions processed automatically" },
      { key: "B", text: "A stable economic environment with little industry change" },
      { key: "C", text: "Management estimates based on highly subjective assumptions" },
      { key: "D", text: "Strong oversight by an engaged, independent audit committee" },
    ],
    correct: "C",
    explanation: `Inherent risk reflects susceptibility of an assertion to misstatement before considering controls.

Factors that INCREASE inherent risk:
- Highly subjective management assumptions (valuations, useful lives, contingencies)
- Complexity of transactions
- Unusual or non-routine transactions
- Rapid change in industry or technology
- Prior history of misstatements

Highly subjective estimates are a classic inherent risk driver.`,
    whyWrong: [
      { key: "A", reason: "Routine, automatically processed transactions have LOWER inherent risk -- they are straightforward and less error-prone." },
      { key: "B", reason: "A stable environment reduces inherent risk. Volatility and change are risk-increasing factors." },
      { key: "D", reason: "An engaged audit committee is a control environment strength that may REDUCE risk -- not an inherent risk driver." },
    ],
  },

  {
    id: "aud-4",
    topic: "Audit Risk — Fraud Risk",
    difficulty: "Hard",
    stem: `Which of the following is a REQUIRED procedure related to fraud risk in every audit under AU-C Section 240?`,
    choices: [
      { key: "A", text: "Perform forensic accounting procedures on all high-risk accounts" },
      { key: "B", text: "Hold an engagement team discussion about how and where the financial statements could be materially misstated due to fraud" },
      { key: "C", text: "Obtain a fraud investigation report from law enforcement" },
      { key: "D", text: "Assume fraud risk is low if management has a strong ethics policy" },
    ],
    correct: "B",
    explanation: `AU-C Section 240 -- Required fraud risk procedures in every audit:

1. Engagement team brainstorming discussion -- how and where could fraud occur?
2. Inquire of management about known or suspected fraud and controls to address it
3. Presume fraud risk exists in revenue recognition (rebuttable presumption)
4. Consider unusual relationships from analytical procedures
5. Examine journal entries for management override risk

The brainstorming session is specifically required -- not optional.`,
    whyWrong: [
      { key: "A", reason: "Forensic procedures are not routinely required in every audit -- they are tailored based on assessed fraud risks." },
      { key: "C", reason: "Auditors do not obtain law enforcement reports as standard procedure." },
      { key: "D", reason: "Standards warn against assuming low fraud risk based on management character. Professional skepticism is always required." },
    ],
  },

  {
    id: "aud-5",
    topic: "Audit Risk — Materiality",
    difficulty: "Moderate",
    stem: `An auditor sets overall materiality at $500,000. During the audit, a $420,000 misstatement is discovered that management refuses to correct. What should the auditor do?`,
    choices: [
      { key: "A", text: "Accept it -- $420,000 is below overall materiality" },
      { key: "B", text: "Aggregate it with all other uncorrected misstatements and evaluate the combined effect" },
      { key: "C", text: "Automatically issue an adverse opinion" },
      { key: "D", text: "Lower materiality to $400,000 to force correction" },
    ],
    correct: "B",
    explanation: `AU-C Section 450 -- Evaluating misstatements:

Individual misstatements below overall materiality are NOT automatically acceptable. The auditor must:
1. Accumulate all identified misstatements in a Summary of Uncorrected Misstatements
2. Evaluate whether the AGGREGATE of uncorrected misstatements is material
3. Consider both quantitative and qualitative factors

A single $420,000 item is close to the $500,000 threshold. Combined with other misstatements, the aggregate could exceed materiality.`,
    whyWrong: [
      { key: "A", reason: "Below-materiality items cannot be accepted without aggregating all uncorrected misstatements -- the combined total might be material." },
      { key: "C", reason: "One below-materiality misstatement does not automatically trigger an adverse opinion -- aggregation analysis is required first." },
      { key: "D", reason: "Auditors do not revise materiality downward to force corrections -- it is set based on what matters to financial statement users." },
    ],
  },

  {
    id: "aud-6",
    topic: "Audit Risk — Risk of Material Misstatement",
    difficulty: "Hard",
    stem: `The auditor assesses inherent risk as HIGH and control risk as LOW (controls are effective) for inventory.

Which combination of audit procedures is most appropriate?`,
    choices: [
      { key: "A", text: "Extensive substantive procedures with no reliance on controls" },
      { key: "B", text: "Tests of controls to confirm effectiveness; reduced but focused substantive procedures" },
      { key: "C", text: "Only analytical procedures -- effective controls reduce required evidence sufficiently" },
      { key: "D", text: "No audit work needed -- low control risk offsets high inherent risk" },
    ],
    correct: "B",
    explanation: `RMM = IR x CR. High IR x Low CR = Moderate RMM.

When control risk is LOW and the auditor plans to rely on controls:
1. Must TEST operating effectiveness of those controls
2. If controls test effective, can REDUCE (but not eliminate) substantive procedures
3. Substantive work focuses on the higher-inherent-risk areas

The auditor can never skip substantive procedures entirely -- some are always required.`,
    whyWrong: [
      { key: "A", reason: "If controls are effective, the auditor should test and rely on them -- ignoring effective controls wastes efficiency." },
      { key: "C", reason: "Analytical procedures alone are insufficient when inherent risk is high -- more persuasive evidence is needed." },
      { key: "D", reason: "Some substantive procedures are always required regardless of assessed control risk." },
    ],
  },

  // ── EVIDENCE & PROCEDURES (aud-7 to aud-13) ───────────────────────────────

  {
    id: "aud-7",
    topic: "Evidence — Reliability Hierarchy",
    difficulty: "Moderate",
    stem: `Rank the following from MOST to LEAST reliable:

I. Auditor's direct observation of physical inventory
II. Confirmations received directly from the client's bank
III. Copies of vendor invoices obtained from the client
IV. Management representations letter`,
    choices: [
      { key: "A", text: "I, II, III, IV" },
      { key: "B", text: "II, I, III, IV" },
      { key: "C", text: "I, II, IV, III" },
      { key: "D", text: "II, III, I, IV" },
    ],
    correct: "A",
    explanation: `Evidence reliability principles (AU-C Section 500):
- Evidence obtained directly by the auditor is most reliable
- External evidence is more reliable than internal
- Originals are more reliable than copies

I. Auditor observation -- MOST reliable (direct, firsthand)
II. Bank confirmations -- very reliable (external, direct to auditor)
III. Client vendor invoices -- less reliable (internal, client-provided copies)
IV. Management representations -- LEAST reliable (internal, unverifiable)`,
    whyWrong: [
      { key: "B", reason: "Direct auditor observation is the gold standard -- it outranks even external confirmations because the auditor is doing it themselves." },
      { key: "C", reason: "Management representations are the least reliable, not vendor invoice copies." },
      { key: "D", reason: "Client-provided invoices are more reliable than management representations but rank below auditor observation and external confirmations." },
    ],
  },

  {
    id: "aud-8",
    topic: "Evidence — Confirmations",
    difficulty: "Moderate",
    stem: `An auditor sends positive confirmation requests to 50 customers. By the deadline, 12 respond; 38 do not.

What is the most appropriate next step?`,
    choices: [
      { key: "A", text: "Conclude balances are fairly stated -- non-response implies agreement" },
      { key: "B", text: "Apply alternative procedures such as examining subsequent cash receipts and shipping documents" },
      { key: "C", text: "Issue a qualified opinion due to the high non-response rate" },
      { key: "D", text: "Send a second confirmation and accept whatever response rate results" },
    ],
    correct: "B",
    explanation: `AU-C Section 505: For POSITIVE confirmations, non-response provides NO audit evidence -- silence is not agreement.

When positive confirmations are not returned, apply ALTERNATIVE PROCEDURES:
- Examine subsequent cash receipts (proof of collection)
- Inspect sales invoices and shipping documents (proof of transaction)

If alternatives cannot be performed and non-responses are material, consider the opinion impact.`,
    whyWrong: [
      { key: "A", reason: "Silence on a positive confirmation is NOT evidence. Unlike negative confirmations, positive ones require an explicit response." },
      { key: "C", reason: "A high non-response rate alone does not trigger a qualified opinion -- alternative procedures must be attempted first." },
      { key: "D", reason: "Sending a second request is good practice, but remaining non-responses still require alternative procedures." },
    ],
  },

  {
    id: "aud-9",
    topic: "Evidence — Analytical Procedures",
    difficulty: "Moderate",
    stem: `What is the PRIMARY purpose of analytical procedures performed during the PLANNING phase of an audit?`,
    choices: [
      { key: "A", text: "To provide substantive evidence about account balances" },
      { key: "B", text: "To identify areas of potential risk requiring more audit attention" },
      { key: "C", text: "To eliminate the need for detailed tests of transactions" },
      { key: "D", text: "To satisfy the substantive testing requirement for revenue" },
    ],
    correct: "B",
    explanation: `Analytical procedures serve different purposes by phase:

PLANNING: Enhance understanding of the entity and identify RISK areas requiring more attention. These are risk assessment procedures -- they help allocate audit resources, not gather evidence.

SUBSTANTIVE phase: Gather evidence about account balances (can replace or supplement detailed tests).

COMPLETION: Overall review to assess whether statements are consistent with understanding.`,
    whyWrong: [
      { key: "A", reason: "Substantive evidence is the goal of fieldwork-phase analytical procedures, not planning." },
      { key: "C", reason: "Planning APs do not reduce testing requirements -- they inform the audit plan." },
      { key: "D", reason: "Revenue substantive testing is not satisfied by planning-phase analytical procedures." },
    ],
  },

  {
    id: "aud-10",
    topic: "Evidence — Subsequent Events",
    difficulty: "Hard",
    stem: `During the subsequent events review period, an auditor learns a major customer declared bankruptcy, making a $2 million receivable uncollectible. The customer's financial difficulties began BEFORE year-end.

How should this be treated?`,
    choices: [
      { key: "A", text: "Type I subsequent event -- adjust the financial statements" },
      { key: "B", text: "Type II subsequent event -- disclose in a note but do not adjust" },
      { key: "C", text: "No action -- bankruptcy occurred after year-end" },
      { key: "D", text: "Disclaim an opinion due to uncertainty" },
    ],
    correct: "A",
    explanation: `Subsequent events (AU-C Section 560):

TYPE I (Recognized -- ADJUST): Conditions that EXISTED at year-end, confirmed afterward.
The customer's financial difficulties existed before year-end. The bankruptcy merely confirms the uncollectibility condition. Adjust A/R and record bad debt expense.

TYPE II (Non-recognized -- DISCLOSE ONLY): New conditions that arose AFTER year-end.

Key test: Did the condition EXIST at year-end? Yes -- adjust.`,
    whyWrong: [
      { key: "B", reason: "Type II events arise AFTER year-end. Since problems existed before year-end, this is Type I -- adjustment required." },
      { key: "C", reason: "The bankruptcy confirms a pre-existing condition. Auditors must act on Type I events regardless of when the confirming event occurs." },
      { key: "D", reason: "A disclaimer is not appropriate -- the auditor has sufficient evidence of uncollectibility and the required treatment is clear." },
    ],
  },

  {
    id: "aud-11",
    topic: "Evidence — Audit of Estimates",
    difficulty: "Hard",
    stem: `Management records a $3 million allowance for doubtful accounts. Which approach BEST addresses the auditor's responsibility for this estimate?`,
    choices: [
      { key: "A", text: "Accept it if consistent with prior years" },
      { key: "B", text: "Test management's assumptions, data, and methodology -- or develop an independent estimate to compare" },
      { key: "C", text: "Rely on management's representation that it is reasonable" },
      { key: "D", text: "Require management to use the auditor's model" },
    ],
    correct: "B",
    explanation: `AU-C Section 540 -- Auditing Accounting Estimates:

The auditor must obtain sufficient appropriate evidence using one or more approaches:
1. Test how management made the estimate (assumptions, data, process, model)
2. Develop an independent auditor's estimate and compare
3. Review subsequent events that confirm or contradict the estimate

Consistency with prior years is not sufficient -- conditions change. Management representations alone are never sufficient for estimates.`,
    whyWrong: [
      { key: "A", reason: "Consistency with prior years alone is not evidence of reasonableness -- the auditor must evaluate the current estimate on its own merits." },
      { key: "C", reason: "Management representations are the least reliable evidence -- estimates require corroboration through testing." },
      { key: "D", reason: "Management is responsible for estimates. The auditor evaluates -- not replaces -- management's work." },
    ],
  },

  {
    id: "aud-12",
    topic: "Evidence — Inventory Procedures",
    difficulty: "Moderate",
    stem: `Which combination of procedures provides the BEST evidence for both the existence AND completeness assertions for year-end inventory?`,
    choices: [
      { key: "A", text: "Review the client's inventory count instructions only" },
      { key: "B", text: "Observe the physical count, perform test counts, and trace counts to the final inventory listing (and vice versa)" },
      { key: "C", text: "Send confirmations to the warehouse manager" },
      { key: "D", text: "Perform analytical procedures comparing inventory turnover to prior years" },
    ],
    correct: "B",
    explanation: `AU-C Section 501 requires attending the physical count, including:
1. Observing count procedures
2. Performing independent test counts
3. Tracing test counts TO the final listing (existence -- counted items are in the records)
4. Tracing items ON the listing BACK to the physical count (completeness -- listed items actually exist)

This two-directional testing covers both assertions.`,
    whyWrong: [
      { key: "A", reason: "Reviewing count instructions provides evidence only about the design of the count process, not that inventory actually exists." },
      { key: "C", reason: "Confirmations go to independent third parties -- not the client's own warehouse manager, who is not independent." },
      { key: "D", reason: "Analytical procedures are indirect evidence insufficient alone for existence and completeness." },
    ],
  },

  {
    id: "aud-13",
    topic: "Evidence — Going Concern",
    difficulty: "Hard",
    stem: `The auditor identifies substantial doubt about the client's going concern. Management prepares a plan to address the doubt that the auditor evaluates as adequately mitigating it.

What is the correct reporting outcome?`,
    choices: [
      { key: "A", text: "Disclaimer of opinion -- going concern doubt always requires a disclaimer" },
      { key: "B", text: "Unmodified opinion with an explanatory paragraph about the going concern uncertainty" },
      { key: "C", text: "If doubt is alleviated by management's plans, no disclosure is required" },
      { key: "D", text: "The auditor prepares the going concern plan on management's behalf" },
    ],
    correct: "B",
    explanation: `AU-C Section 570 -- Going Concern:

If management's plans ADEQUATELY ALLEVIATE the substantial doubt:
- Unmodified opinion (statements are fairly presented)
- PLUS an explanatory paragraph alerting readers to the going concern uncertainty

Even when doubt is resolved by plans, an explanatory paragraph is still required.

If substantial doubt REMAINS after plans: modify the report.
If management refuses adequate disclosure: adverse opinion.`,
    whyWrong: [
      { key: "A", reason: "Disclaimers apply to scope limitations, not going concern. Going concern requires explanatory paragraphs or modified opinions." },
      { key: "C", reason: "Even when management's plans alleviate doubt, an explanatory paragraph is still required." },
      { key: "D", reason: "Management is responsible for going concern assessment. The auditor evaluates -- not prepares -- those plans." },
    ],
  },

  // ── INTERNAL CONTROLS (aud-14 to aud-19) ──────────────────────────────────

  {
    id: "aud-14",
    topic: "Internal Controls — Segregation of Duties",
    difficulty: "Moderate",
    stem: `A company's accounts payable clerk can add new vendors, approve invoices for payment, and initiate wire transfers.

Which internal control weakness does this best describe?`,
    choices: [
      { key: "A", text: "Lack of physical safeguards over assets" },
      { key: "B", text: "Inadequate authorization procedures" },
      { key: "C", text: "Insufficient segregation of duties" },
      { key: "D", text: "Failure to perform independent reconciliations" },
    ],
    correct: "C",
    explanation: `The clerk controls three incompatible functions:
1. Setup (adding vendors)
2. Authorization (approving invoices)
3. Execution (initiating wire transfers)

One person controlling all three enables fraud: create fictitious vendor, approve fake invoice, wire funds. Proper SOD separates authorization, recording, and custody across different individuals.`,
    whyWrong: [
      { key: "A", reason: "Physical safeguards protect tangible assets (locks, safes). This is a process and access control issue." },
      { key: "B", reason: "Inadequate authorization is a symptom. The root issue is one person having too many incompatible functions." },
      { key: "D", reason: "Reconciliations are a detective compensating control. The primary weakness is the lack of preventive segregation." },
    ],
  },

  {
    id: "aud-15",
    topic: "Internal Controls — COSO Framework",
    difficulty: "Moderate",
    stem: `Under the COSO Internal Control -- Integrated Framework, which of the following is NOT one of the five components?`,
    choices: [
      { key: "A", text: "Control Environment" },
      { key: "B", text: "Risk Assessment" },
      { key: "C", text: "Audit Committee Oversight" },
      { key: "D", text: "Monitoring Activities" },
    ],
    correct: "C",
    explanation: `The five COSO components:
1. Control Environment
2. Risk Assessment
3. Control Activities
4. Information and Communication
5. Monitoring Activities

Audit Committee Oversight is NOT a standalone COSO component. It is an important governance mechanism that falls within the Control Environment, not its own separate component.`,
    whyWrong: [
      { key: "A", reason: "Control Environment IS a COSO component -- it sets the tone and foundation for all other controls." },
      { key: "B", reason: "Risk Assessment IS a COSO component -- identifying and analyzing risks to objectives." },
      { key: "D", reason: "Monitoring Activities IS a COSO component -- ongoing and periodic evaluations of control effectiveness." },
    ],
  },

  {
    id: "aud-16",
    topic: "Internal Controls — Deficiency Classification",
    difficulty: "Hard",
    stem: `The auditor finds that the CFO can both approve journal entries and post them to the general ledger with no secondary review. No material misstatements are found as a result.

How should this deficiency be classified?`,
    choices: [
      { key: "A", text: "Minor control deficiency -- no material impact detected" },
      { key: "B", text: "Significant deficiency at minimum; likely a material weakness" },
      { key: "C", text: "Material weakness automatically -- any SOD issue is a material weakness" },
      { key: "D", text: "Not reportable -- no actual misstatement occurred" },
    ],
    correct: "B",
    explanation: `Classification is based on POTENTIAL for misstatement, not whether one occurred.

A CFO who both approves and posts journal entries without review is a significant SOD breakdown. Given the CFO's seniority and ability to override controls, there is a reasonable possibility of material misstatement going undetected -- making this at minimum a significant deficiency, and very likely a material weakness.

Absence of a detected misstatement does not change the classification.`,
    whyWrong: [
      { key: "A", reason: "Classification is based on potential risk, not actual detected misstatements." },
      { key: "C", reason: "Not every SOD issue is automatically a material weakness -- severity depends on nature, who is involved, and potential impact." },
      { key: "D", reason: "Significant deficiencies and material weaknesses are reported based on potential risk, not just actual misstatements." },
    ],
  },

  {
    id: "aud-17",
    topic: "Internal Controls — Tests of Controls",
    difficulty: "Moderate",
    stem: `An auditor plans to rely on controls over cash disbursements to reduce substantive testing. Which procedure type tests whether those controls operated effectively throughout the year?`,
    choices: [
      { key: "A", text: "Substantive analytical procedures" },
      { key: "B", text: "Tests of controls" },
      { key: "C", text: "Substantive tests of details" },
      { key: "D", text: "Risk assessment procedures" },
    ],
    correct: "B",
    explanation: `Tests of controls (compliance tests) evaluate whether controls OPERATED EFFECTIVELY throughout the period.

If controls are designed well AND operated effectively, the auditor can reduce substantive procedures.

Tests of controls include:
- Inspection of documents for control performance evidence (signatures, approvals)
- Reperformance of control procedures
- Observation of controls being applied

These differ from substantive procedures, which test account balance fairness.`,
    whyWrong: [
      { key: "A", reason: "Substantive analytical procedures compare data to expectations -- they test balances, not control effectiveness." },
      { key: "C", reason: "Substantive tests of details (vouching, tracing) test balances and transactions -- not controls." },
      { key: "D", reason: "Risk assessment procedures are performed during planning to understand the entity and identify risks -- not to test operating effectiveness." },
    ],
  },

  {
    id: "aud-18",
    topic: "Internal Controls — Management Override",
    difficulty: "Hard",
    stem: `Which of the following is a REQUIRED procedure in every audit to address management override of internal controls?`,
    choices: [
      { key: "A", text: "Interview all finance employees about unusual management instructions" },
      { key: "B", text: "Examine journal entries and other adjustments for evidence of manipulation" },
      { key: "C", text: "Review all transactions above a dollar threshold for reasonableness" },
      { key: "D", text: "Perform a full forensic investigation of the general ledger" },
    ],
    correct: "B",
    explanation: `AU-C Section 240 -- Required anti-override procedures in EVERY audit:

1. Examine journal entries and other adjustments -- looking for unusual entries near period-end, entries by unusual individuals, or vague descriptions
2. Review accounting estimates for management bias
3. Evaluate business rationale for unusual significant transactions

Journal entry testing is explicitly required because management override often occurs through entries that bypass normal transaction controls.`,
    whyWrong: [
      { key: "A", reason: "Interviewing all finance employees is not specifically required by AU-C 240 for every audit." },
      { key: "C", reason: "Dollar threshold reviews are not a specifically required anti-override procedure." },
      { key: "D", reason: "Full forensic investigations are not required in every audit -- only when fraud is specifically suspected." },
    ],
  },

  {
    id: "aud-19",
    topic: "Internal Controls — Walkthroughs",
    difficulty: "Moderate",
    stem: `An auditor performs a walkthrough of the revenue cycle. What is the PRIMARY purpose?`,
    choices: [
      { key: "A", text: "To test the operating effectiveness of controls throughout the period" },
      { key: "B", text: "To confirm that the auditor's understanding of the process and controls is accurate" },
      { key: "C", text: "To satisfy substantive testing requirements for revenue" },
      { key: "D", text: "To test the completeness assertion for sales transactions" },
    ],
    correct: "B",
    explanation: `A walkthrough traces a transaction from origination through recording to confirm the auditor's understanding of:
1. How transactions flow through the system
2. Where controls are supposed to operate
3. Whether controls are designed appropriately
4. Whether the process description matches reality

Walkthroughs are for UNDERSTANDING and DESIGN EVALUATION -- not for testing operating effectiveness (which requires tests of controls over the full period).`,
    whyWrong: [
      { key: "A", reason: "Testing operating effectiveness requires tests of controls over the period -- walkthroughs cover only 1-2 transactions and confirm design, not effectiveness." },
      { key: "C", reason: "Walkthroughs are risk assessment/control understanding procedures -- they do not satisfy substantive testing requirements." },
      { key: "D", reason: "Completeness testing (tracing from shipping docs to sales records) is a substantive procedure, not the purpose of a walkthrough." },
    ],
  },

  // ── SAMPLING (aud-20 to aud-24) ───────────────────────────────────────────

  {
    id: "aud-20",
    topic: "Sampling — Attribute Sampling",
    difficulty: "Hard",
    stem: `An auditor uses attribute sampling with a tolerable deviation rate of 5% and expected deviation rate of 1%. After testing 100 items, 4 deviations are found.

What is the most appropriate conclusion?`,
    choices: [
      { key: "A", text: "Control is effective -- 4% sample rate is below the 5% tolerable rate" },
      { key: "B", text: "Assess control risk as lower -- deviations are minimal" },
      { key: "C", text: "The sample deviation rate significantly exceeds the expected rate; evaluate the upper deviation limit and consider increasing control risk" },
      { key: "D", text: "Disregard results and rely on the prior year control assessment" },
    ],
    correct: "C",
    explanation: `The 4% sample rate is below 5% TDR -- but the sample was designed assuming only 1% deviations. Finding 4% means controls operated far worse than expected.

The auditor must compute the UPPER DEVIATION LIMIT (UDL) -- the maximum population rate at the desired confidence level. With 4 deviations in 100 items, the UDL typically exceeds 5%, meaning controls cannot be accepted at the tolerable level.

Result: Increase control risk assessment and expand substantive procedures.`,
    whyWrong: [
      { key: "A", reason: "Comparing sample rate to TDR ignores statistical precision. The UDL -- not just the sample rate -- must be below TDR for controls to be accepted." },
      { key: "B", reason: "More deviations than expected means controls are LESS effective. Control risk should increase, not decrease." },
      { key: "D", reason: "Current-year evidence must be evaluated. Prior year assessments do not carry forward automatically." },
    ],
  },

  {
    id: "aud-21",
    topic: "Sampling — Monetary Unit Sampling",
    difficulty: "Hard",
    stem: `An auditor uses monetary unit sampling (MUS) to test accounts receivable of $2,000,000. After testing, no misstatements are found.

Which statement best describes the conclusion?`,
    choices: [
      { key: "A", text: "The entire $2,000,000 is confirmed as correct" },
      { key: "B", text: "At the specified confidence level, the true overstatement does not exceed the tolerable misstatement" },
      { key: "C", text: "No misstatements means no further testing is required" },
      { key: "D", text: "MUS only works when misstatements are expected -- zero errors invalidate the method" },
    ],
    correct: "B",
    explanation: `Monetary Unit Sampling (MUS):

When no misstatements are found, the auditor can conclude -- at the stated confidence level -- that the projected population overstatement does not exceed the tolerable misstatement (precision boundary).

MUS is especially effective at detecting overstatements. Zero errors found = strong evidence the population is not materially overstated within the precision boundary.

The conclusion is probabilistic at the chosen confidence level (e.g., 95%) -- not absolute certainty.`,
    whyWrong: [
      { key: "A", reason: "MUS provides statistical assurance within a confidence level, not absolute proof that every dollar is correct." },
      { key: "C", reason: "Finding no misstatements is favorable, but the auditor evaluates results against the precision boundary before concluding." },
      { key: "D", reason: "MUS is most useful when few or no misstatements are expected -- zero misstatements is the optimal MUS outcome." },
    ],
  },

  {
    id: "aud-22",
    topic: "Sampling — Sample Size Relationships",
    difficulty: "Moderate",
    stem: `Which of the following changes would INCREASE the required sample size for a substantive test of details?`,
    choices: [
      { key: "A", text: "Decreasing the acceptable risk of incorrect acceptance" },
      { key: "B", text: "Increasing the tolerable misstatement" },
      { key: "C", text: "Decreasing the expected amount of misstatement" },
      { key: "D", text: "Increasing the acceptable risk of incorrect acceptance" },
    ],
    correct: "A",
    explanation: `Sample size relationships for substantive tests:

INCREASES sample size:
- Lower acceptable risk of incorrect acceptance (more confidence needed)
- Lower tolerable misstatement (smaller errors must be caught)
- Higher expected misstatement (more errors anticipated)

DECREASES sample size:
- Higher tolerable misstatement
- Lower expected misstatement
- Higher acceptable risk of incorrect acceptance

Decreasing acceptable risk of incorrect acceptance requires more evidence -- larger sample.`,
    whyWrong: [
      { key: "B", reason: "Increasing tolerable misstatement DECREASES sample size -- larger tolerable errors mean less precision needed." },
      { key: "C", reason: "Decreasing expected misstatement DECREASES sample size -- fewer errors expected means less evidence needed." },
      { key: "D", reason: "Increasing acceptable risk of incorrect acceptance DECREASES sample size -- willing to accept more risk means less evidence needed." },
    ],
  },

  {
    id: "aud-23",
    topic: "Sampling — Statistical vs. Non-Statistical",
    difficulty: "Moderate",
    stem: `Which of the following BEST distinguishes statistical sampling from non-statistical sampling?`,
    choices: [
      { key: "A", text: "Statistical sampling always produces larger sample sizes" },
      { key: "B", text: "Statistical sampling uses random selection and probability theory to quantify sampling risk" },
      { key: "C", text: "Non-statistical sampling is not acceptable under auditing standards" },
      { key: "D", text: "Statistical sampling eliminates sampling risk" },
    ],
    correct: "B",
    explanation: `The key distinction:

STATISTICAL sampling:
- Uses random (probability-based) selection
- Allows the auditor to QUANTIFY sampling risk mathematically
- Results projected to population with measurable confidence

NON-STATISTICAL sampling:
- Uses auditor judgment to select items
- Sampling risk exists but CANNOT be mathematically quantified
- Results still projected to population, without statistical measurement

Both are acceptable under auditing standards.`,
    whyWrong: [
      { key: "A", reason: "Statistical sampling does not always produce larger samples. Size depends on risk, tolerable misstatement, and expected errors -- not method type." },
      { key: "C", reason: "Non-statistical sampling IS acceptable under AU-C Section 530. Both approaches are permitted." },
      { key: "D", reason: "No sampling method eliminates sampling risk. Statistical sampling quantifies it; non-statistical has it too but cannot measure it." },
    ],
  },

  {
    id: "aud-24",
    topic: "Sampling — Selection Methods",
    difficulty: "Moderate",
    stem: `An auditor selects items 'without any conscious bias or predictability' but without using random number generation. This is best described as:`,
    choices: [
      { key: "A", text: "Simple random sampling" },
      { key: "B", text: "Systematic sampling" },
      { key: "C", text: "Haphazard selection" },
      { key: "D", text: "Stratified sampling" },
    ],
    correct: "C",
    explanation: `Selection methods:

HAPHAZARD: Items selected without conscious bias, but without a formal random process. Used with non-statistical sampling. NOT the same as random.

RANDOM (probability): Uses random number tables/generators -- every item has a known, non-zero probability. Required for statistical sampling.

SYSTEMATIC: Select every nth item from a list starting at a random point.

STRATIFIED: Population divided into subgroups, then sampled within each stratum.

Haphazard lacks the formal probability mechanism required for true random selection.`,
    whyWrong: [
      { key: "A", reason: "Simple random sampling requires every item to have an equal probability of selection via random number generation -- not informal picking." },
      { key: "B", reason: "Systematic sampling selects every nth item -- it has structure that haphazard selection lacks." },
      { key: "D", reason: "Stratified sampling divides the population into subgroups before sampling -- completely different from haphazard selection." },
    ],
  },

  // ── AUDIT REPORTS (aud-25) ─────────────────────────────────────────────────

  {
    id: "aud-25",
    topic: "Audit Reports — Qualified Opinion",
    difficulty: "Hard",
    stem: `The auditor discovers management did not disclose a material related-party transaction. Management refuses to add the disclosure. The statements are otherwise fairly presented.

What audit opinion is appropriate?`,
    choices: [
      { key: "A", text: "Unmodified with an emphasis-of-matter paragraph" },
      { key: "B", text: "Qualified opinion" },
      { key: "C", text: "Adverse opinion" },
      { key: "D", text: "Disclaimer of opinion" },
    ],
    correct: "B",
    explanation: `Modified opinion decision framework:

Nature: Material misstatement (required disclosure omitted)
Pervasiveness: NOT pervasive -- statements otherwise fairly presented

Material but NOT pervasive: QUALIFIED opinion ('except for' the specific omission)
Material AND pervasive: ADVERSE
Scope limitation, material: QUALIFIED
Scope limitation, pervasive: DISCLAIMER

The missing disclosure is material but isolated -- qualified opinion.`,
    whyWrong: [
      { key: "A", reason: "Unmodified means no material misstatements. A missing required disclosure IS a material misstatement." },
      { key: "C", reason: "Adverse opinions require pervasive misstatements. One missing disclosure is not pervasive." },
      { key: "D", reason: "Disclaimers address scope limitations (inability to get evidence), not disclosure omissions." },
    ],
  },

  // ── AUDIT REPORTS cont. (aud-26 to aud-30) ───────────────────────────────

  {
    id: "aud-26",
    topic: "Audit Reports — Emphasis-of-Matter Paragraphs",
    difficulty: "Moderate",
    stem: `An auditor issues an unmodified opinion. The auditor wants to draw attention to a note about significant pending litigation that, while properly disclosed, could materially affect the company.

What paragraph type should the auditor add?`,
    choices: [
      { key: "A", text: "Other-matter paragraph" },
      { key: "B", text: "Explanatory paragraph replacing the opinion paragraph" },
      { key: "C", text: "Emphasis-of-matter paragraph" },
      { key: "D", text: "A separate adverse opinion paragraph" },
    ],
    correct: "C",
    explanation: `AU-C Section 706:

EMPHASIS-OF-MATTER paragraph: Draws attention to a matter ALREADY PRESENTED in the financial statements that the auditor believes is fundamental to users' understanding. Does NOT modify the opinion.

Uses: Going concern uncertainty, significant litigation (properly disclosed), new accounting standards, major subsequent events.

OTHER-MATTER paragraph: Draws attention to matters NOT in the financial statements (e.g., supplementary information, prior period comparative statements).`,
    whyWrong: [
      { key: "A", reason: "Other-matter paragraphs address items NOT presented in the financial statements. The litigation is already disclosed -- emphasis-of-matter is appropriate." },
      { key: "B", reason: "The emphasis-of-matter paragraph supplements the opinion paragraph -- it does not replace it." },
      { key: "D", reason: "An adverse opinion is not appropriate -- the statements are fairly presented with proper disclosure." },
    ],
  },

  {
    id: "aud-27",
    topic: "Audit Reports — Component Auditors",
    difficulty: "Hard",
    stem: `A group auditor uses a component auditor for a subsidiary and decides to TAKE RESPONSIBILITY for the component auditor's work. How does this affect the group auditor's report?`,
    choices: [
      { key: "A", text: "The report names the component auditor and the portion they audited" },
      { key: "B", text: "The report makes no reference to the component auditor" },
      { key: "C", text: "The report includes a scope limitation paragraph" },
      { key: "D", text: "The group auditor must issue a separate opinion on the subsidiary" },
    ],
    correct: "B",
    explanation: `When the group auditor TAKES RESPONSIBILITY for the component auditor's work:
- Performs oversight procedures on the component work
- Issues a standard report with NO reference to the component auditor
- The report reads as if the group auditor audited everything

When NOT taking responsibility (division of responsibility):
- The report references the component auditor and the portion they audited
- This is not a scope limitation -- it is a division of responsibility

Taking responsibility = silence in the report.`,
    whyWrong: [
      { key: "A", reason: "Naming the component auditor applies when the group auditor does NOT take responsibility. Taking responsibility means no reference." },
      { key: "C", reason: "No scope limitation paragraph is added when the group auditor takes responsibility -- the report is standard." },
      { key: "D", reason: "The group auditor issues one consolidated report -- not separate opinions on each component." },
    ],
  },

  {
    id: "aud-28",
    topic: "Audit Reports — Adverse vs. Disclaimer",
    difficulty: "Moderate",
    stem: `Which scenario results in a DISCLAIMER of opinion rather than an adverse opinion?`,
    choices: [
      { key: "A", text: "Financial statements contain a pervasive material misstatement management refuses to correct" },
      { key: "B", text: "The auditor cannot obtain sufficient appropriate evidence about a pervasive portion of the financial statements" },
      { key: "C", text: "Financial statements omit a required disclosure that is material but not pervasive" },
      { key: "D", text: "The auditor disagrees with a management accounting policy that has a material and pervasive effect" },
    ],
    correct: "B",
    explanation: `Modified opinion matrix:

MATERIAL MISSTATEMENT:
- Material, not pervasive: Qualified
- Material AND pervasive: ADVERSE

SCOPE LIMITATION (cannot get sufficient evidence):
- Material, not pervasive: Qualified
- Material AND pervasive: DISCLAIMER

A disclaimer arises from INABILITY to obtain evidence -- the auditor cannot form an opinion. An adverse opinion is a positive statement that the statements ARE NOT fairly presented.`,
    whyWrong: [
      { key: "A", reason: "Pervasive material misstatement = ADVERSE -- the auditor knows enough to say the statements are wrong." },
      { key: "C", reason: "Material but not pervasive omission = QUALIFIED opinion." },
      { key: "D", reason: "Material and pervasive disagreement with accounting policy = ADVERSE -- the auditor knows the statements are misstated." },
    ],
  },

  {
    id: "aud-29",
    topic: "Audit Reports — Other Information",
    difficulty: "Moderate",
    stem: `The client includes an MD&A in its annual report alongside audited financial statements. The auditor finds a material inconsistency between the MD&A and the audited statements. Management refuses to correct it.

What should the auditor do?`,
    choices: [
      { key: "A", text: "Issue an adverse opinion on the financial statements" },
      { key: "B", text: "Withhold the audit report until the MD&A is corrected" },
      { key: "C", text: "Describe the inconsistency in the auditor's report or withdraw from the engagement" },
      { key: "D", text: "Ignore it -- auditors have no responsibility for MD&A" },
    ],
    correct: "C",
    explanation: `AU-C Section 720 -- Other Information:

Auditors read other information included with audited statements and respond to material inconsistencies.

If a material inconsistency exists and management refuses to correct:
- Describe the inconsistency in an Other-matter paragraph in the auditor's report, OR
- Withdraw from the engagement in extreme cases

The financial statement opinion is NOT automatically modified -- the statements themselves may still be fairly presented. The inconsistency is flagged in the report.`,
    whyWrong: [
      { key: "A", reason: "An adverse opinion addresses the financial statements. The statements may be fairly presented even if the MD&A is inconsistent." },
      { key: "B", reason: "Auditing standards do not give the auditor authority to 'withhold' the report. Describing the inconsistency in the report is the proper response." },
      { key: "D", reason: "Auditors DO have responsibility for other information -- they must read it and respond to material inconsistencies." },
    ],
  },

  {
    id: "aud-30",
    topic: "Audit Reports — Restated Comparative Statements",
    difficulty: "Hard",
    stem: `A continuing auditor discovers a material misstatement in the prior year comparative statements. Management corrects the prior year figures with a restatement.

What should the auditor do regarding the prior year opinion?`,
    choices: [
      { key: "A", text: "Reissue the original prior year opinion unchanged" },
      { key: "B", text: "Issue an updated report on the restated prior year statements, with an emphasis-of-matter paragraph describing the restatement" },
      { key: "C", text: "Disclaim an opinion on the prior year statements" },
      { key: "D", text: "Issue an adverse opinion on the current year statements" },
    ],
    correct: "B",
    explanation: `When prior year financial statements are restated:
1. Management corrects the prior year figures
2. The auditor issues a NEW (updated) report on the restated statements
3. The new report includes an emphasis-of-matter paragraph explaining: (a) the restatement was made, (b) its nature, and (c) that the previously issued report has been superseded

The original report cannot simply be reissued -- it related to the uncorrected statements.`,
    whyWrong: [
      { key: "A", reason: "The original report covered uncorrected statements. Since statements have been restated, a new report on the corrected amounts is required." },
      { key: "C", reason: "A disclaimer is not appropriate -- the auditor has audited the restated figures and can express an opinion on them." },
      { key: "D", reason: "A prior year restatement that has been corrected does not trigger an adverse current year opinion." },
    ],
  },

  // ── ETHICS & INDEPENDENCE (aud-31 to aud-35) ──────────────────────────────

  {
    id: "aud-31",
    topic: "Ethics — Independence: Direct Financial Interest",
    difficulty: "Moderate",
    stem: `An audit partner owns 100 shares of stock in an audit client. The holding is immaterial relative to the partner's net worth.

How does this affect independence under AICPA rules?`,
    choices: [
      { key: "A", text: "Independence is not impaired -- the holding is immaterial" },
      { key: "B", text: "Independence is impaired -- any direct financial interest in an attest client impairs independence regardless of materiality" },
      { key: "C", text: "Independence is impaired only if purchased during the engagement period" },
      { key: "D", text: "The partner discloses the holding but may continue on the engagement" },
    ],
    correct: "B",
    explanation: `AICPA Independence Rule (ET Section 1.240):

A DIRECT financial interest in an attest client impairs independence regardless of materiality for partners and professional employees on the engagement.

Key: Materiality is IRRELEVANT for direct financial interests. Even one share of stock impairs independence.

INDIRECT interests (e.g., mutual funds) may be evaluated for materiality.

The partner must divest the shares -- disclosure alone does not cure the impairment.`,
    whyWrong: [
      { key: "A", reason: "Materiality does NOT apply to direct financial interests. Any direct ownership -- even immaterial -- impairs independence." },
      { key: "C", reason: "The timing of purchase is irrelevant. A direct financial interest impairs independence whenever it exists during the period covered by the report." },
      { key: "D", reason: "Disclosure alone does not cure the independence impairment. The interest must be divested." },
    ],
  },

  {
    id: "aud-32",
    topic: "Ethics — Non-Attest Services",
    difficulty: "Moderate",
    stem: `A CPA firm provides bookkeeping services to an audit client, recording journal entries. Management reviews and approves all entries.

Does this impair independence?`,
    choices: [
      { key: "A", text: "No -- management approval preserves independence for all clients" },
      { key: "B", text: "Yes -- bookkeeping always impairs independence regardless of client type" },
      { key: "C", text: "It depends on whether the client is a public or nonpublic entity" },
      { key: "D", text: "No -- as long as fees are billed separately from the audit" },
    ],
    correct: "C",
    explanation: `The answer depends on entity type:

PUBLIC (SEC registrants): SOX/PCAOB prohibits bookkeeping and other non-audit services. Always impairs independence.

NONPUBLIC (private): AICPA allows non-attest services IF management:
- Makes all significant decisions (reviews and approves entries)
- Takes responsibility for the results
- Does not delegate authority to the CPA

Since management reviews and approves all entries, this could be acceptable for a nonpublic client but impairs independence for a public company.`,
    whyWrong: [
      { key: "A", reason: "For PUBLIC companies, no amount of management approval cures the independence impairment from bookkeeping services." },
      { key: "B", reason: "For NONPUBLIC clients, bookkeeping CAN be performed without impairing independence if management safeguards are in place." },
      { key: "D", reason: "Billing separately has no effect on independence analysis. The nature of the service -- not billing -- determines independence." },
    ],
  },

  {
    id: "aud-33",
    topic: "Ethics — Confidentiality",
    difficulty: "Moderate",
    stem: `A CPA learns during an audit that the client is engaged in illegal activity. A court subpoena is then issued requiring the CPA to disclose client information related to the illegal activity.

What should the CPA do?`,
    choices: [
      { key: "A", text: "Refuse -- client confidentiality is absolute" },
      { key: "B", text: "Comply with the subpoena -- a valid legal order overrides the confidentiality obligation" },
      { key: "C", text: "Seek client permission before complying" },
      { key: "D", text: "Notify the client and then refuse to comply" },
    ],
    correct: "B",
    explanation: `AICPA ET Section 1.700 -- Confidential Client Information:

General rule: CPAs must not disclose confidential client information without client consent.

EXCEPTIONS (disclosure IS permitted or required):
1. Court order / valid subpoena / legal process
2. Professional peer review
3. Ethics investigations by authorized bodies
4. Compliance with applicable standards

A valid court subpoena is a legal order -- the CPA must comply. Client confidentiality does not override lawful court orders.`,
    whyWrong: [
      { key: "A", reason: "Confidentiality is NOT absolute. Court subpoenas are a recognized exception -- the CPA must comply." },
      { key: "C", reason: "A court order does not require client consent. The CPA may notify the client as a courtesy, but compliance is mandatory." },
      { key: "D", reason: "Refusing to comply with a valid subpoena could expose the CPA to contempt of court." },
    ],
  },

  {
    id: "aud-34",
    topic: "Ethics — Contingent Fees",
    difficulty: "Moderate",
    stem: `A CPA charges a contingent fee for preparing a client's federal income tax return -- payable only if the IRS accepts it without adjustment.

Is this permissible under AICPA rules?`,
    choices: [
      { key: "A", text: "Yes -- contingent fees for tax preparation are always permitted" },
      { key: "B", text: "No -- contingent fees for preparing original tax returns are prohibited" },
      { key: "C", text: "Yes -- contingent fees are prohibited only for attest engagements" },
      { key: "D", text: "Yes -- if the fee arrangement is disclosed to the IRS" },
    ],
    correct: "B",
    explanation: `AICPA ET Section 1.510 -- Contingent Fees:

Contingent fees are PROHIBITED for:
1. Any attest engagement
2. Preparing an ORIGINAL tax return
3. Preparing an amended return filed to avoid penalties
4. Services where a third party uses results and the CPA must be independent

Contingent fees ARE permitted for:
- Tax claims and refund requests (IRS appeals)
- Representation before tax authorities
- Certain non-attest services

Preparing an original return is specifically prohibited.`,
    whyWrong: [
      { key: "A", reason: "Contingent fees for preparing ORIGINAL returns are specifically prohibited. Tax claim refunds are different -- those are permitted." },
      { key: "C", reason: "The prohibition extends beyond attest -- original tax return preparation is also specifically prohibited." },
      { key: "D", reason: "Disclosure to the IRS is irrelevant to AICPA ethics rules on contingent fees." },
    ],
  },

  {
    id: "aud-35",
    topic: "Ethics — Client Records",
    difficulty: "Moderate",
    stem: `A CPA retains a client's records after completing work because the client has not paid fees. The client demands return of all records.

What must the CPA do under AICPA rules?`,
    choices: [
      { key: "A", text: "Return all records immediately, regardless of unpaid fees" },
      { key: "B", text: "Retain all records indefinitely until fees are paid in full" },
      { key: "C", text: "Return client-provided records but may retain CPA work product pending fee payment, subject to state law" },
      { key: "D", text: "Destroy the records after 3 years" },
    ],
    correct: "C",
    explanation: `AICPA ET Section 1.400 -- Acts Discreditable (record retention):

CLIENT-PROVIDED records: Must be returned to the client on request, even if fees are unpaid. Withholding client-owned records is an act discreditable to the profession.

CPA-PREPARED work product (workpapers, tax analyses, firm records): The CPA may retain these -- they are the firm's property. Whether fee non-payment justifies retaining work product depends on state law.

Rule of thumb: Return what the client gave you; keep what you prepared.`,
    whyWrong: [
      { key: "A", reason: "Not all records must be returned regardless of fees -- CPA work product belongs to the firm and can be retained." },
      { key: "B", reason: "CLIENT-PROVIDED records cannot be withheld pending fee payment -- that is an act discreditable." },
      { key: "D", reason: "Destroying client records is never an appropriate response to unpaid fees." },
    ],
  },

  // ── IT AUDIT (aud-36 to aud-39) ───────────────────────────────────────────

  {
    id: "aud-36",
    topic: "IT Audit — General vs. Application Controls",
    difficulty: "Moderate",
    stem: `Which of the following is an IT GENERAL control (ITGC) rather than an IT application control?`,
    choices: [
      { key: "A", text: "An automated credit limit check that prevents saving a sales order" },
      { key: "B", text: "System-generated sequential invoice numbering" },
      { key: "C", text: "Access controls restricting who can modify the payroll application's source code" },
      { key: "D", text: "A programmatic three-way match comparing POs, receiving reports, and invoices" },
    ],
    correct: "C",
    explanation: `IT General Controls (ITGCs): Govern the overall IT environment supporting reliable operation of all applications.
Examples: Access management, change management (program change controls), operations, data backup

IT Application Controls: Embedded within specific applications, operating on individual transactions.
Examples: Input validation, edit checks, sequential numbering, three-way matching, credit limit checks

Restricting who can modify payroll source code = change management / access control = ITGC (it governs the environment, not a specific transaction).`,
    whyWrong: [
      { key: "A", reason: "Credit limit verification during order entry is an application control -- embedded within the sales application for specific transactions." },
      { key: "B", reason: "Sequential invoice numbering is an application control -- operates within the billing application." },
      { key: "D", reason: "Automated three-way matching is a classic application control embedded in accounts payable." },
    ],
  },

  {
    id: "aud-37",
    topic: "IT Audit — Change Management",
    difficulty: "Hard",
    stem: `An auditor is evaluating IT general controls over program changes. Which represents a KEY control the auditor would look for?`,
    choices: [
      { key: "A", text: "Developers have direct production access to quickly fix bugs" },
      { key: "B", text: "All program changes are tested in a separate environment and formally approved before migration to production" },
      { key: "C", text: "Users can self-implement small changes without IT approval" },
      { key: "D", text: "Changes are deployed to production first and tested afterward if time permits" },
    ],
    correct: "B",
    explanation: `Change management ITGC key elements:
1. Separate environments: Development / Test / Production (no developer access to production)
2. Formal testing: All changes tested in a dedicated test environment before deployment
3. Authorization: Management or change advisory board approves all changes
4. Migration controls: Only authorized changes moved to production by personnel independent of development
5. Documentation: Change requests, test results, and approvals documented

Developers with production access, self-service changes, and post-deployment testing all represent significant ITGC weaknesses.`,
    whyWrong: [
      { key: "A", reason: "Developer access to production is a major control weakness -- it enables unauthorized changes without review." },
      { key: "C", reason: "Self-implemented changes without approval bypass the authorization control." },
      { key: "D", reason: "Testing after production deployment defeats the purpose -- errors reach live data before being caught." },
    ],
  },

  {
    id: "aud-38",
    topic: "IT Audit — Data Analytics",
    difficulty: "Moderate",
    stem: `An auditor uses CAATs to identify all payments made to vendors NOT on the approved vendor master list. Which assertion is BEST tested?`,
    choices: [
      { key: "A", text: "Completeness" },
      { key: "B", text: "Valuation and allocation" },
      { key: "C", text: "Occurrence (existence)" },
      { key: "D", text: "Rights and obligations" },
    ],
    correct: "C",
    explanation: `Identifying payments to unapproved vendors tests whether those transactions ACTUALLY OCCURRED for legitimate business purposes.

Occurrence/existence for payables: Did the liability arise from a real, authorized transaction?

Payments to unapproved vendors may indicate:
- Fictitious vendor fraud
- Unauthorized disbursements
- Transactions that should not have occurred

This directly tests the occurrence assertion -- whether recorded transactions represent real, authorized events.`,
    whyWrong: [
      { key: "A", reason: "Completeness tests whether ALL transactions are recorded. Testing unapproved vendors checks whether recorded transactions are legitimate (occurrence)." },
      { key: "B", reason: "Valuation tests whether amounts are recorded at the correct dollar value -- not whether the transaction should have occurred." },
      { key: "D", reason: "Rights and obligations tests whether the company has legal obligation for liabilities -- not whether transactions were authorized." },
    ],
  },

  {
    id: "aud-39",
    topic: "IT Audit — SOC Reports",
    difficulty: "Hard",
    stem: `An audit client processes payroll through a third-party service organization. Which SOC report provides the auditor with information about the DESIGN AND OPERATING EFFECTIVENESS of controls over a full period?`,
    choices: [
      { key: "A", text: "SOC 1 Type I report" },
      { key: "B", text: "SOC 1 Type II report" },
      { key: "C", text: "SOC 2 Type I report" },
      { key: "D", text: "SOC 3 report" },
    ],
    correct: "B",
    explanation: `SOC report types:

SOC 1: Controls relevant to user entities' FINANCIAL REPORTING
- Type I: Design of controls at a POINT IN TIME only
- Type II: Design AND OPERATING EFFECTIVENESS over a PERIOD (6-12 months) -- most useful for auditors

SOC 2: Trust services criteria (security, availability, etc.) -- not specific to financial reporting
SOC 3: Public summary of SOC 2 -- no detail, not useful for auditors

For a payroll service organization's impact on financial reporting: SOC 1 Type II.`,
    whyWrong: [
      { key: "A", reason: "SOC 1 Type I covers design only at a point in time -- no evidence about operating effectiveness over a period." },
      { key: "C", reason: "SOC 2 covers trust services criteria (security, etc.) -- not controls relevant to financial statement processing." },
      { key: "D", reason: "SOC 3 is a public summary with no detail -- not usable audit evidence." },
    ],
  },

  // ── GOVERNMENT AUDITING STANDARDS (aud-40 to aud-43) ─────────────────────

  {
    id: "aud-40",
    topic: "Government Auditing — Yellow Book Additional Reports",
    difficulty: "Moderate",
    stem: `A CPA conducts a financial statement audit of a state agency under Government Auditing Standards (Yellow Book). What ADDITIONAL report is required beyond the standard GAAS financial statement opinion?`,
    choices: [
      { key: "A", text: "A report on the auditor's qualifications and experience" },
      { key: "B", text: "A report on internal control over financial reporting and on compliance with laws and regulations" },
      { key: "C", text: "A report on the efficiency and effectiveness of government programs" },
      { key: "D", text: "A separate report on auditor independence" },
    ],
    correct: "B",
    explanation: `Yellow Book (GAGAS) financial statement audits require two additional reports:

1. Report on INTERNAL CONTROL over financial reporting -- describing significant deficiencies and material weaknesses identified

2. Report on COMPLIANCE with laws, regulations, and provisions of contracts or grant agreements -- reporting material noncompliance

These are in addition to the standard financial statement opinion. Yellow Book also has additional CPE, independence, and quality control requirements.`,
    whyWrong: [
      { key: "A", reason: "A report on auditor qualifications is not required. Yellow Book has CPE requirements, but not a separate qualifications report." },
      { key: "C", reason: "Performance audits assess program efficiency -- this is a different Yellow Book engagement type from financial statement audits." },
      { key: "D", reason: "A separate independence report is not required under Yellow Book." },
    ],
  },

  {
    id: "aud-41",
    topic: "Government Auditing — Single Audit",
    difficulty: "Hard",
    stem: `A nonprofit organization receives $1,200,000 in federal awards during the year. What is required under the Uniform Guidance (Single Audit requirements)?`,
    choices: [
      { key: "A", text: "No single audit -- only a GAAS financial statement audit" },
      { key: "B", text: "A single audit including financial statements, internal control over compliance, and compliance with major federal programs" },
      { key: "C", text: "A program-specific audit of the largest federal grant only" },
      { key: "D", text: "Single audits apply only to state and local governments, not nonprofits" },
    ],
    correct: "B",
    explanation: `Single Audit Requirements (Uniform Guidance -- 2 CFR Part 200):

Threshold: Non-federal entities expending $750,000 or more in federal awards must have a single audit.

$1,200,000 > $750,000 -- single audit required.

A single audit includes:
1. Financial statement audit (GAAS/GAGAS)
2. Audit of internal controls over compliance for major federal programs
3. Compliance audit of major federal programs
4. Schedule of Expenditures of Federal Awards (SEFA)

Applies to state/local governments AND nonprofits.`,
    whyWrong: [
      { key: "A", reason: "Exceeding $750,000 triggers the single audit requirement -- a financial statement audit alone is insufficient." },
      { key: "C", reason: "Program-specific audits are an alternative only for entities with a single federal program. Full single audit is needed here." },
      { key: "D", reason: "Nonprofits meeting the expenditure threshold are subject to single audit requirements just like governments." },
    ],
  },

  {
    id: "aud-42",
    topic: "Government Auditing — Compliance Opinion",
    difficulty: "Moderate",
    stem: `During a single audit, the auditor finds material noncompliance with a major federal program requirement. Management is aware and has not corrected it.

What type of opinion does the auditor issue on compliance for that program?`,
    choices: [
      { key: "A", text: "Unmodified compliance opinion with an emphasis-of-matter paragraph" },
      { key: "B", text: "Qualified or adverse compliance opinion" },
      { key: "C", text: "Disclaimer on the entire financial statements" },
      { key: "D", text: "No opinion -- compliance opinions are informational only" },
    ],
    correct: "B",
    explanation: `Single audit compliance opinions follow a similar framework to financial statement opinions:

UNMODIFIED: No material noncompliance found.
QUALIFIED: Material noncompliance found, NOT pervasive.
ADVERSE: Material noncompliance, pervasive.
DISCLAIMER: Scope limitation -- cannot obtain sufficient compliance evidence.

Material uncorrected noncompliance = Qualified or adverse compliance opinion on that major program. The financial statement opinion is separate and may remain unmodified.`,
    whyWrong: [
      { key: "A", reason: "Unmodified states there is no material noncompliance. Material noncompliance requires a modified (qualified or adverse) opinion." },
      { key: "C", reason: "The compliance opinion is separate from the financial statement opinion -- noncompliance affects compliance opinion, not automatically the financial statement opinion." },
      { key: "D", reason: "Compliance opinions are real, binding opinions -- not informational summaries." },
    ],
  },

  {
    id: "aud-43",
    topic: "Government Auditing — Independence (Yellow Book)",
    difficulty: "Hard",
    stem: `A staff auditor on a government audit engagement previously worked for the audited agency as a financial analyst two years ago. Under Yellow Book independence standards, what is required?`,
    choices: [
      { key: "A", text: "No impact -- two years eliminates any independence concern" },
      { key: "B", text: "The staff auditor must be removed -- prior employment always impairs independence" },
      { key: "C", text: "The firm must evaluate the threat and determine whether safeguards reduce it to an acceptable level" },
      { key: "D", text: "Independence is impaired only if the staff auditor held a management role at the agency" },
    ],
    correct: "C",
    explanation: `Yellow Book (GAGAS) uses a THREATS AND SAFEGUARDS conceptual framework for independence.

Prior employment creates a FAMILIARITY THREAT. The firm must:
1. Identify the threat
2. Evaluate its significance (recency, nature of role, access to sensitive information)
3. Apply safeguards if needed (enhanced review, restricting duties, removing from engagement)
4. Determine if residual threat is at an acceptable level

No automatic rule -- professional judgment is required. Two years may or may not be sufficient depending on the nature of the prior role.`,
    whyWrong: [
      { key: "A", reason: "There is no bright-line '2 years is fine' rule under Yellow Book -- the threat must be evaluated using the conceptual framework." },
      { key: "B", reason: "Prior employment does not automatically impair independence -- GAGAS requires threat evaluation and consideration of safeguards." },
      { key: "D", reason: "Even non-management prior roles can create familiarity threats requiring evaluation." },
    ],
  },

  // ── ATTESTATION & REVIEW (aud-44 to aud-47) ───────────────────────────────

  {
    id: "aud-44",
    topic: "Attestation — Examination vs. Review vs. AUP",
    difficulty: "Moderate",
    stem: `A client wants the HIGHEST level of assurance available from a CPA on the company's internal controls over financial reporting.

Which engagement type should the CPA perform?`,
    choices: [
      { key: "A", text: "Agreed-upon procedures engagement" },
      { key: "B", text: "Review of internal controls" },
      { key: "C", text: "Examination of internal controls" },
      { key: "D", text: "Compilation of internal controls documentation" },
    ],
    correct: "C",
    explanation: `Attestation engagement levels (AT-C):

EXAMINATION (highest assurance):
- Positive assurance: 'Based on our examination, internal controls are effective...'
- Extensive procedures analogous to an audit

REVIEW (limited assurance):
- Negative assurance: 'Nothing came to our attention...'
- Primarily inquiry and analytical procedures

AGREED-UPON PROCEDURES:
- No assurance expressed -- only findings reported

COMPILATION:
- No assurance -- not an attestation engagement

For HIGHEST assurance: Examination.`,
    whyWrong: [
      { key: "A", reason: "AUP provides NO assurance -- the CPA only reports findings from specified procedures." },
      { key: "B", reason: "A review provides only LIMITED (negative) assurance -- lower than an examination." },
      { key: "D", reason: "Compilation is not an attestation engagement and provides no assurance whatsoever." },
    ],
  },

  {
    id: "aud-45",
    topic: "Attestation — Review Engagement Procedures",
    difficulty: "Moderate",
    stem: `A CPA performs a review of a nonpublic company's financial statements. What are the PRIMARY procedures performed?`,
    choices: [
      { key: "A", text: "Physical inventory observation and receivables confirmations" },
      { key: "B", text: "Tests of controls over financial reporting" },
      { key: "C", text: "Inquiry and analytical procedures" },
      { key: "D", text: "Vouching transactions to supporting documents" },
    ],
    correct: "C",
    explanation: `AR-C Section 90 -- Review Engagements:

A review provides LIMITED assurance. Primary procedures are:
1. INQUIRY of management and key personnel
2. ANALYTICAL PROCEDURES (comparing current to prior periods, industry data, expectations)

Reviews do NOT include:
- Tests of controls
- Physical inventory observation
- External confirmations
- Detailed vouching of transactions

Because limited procedures are used, the conclusion uses negative assurance: 'Nothing came to our attention that suggests the statements are not in conformity with GAAP.'`,
    whyWrong: [
      { key: "A", reason: "Physical inventory observation and confirmations are AUDIT procedures -- not performed in a review." },
      { key: "B", reason: "Tests of controls are audit procedures. Reviews do not include control testing." },
      { key: "D", reason: "Vouching transactions is an audit substantive procedure -- not part of a review engagement." },
    ],
  },

  {
    id: "aud-46",
    topic: "Attestation — Prospective Financial Information",
    difficulty: "Hard",
    stem: `A CPA examines a company's financial forecast (management's best estimate of expected results) and issues a report with positive assurance. Which statement correctly describes this engagement?`,
    choices: [
      { key: "A", text: "The CPA is responsible for the accuracy of the forecast" },
      { key: "B", text: "The report provides assurance on the reasonableness of assumptions and that the forecast is prepared in accordance with AICPA guidelines" },
      { key: "C", text: "The CPA must update the forecast when actual results differ" },
      { key: "D", text: "An examination of a forecast provides the same assurance as a compilation" },
    ],
    correct: "B",
    explanation: `AT-C Section 305 -- Prospective Financial Information:

A financial forecast examination provides positive assurance on:
1. Whether assumptions provide a REASONABLE BASIS for the forecast
2. Whether the forecast is prepared in accordance with AICPA presentation guidelines
3. Whether computations are mathematically accurate

The CPA does NOT guarantee accuracy -- future events are inherently uncertain. Management is responsible for the assumptions and the forecast.`,
    whyWrong: [
      { key: "A", reason: "The CPA provides assurance on reasonableness of assumptions -- not a guarantee of accuracy. Future results may differ." },
      { key: "C", reason: "The CPA has no ongoing obligation to update as actual results come in -- the engagement covers a specific point in time." },
      { key: "D", reason: "An examination provides the HIGHEST assurance level for prospective information. A compilation of prospective information provides NO assurance." },
    ],
  },

  {
    id: "aud-47",
    topic: "Attestation — Agreed-Upon Procedures",
    difficulty: "Moderate",
    stem: `A CPA performs an agreed-upon procedures engagement on a company's accounts receivable. Which statement BEST describes the CPA's report?`,
    choices: [
      { key: "A", text: "The CPA expresses an opinion that accounts receivable is fairly stated" },
      { key: "B", text: "The CPA provides negative assurance that nothing came to their attention indicating misstatement" },
      { key: "C", text: "The CPA describes the procedures performed and the findings -- no assurance is expressed" },
      { key: "D", text: "The CPA confirms the receivable balance directly with customers as the primary procedure" },
    ],
    correct: "C",
    explanation: `Agreed-Upon Procedures (AT-C Section 215):

The CPA:
1. Performs only the SPECIFIC procedures agreed upon with the engaging party
2. Reports the FINDINGS from those procedures
3. Expresses NO opinion and provides NO assurance

The report is restricted to specified parties (those who agreed to the procedures). Users interpret findings themselves -- the CPA does not opine on whether the balance is fairly stated.`,
    whyWrong: [
      { key: "A", reason: "AUP engagements provide NO opinion. Expressing an opinion would make this an examination." },
      { key: "B", reason: "Negative assurance is provided in REVIEW engagements. AUP provides no assurance of any kind." },
      { key: "D", reason: "Customer confirmations might be one of the agreed-upon procedures, but they are not a defining characteristic of all AUP reports." },
    ],
  },

  // ── SPECIAL PURPOSE FRAMEWORKS (aud-48 to aud-50) ────────────────────────

  {
    id: "aud-48",
    topic: "Special Purpose Frameworks — Cash Basis",
    difficulty: "Moderate",
    stem: `A CPA audits financial statements prepared on the cash basis of accounting. How does the audit report differ from a standard GAAP report?`,
    choices: [
      { key: "A", text: "Identical wording to a standard GAAP audit report" },
      { key: "B", text: "Must include an emphasis-of-matter paragraph describing the cash basis and how it differs from GAAP" },
      { key: "C", text: "Must express an adverse opinion because cash basis is not GAAP" },
      { key: "D", text: "Must include a disclaimer because GAAP was not followed" },
    ],
    correct: "B",
    explanation: `AU-C Section 800 -- Special Purpose Frameworks:

When statements are prepared on a special purpose framework (cash basis, tax basis, regulatory, contractual), the auditor's report must:
1. Describe the special purpose framework used
2. Include an EMPHASIS-OF-MATTER paragraph explaining the basis of accounting and how it differs from GAAP
3. Use a modified report title (e.g., 'Financial Statements Prepared on the Cash Basis of Accounting')

An unmodified opinion CAN be issued if statements are fairly presented under the cash basis -- no adverse opinion required.`,
    whyWrong: [
      { key: "A", reason: "The report language is modified to describe the special purpose framework -- it is not identical to a GAAP report." },
      { key: "C", reason: "Special purpose framework statements are not automatically adverse. The auditor evaluates fair presentation under THAT framework." },
      { key: "D", reason: "A disclaimer applies to scope limitations -- not to the use of a special purpose framework." },
    ],
  },

  {
    id: "aud-49",
    topic: "Special Purpose Frameworks — Omitted Disclosures in Compilations",
    difficulty: "Moderate",
    stem: `A CPA compiles financial statements for a small business. The owner asks the CPA to omit substantially all disclosures. The CPA agrees.

Which statement is correct?`,
    choices: [
      { key: "A", text: "The CPA must decline -- omitting disclosures is prohibited in a compilation" },
      { key: "B", text: "The CPA may compile statements with omitted disclosures if disclosed in the compilation report and not intended to mislead" },
      { key: "C", text: "The CPA must issue a qualified opinion on the compiled statements" },
      { key: "D", text: "Omitting disclosures is acceptable only if the client signs a waiver" },
    ],
    correct: "B",
    explanation: `AR-C Section 80 -- Compilation Engagements:

A CPA may compile statements that OMIT substantially all disclosures, provided:
1. The omission is disclosed in the compilation report
2. The omission is not, to the CPA's knowledge, intended to mislead users
3. The engagement letter addresses this

The compilation report notes that disclosures required by the framework have been omitted.

Compilations involve no verification and provide no assurance -- they are a presentation assistance service.`,
    whyWrong: [
      { key: "A", reason: "Omitting disclosures IS allowed in compilations -- AR-C Section 80 specifically permits it with proper disclosure in the report." },
      { key: "C", reason: "Compilations do not result in any opinion. The CPA provides no assurance in a compilation." },
      { key: "D", reason: "A client waiver is not the mechanism. The CPA discloses the omission in the compilation report itself." },
    ],
  },

  {
    id: "aud-50",
    topic: "Special Purpose Frameworks — Comfort Letters",
    difficulty: "Hard",
    stem: `An underwriter requests a comfort letter from an auditor in connection with a securities offering. Which of the following can the auditor typically include?`,
    choices: [
      { key: "A", text: "A positive opinion that unaudited interim statements are fairly presented in accordance with GAAP" },
      { key: "B", text: "Negative assurance on whether unaudited interim financial statements comply with SEC requirements" },
      { key: "C", text: "A guarantee that no material adverse changes have occurred since the last audit" },
      { key: "D", text: "An opinion on the company's future profitability" },
    ],
    correct: "B",
    explanation: `Comfort letters (AU-C Section 920):

Addressed to underwriters in connection with securities offerings. Typically include:
1. CPA independence statement
2. Positive assurance on audited financial statements' SEC compliance (based on the audit)
3. NEGATIVE ASSURANCE on unaudited interim statements ('nothing came to our attention')
4. Negative assurance on changes in selected data since the audit date
5. Comments on tables and statistics in registration statements

The auditor provides NEGATIVE (not positive) assurance on unaudited periods because only limited procedures were applied.`,
    whyWrong: [
      { key: "A", reason: "Positive opinions on unaudited periods are not provided in comfort letters -- only negative assurance is possible on unaudited statements." },
      { key: "C", reason: "The auditor cannot guarantee no material adverse changes -- only negative assurance based on limited procedures." },
      { key: "D", reason: "Opinions on future profitability are never given in comfort letters or any standard engagement." },
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
  // ── INDIVIDUAL INCOME — GROSS INCOME & EXCLUSIONS ─────────────────────────

  {
    id: "reg-5",
    topic: "Individual Income — Gross Income Inclusions",
    difficulty: "Moderate",
    stem: `During the year Karen receives:
• Salary: $80,000
• Inheritance from her uncle: $40,000
• Life insurance proceeds as named beneficiary: $100,000
• Gambling winnings: $5,000
• Interest on City of Chicago municipal bonds: $3,000

What amount must Karen include in gross income?`,
    choices: [
      { key: "A", text: "$85,000" },
      { key: "B", text: "$88,000" },
      { key: "C", text: "$228,000" },
      { key: "D", text: "$125,000" },
    ],
    correct: "A",
    explanation: `Inclusions vs. exclusions:\n\n• Salary $80,000 → Included ✓\n• Inheritance $40,000 → Excluded (IRC §102 — gifts and inheritances)\n• Life insurance proceeds $100,000 → Excluded (IRC §101 — death benefit to named beneficiary)\n• Gambling winnings $5,000 → Included ✓\n• Municipal bond interest $3,000 → Excluded (IRC §103 — state/local government bond interest)\n\nGross income = $80,000 + $5,000 = $85,000`,
    whyWrong: [
      { key: "B", reason: "$88,000 adds municipal bond interest, which is specifically excluded under IRC §103." },
      { key: "C", reason: "$228,000 includes everything — inheritances, life insurance, and muni interest are all statutory exclusions." },
      { key: "D", reason: "$125,000 includes life insurance proceeds, excluded when paid to a named beneficiary upon the insured's death." },
    ],
  },

  {
    id: "reg-6",
    topic: "Individual Income — Fringe Benefit Exclusions",
    difficulty: "Moderate",
    stem: `Todd's employer provides:
• Employer-paid health insurance premiums: $6,000
• Group term life insurance: $200,000 face amount (first $50,000 of coverage is excluded)
• Employer-provided parking: $3,600/year (exclusion limit is $300/month)
• Cash bonus: $10,000

How much must Todd include in gross income?`,
    choices: [
      { key: "A", text: "$10,000 only" },
      { key: "B", text: "$13,600" },
      { key: "C", text: "$10,000 plus imputed income on the $150,000 excess life insurance coverage" },
      { key: "D", text: "$16,000" },
    ],
    correct: "C",
    explanation: `• Health insurance $6,000 → Excluded (IRC §106) ✓\n• Group term life: First $50,000 excluded (IRC §79). The excess $150,000 generates imputed income per IRS tables → includable ✓\n• Parking $3,600/yr = $300/month → exactly at the exclusion limit → fully excluded ✓\n• Cash bonus $10,000 → Always includable ✓\n\nGross income = $10,000 cash bonus + imputed income on excess $150,000 life coverage.`,
    whyWrong: [
      { key: "A", reason: "$10,000 misses the imputed income on the excess life insurance above $50,000 of coverage." },
      { key: "B", reason: "$13,600 adds parking ($3,600), which is fully excluded since it equals the $300/month limit exactly." },
      { key: "D", reason: "$16,000 includes health insurance, which is fully excluded under IRC §106." },
    ],
  },

  {
    id: "reg-7",
    topic: "Individual Income — Alimony Post-TCJA",
    difficulty: "Moderate",
    stem: `Under a divorce agreement executed in 2024, Brad pays Linda $2,000 per month. No child-contingency language applies. Brad's AGI is $120,000.

Under post-TCJA rules, how is the $24,000 annual payment treated?`,
    choices: [
      { key: "A", text: "Deductible by Brad; includable by Linda" },
      { key: "B", text: "Not deductible by Brad; not includable by Linda" },
      { key: "C", text: "Not deductible by Brad; includable by Linda" },
      { key: "D", text: "Deductible by Brad; not includable by Linda" },
    ],
    correct: "B",
    explanation: `The TCJA fundamentally changed alimony treatment for divorce agreements executed after December 31, 2018:\n\n• Pre-2019 agreements: Deductible by payer (for AGI), includable by recipient\n• Post-2018 agreements: NOT deductible by payer; NOT includable by recipient\n\nThis agreement was executed in 2024 → post-TCJA rules apply.\nBrad cannot deduct the payments; Linda does not include them in income.`,
    whyWrong: [
      { key: "A", reason: "This is the pre-2019 rule. For agreements executed after 2018, neither party is affected tax-wise." },
      { key: "C", reason: "Post-TCJA alimony is excluded from the recipient's income entirely — Linda does not include it." },
      { key: "D", reason: "Post-TCJA alimony is also not deductible by the payer — neither side has a tax consequence." },
    ],
  },

  {
    id: "reg-8",
    topic: "Individual Income — Social Security Inclusion",
    difficulty: "Moderate",
    stem: `Margaret is single. She receives $20,000 in Social Security benefits and also has $30,000 of wages and $8,000 of tax-exempt municipal bond interest.

What is her combined income for the Social Security inclusion test, and what percentage of SS benefits may be includable?`,
    choices: [
      { key: "A", text: "Combined income $38,000; up to 50% of SS includable" },
      { key: "B", text: "Combined income $48,000; up to 85% of SS includable" },
      { key: "C", text: "Combined income $40,000; up to 50% of SS includable" },
      { key: "D", text: "Combined income $48,000; up to 50% of SS includable" },
    ],
    correct: "B",
    explanation: `SS combined income formula:\nCombined Income = AGI + Tax-exempt interest + 50% of SS benefits\n= $30,000 + $8,000 + $10,000 = $48,000\n\nSingle filer thresholds:\n• Below $25,000 → 0% included\n• $25,000–$34,000 → up to 50% included\n• Above $34,000 → up to 85% included\n\n$48,000 > $34,000 → up to 85% of SS benefits are includable.`,
    whyWrong: [
      { key: "A", reason: "$38,000 omits municipal bond interest. Tax-exempt interest IS included in the SS combined income calculation." },
      { key: "C", reason: "$40,000 miscalculates — also, $40,000 > $34,000 threshold so 85% applies, not 50%." },
      { key: "D", reason: "Combined income of $48,000 is correct, but $48,000 > $34,000 → 85% applies, not 50%." },
    ],
  },

  {
    id: "reg-9",
    topic: "Individual Income — Discharge of Debt",
    difficulty: "Hard",
    stem: `First National Bank cancels $30,000 of debt owed by Rachel on her personal credit card. Rachel is solvent immediately before the cancellation.

How does Rachel treat the cancelled debt for federal income tax purposes?`,
    choices: [
      { key: "A", text: "Excluded — cancelled debt is never taxable" },
      { key: "B", text: "Included in gross income as ordinary income" },
      { key: "C", text: "Excluded only if Rachel files for bankruptcy" },
      { key: "D", text: "Excluded to the extent of Rachel's insolvency before cancellation" },
    ],
    correct: "B",
    explanation: `IRC §61(a)(12): Discharge of indebtedness is included in gross income when:\n• The taxpayer is solvent (Rachel is solvent ✓)\n• No specific exclusion applies\n\nKey exclusions NOT applicable here:\n1. Bankruptcy — Rachel has not filed\n2. Insolvency — Rachel is solvent\n3. Qualified farm debt — not applicable\n4. Qualified principal residence debt — credit card, not mortgage\n\nResult: Rachel includes $30,000 as ordinary income.`,
    whyWrong: [
      { key: "A", reason: "Cancelled debt is generally taxable. Only specific IRC exclusions allow it to be excluded." },
      { key: "C", reason: "Bankruptcy is one exclusion, but Rachel has not filed — and even so, she is solvent." },
      { key: "D", reason: "The insolvency exclusion only applies to the extent of insolvency. Rachel is solvent — zero insolvency exclusion applies." },
    ],
  },

  {
    id: "reg-10",
    topic: "Individual Income — Hobby Loss Rules",
    difficulty: "Moderate",
    stem: `Valerie breeds horses and has losses in 4 of the past 5 years. The activity has NOT been demonstrated to be a for-profit business. In the current year, the horse activity generates $12,000 of income and $20,000 of expenses.

How much of the $20,000 in expenses can Valerie deduct?`,
    choices: [
      { key: "A", text: "$20,000 — all expenses deductible as a Schedule C business" },
      { key: "B", text: "$12,000 — limited to income from the activity" },
      { key: "C", text: "$0 — hobby losses are completely non-deductible" },
      { key: "D", text: "$8,000 — only the loss portion is deductible" },
    ],
    correct: "B",
    explanation: `IRC §183 — Hobby Loss Rules:\n\nAn activity is a hobby (not a business) if it fails to show profit in at least 3 of 5 consecutive years (2 of 7 for horse activities — but a 4-of-5 loss pattern here strongly suggests hobby).\n\nFor hobby activities:\n• Income IS included in gross income\n• Expenses deductible only up to hobby income — cannot create a loss\n\nDeductible: $12,000 (limited to income). The $8,000 excess is nondeductible.`,
    whyWrong: [
      { key: "A", reason: "Full deductibility requires the activity to qualify as a trade or business under IRC §162. This activity is a hobby." },
      { key: "C", reason: "Hobby expenses ARE deductible — but only up to the amount of hobby income, not beyond." },
      { key: "D", reason: "$8,000 is the net loss, not the deductible amount. Deductible expenses = income earned = $12,000." },
    ],
  },

  // ── INDIVIDUAL DEDUCTIONS & CREDITS ──────────────────────────────────────

  {
    id: "reg-11",
    topic: "Individual Deductions — Above-the-Line",
    difficulty: "Moderate",
    stem: `Which of the following is deductible FOR adjusted gross income (an above-the-line deduction) on an individual's tax return?`,
    choices: [
      { key: "A", text: "Charitable contributions to a qualified organization" },
      { key: "B", text: "Medical expenses exceeding 7.5% of AGI" },
      { key: "C", text: "Alimony paid under a pre-2019 divorce agreement" },
      { key: "D", text: "State and local taxes paid" },
    ],
    correct: "C",
    explanation: `For-AGI (above-the-line) deductions include:\n• Trade/business expenses (Schedule C)\n• Alimony paid under pre-2019 divorce agreements (IRC §215)\n• Student loan interest\n• Educator expenses (up to $300)\n• HSA contributions\n• Self-employed health insurance\n• IRA contributions\n• Capital losses (up to $3,000)\n\nAlimony paid under a pre-2019 agreement is a for-AGI deduction. Charitable contributions, medical expenses, and SALT are all itemized (from-AGI) deductions.`,
    whyWrong: [
      { key: "A", reason: "Charitable contributions are an itemized deduction — below-the-line." },
      { key: "B", reason: "Medical expenses exceeding 7.5% of AGI are an itemized deduction." },
      { key: "D", reason: "State and local taxes (SALT) are an itemized deduction, capped at $10,000." },
    ],
  },

  {
    id: "reg-12",
    topic: "Individual Deductions — Medical Expense Floor",
    difficulty: "Moderate",
    stem: `Grace has AGI of $80,000. She pays:
• Prescription medications: $4,000
• Doctor and hospital bills: $6,000
• Elective cosmetic surgery: $3,000
• Health insurance premiums paid pre-tax through payroll: $5,000

What is Grace's allowable medical expense itemized deduction?`,
    choices: [
      { key: "A", text: "$13,000 before floor; $7,000 deductible" },
      { key: "B", text: "$10,000 before floor; $4,000 deductible" },
      { key: "C", text: "$10,000 before floor; $1,000 deductible" },
      { key: "D", text: "$18,000 before floor; $12,000 deductible" },
    ],
    correct: "B",
    explanation: `Step 1 — Identify deductible medical expenses (IRC §213):\n• Prescriptions $4,000 ✓\n• Doctor/hospital $6,000 ✓\n• Cosmetic surgery $3,000 ✗ (purely elective — not deductible)\n• Pre-tax employer premiums $5,000 ✗ (already excluded from income — cannot deduct)\n\nQualified expenses: $10,000\n\nStep 2 — Apply the 7.5% AGI floor:\n$80,000 × 7.5% = $6,000\n\nDeductible: $10,000 − $6,000 = $4,000`,
    whyWrong: [
      { key: "A", reason: "$13,000 includes cosmetic surgery ($3,000), which is not a deductible medical expense under IRC §213." },
      { key: "C", reason: "$1,000 results from using a 10% AGI floor — the current threshold is 7.5% of AGI." },
      { key: "D", reason: "$18,000 includes all four items. Both cosmetic surgery and pre-tax premiums must be excluded before applying the floor." },
    ],
  },

  {
    id: "reg-13",
    topic: "Individual Deductions — SALT Cap",
    difficulty: "Moderate",
    stem: `Henry pays during the year:
• State income taxes: $8,000
• Real property taxes on his home: $5,500
• Personal property tax on his car: $1,200

What is Henry's allowable SALT deduction on his federal return?`,
    choices: [
      { key: "A", text: "$14,700" },
      { key: "B", text: "$13,500" },
      { key: "C", text: "$10,000" },
      { key: "D", text: "$9,200" },
    ],
    correct: "C",
    explanation: `The TCJA capped the state and local tax (SALT) deduction at $10,000 per year ($5,000 if MFS).\n\nTotal SALT paid:\n$8,000 + $5,500 + $1,200 = $14,700\n\nAll three items are deductible state/local taxes before the cap. But the total exceeds $10,000 → deductible amount: $10,000.`,
    whyWrong: [
      { key: "A", reason: "$14,700 is the total paid — the TCJA cap limits the deduction to $10,000." },
      { key: "B", reason: "$13,500 omits the personal property tax but still exceeds the $10,000 cap." },
      { key: "D", reason: "$9,200 omits the personal property tax. All three qualify toward the SALT cap." },
    ],
  },

  {
    id: "reg-14",
    topic: "Individual Credits — Child Tax Credit",
    difficulty: "Moderate",
    stem: `Kevin and Lisa file jointly with AGI of $175,000. They have three qualifying children ages 4, 8, and 16. The child tax credit is $2,000 per qualifying child under age 17. The phase-out begins at $400,000 for MFJ.

What is their total child tax credit?`,
    choices: [
      { key: "A", text: "$4,000" },
      { key: "B", text: "$6,000" },
      { key: "C", text: "$2,000" },
      { key: "D", text: "$3,000" },
    ],
    correct: "B",
    explanation: `Child Tax Credit (IRC §24):\n• $2,000 per qualifying child UNDER age 17\n• Phase-out at $400,000 (MFJ) — no phase-out here ($175,000 << $400,000)\n\nQualifying children:\n• Age 4 ✓ • Age 8 ✓ • Age 16 ✓ (all under 17)\n\nCredit = 3 × $2,000 = $6,000`,
    whyWrong: [
      { key: "A", reason: "$4,000 counts only 2 children. All three ages (4, 8, 16) are under 17 and qualify." },
      { key: "C", reason: "$2,000 counts only 1 child. All three qualify." },
      { key: "D", reason: "$3,000 reflects an outdated credit amount. Post-TCJA the credit is $2,000 per child." },
    ],
  },

  {
    id: "reg-15",
    topic: "Individual Deductions — Net Operating Loss Post-TCJA",
    difficulty: "Hard",
    stem: `In Year 1, Patricia generates a Net Operating Loss of $60,000 from her sole proprietorship. She has no prior year NOLs. Her Year 1 NOL arises in a tax year beginning after 2017.

How may Patricia use this NOL under post-TCJA rules?`,
    choices: [
      { key: "A", text: "Carry back 2 years, then forward 20 years" },
      { key: "B", text: "Carry forward indefinitely, limited to 80% of taxable income each year" },
      { key: "C", text: "Carry forward 20 years with no income limitation" },
      { key: "D", text: "Deduct fully in Year 1 — no carryforward required" },
    ],
    correct: "B",
    explanation: `Post-TCJA NOL rules (NOLs arising in tax years beginning after 2017):\n\n• NO carryback (eliminated for most taxpayers; farming loss exception applies)\n• Carryforward: INDEFINITELY — no 20-year expiration\n• Annual deduction limit: 80% of taxable income in the carryforward year\n• Excess continues to carry forward\n\nPre-TCJA: 2-year carryback, 20-year carryforward, 100% of income — those rules no longer apply to new NOLs.`,
    whyWrong: [
      { key: "A", reason: "The 2-year carryback was eliminated by the TCJA for most taxpayers. Post-TCJA NOLs are carry-forward only." },
      { key: "C", reason: "The 20-year limit was eliminated. Post-TCJA NOLs carry forward indefinitely — but WITH the 80% income limitation." },
      { key: "D", reason: "An NOL arises when deductions exceed income — there is no remaining income in Year 1 to absorb the loss." },
    ],
  },

  {
    id: "reg-16",
    topic: "Individual — Alternative Minimum Tax",
    difficulty: "Hard",
    stem: `Nancy (single) has regular taxable income of $200,000. AMT adjustments total $50,000 (accelerated depreciation). AMT preferences total $30,000 (tax-exempt private activity bond interest). The AMT exemption for single filers is $85,700 (no phase-out applies).

What is Nancy's AMT base (AMTI less exemption)?`,
    choices: [
      { key: "A", text: "$194,300" },
      { key: "B", text: "$164,300" },
      { key: "C", text: "$280,000" },
      { key: "D", text: "$144,300" },
    ],
    correct: "A",
    explanation: `AMT calculation:\n\nRegular taxable income:    $200,000\n+ AMT adjustments:         +$ 50,000\n+ AMT preferences:         +$ 30,000\nAMTI (before exemption):   $280,000\n− AMT exemption:           −$ 85,700\nAMT base:                  $194,300\n\nThe 26% or 28% rate then applies to the AMT base to compute tentative minimum tax.`,
    whyWrong: [
      { key: "B", reason: "$164,300 omits AMT preferences ($30,000) from AMTI. Both adjustments AND preferences must be added." },
      { key: "C", reason: "$280,000 is AMTI before the exemption. You must subtract the exemption to get the AMT base." },
      { key: "D", reason: "$144,300 subtracts the exemption from regular taxable income only — adjustments and preferences must be added first." },
    ],
  },

  // ── PROPERTY TRANSACTIONS ──────────────────────────────────────────────────

  {
    id: "reg-17",
    topic: "Property — Capital Gain Holding Period",
    difficulty: "Moderate",
    stem: `Sandra sells 200 shares of XYZ stock on July 15, Year 2. She purchased them on July 14, Year 1. Her gain is $8,000.

What is the character of Sandra's gain?`,
    choices: [
      { key: "A", text: "Long-term capital gain — held more than 12 months" },
      { key: "B", text: "Short-term capital gain — held exactly 12 months, which is not MORE than 12 months" },
      { key: "C", text: "Long-term capital gain — held exactly one year qualifies" },
      { key: "D", text: "Ordinary income — stock gains are always ordinary" },
    ],
    correct: "B",
    explanation: `Long-term capital gain requires MORE THAN 12 months (more than one year).\n\nPurchase: July 14, Year 1 (purchase date excluded from count)\nSale: July 15, Year 2\nHolding period: exactly 12 months — does NOT meet "more than 12 months"\n\nResult: Short-term capital gain, taxed at ordinary income rates.`,
    whyWrong: [
      { key: "A", reason: "Exactly 12 months is NOT long-term. You need one year AND one day (more than 12 months)." },
      { key: "C", reason: "Same error — exactly one year is short-term, not long-term." },
      { key: "D", reason: "Stock is a capital asset. Gains on capital assets are capital gains — not ordinary income." },
    ],
  },

  {
    id: "reg-18",
    topic: "Property — Inherited Property Basis",
    difficulty: "Moderate",
    stem: `Greta inherits stock from her grandmother who died March 15. The stock's FMV on date of death was $90,000; the grandmother's adjusted basis was $30,000. Greta sells the stock six months later for $95,000.

What is Greta's gain and its character?`,
    choices: [
      { key: "A", text: "$65,000 long-term capital gain" },
      { key: "B", text: "$5,000 long-term capital gain" },
      { key: "C", text: "$5,000 short-term capital gain — held less than 12 months" },
      { key: "D", text: "$65,000 ordinary income" },
    ],
    correct: "B",
    explanation: `Inherited property (IRC §1014):\nBasis = FMV on date of death = $90,000 (stepped-up basis)\n\nGain = $95,000 − $90,000 = $5,000\n\nCharacter: Inherited property is automatically treated as LONG-TERM regardless of how long the heir held it (IRC §1223(11)).\n\nLong-term capital gain: $5,000.`,
    whyWrong: [
      { key: "A", reason: "$65,000 uses the grandmother's $30,000 basis. Inherited property receives a step-up to FMV at date of death." },
      { key: "C", reason: "Short-term treatment does NOT apply to inherited property. Long-term treatment is automatic under §1223(11)." },
      { key: "D", reason: "Stock is a capital asset — gains are capital gains, not ordinary income." },
    ],
  },

  {
    id: "reg-19",
    topic: "Property — Section 1245 Depreciation Recapture",
    difficulty: "Hard",
    stem: `Riverside Corp. sells business equipment for $120,000. Original cost: $150,000. Accumulated depreciation: $80,000. Adjusted basis: $70,000.

How much of the $50,000 gain is ordinary income under §1245, and how much is §1231 gain?`,
    choices: [
      { key: "A", text: "$50,000 ordinary income; $0 §1231 gain" },
      { key: "B", text: "$0 ordinary income; $50,000 §1231 gain" },
      { key: "C", text: "$80,000 ordinary income (all depreciation recaptured)" },
      { key: "D", text: "$30,000 ordinary income; $20,000 §1231 gain" },
    ],
    correct: "A",
    explanation: `§1245 recaptures the LESSER of:\n1. Total gain: $120,000 − $70,000 = $50,000\n2. Accumulated depreciation: $80,000\n\nLesser = $50,000 → All $50,000 is ordinary income.\nNo §1231 gain remains because the total gain ($50,000) is less than accumulated depreciation ($80,000) — fully recaptured.`,
    whyWrong: [
      { key: "B", reason: "$50,000 §1231 gain ignores §1245 recapture entirely. Depreciation-driven gain is ordinary first." },
      { key: "C", reason: "$80,000 exceeds the total gain. §1245 recapture cannot create ordinary income beyond the actual gain recognized." },
      { key: "D", reason: "$30,000/$20,000 split doesn't follow the calculation. Since total gain < accumulated depreciation, ALL gain is ordinary." },
    ],
  },

  {
    id: "reg-20",
    topic: "Property — Like-Kind Exchange §1031",
    difficulty: "Hard",
    stem: `Frank exchanges real property (adjusted basis $200,000) for like-kind real property worth $350,000 and $30,000 cash (boot). The transaction qualifies under §1031.

What is Frank's recognized gain and basis in the new property?`,
    choices: [
      { key: "A", text: "Recognized $0; new basis $200,000" },
      { key: "B", text: "Recognized $30,000; new basis $200,000" },
      { key: "C", text: "Recognized $150,000; new basis $350,000" },
      { key: "D", text: "Recognized $30,000; new basis $230,000" },
    ],
    correct: "B",
    explanation: `§1031 with boot:\n\nRealized gain:\nFMV received ($350,000) + Boot ($30,000) − Basis ($200,000) = $180,000\n\nRecognized gain = lesser of realized gain or boot = lesser of $180,000 or $30,000 = $30,000\n\nBasis in new property:\nOld basis: $200,000\n+ Recognized gain: +$30,000\n− Boot received: −$30,000\nNew basis: $200,000\n\nAlt check: FMV ($350,000) − Deferred gain ($150,000) = $200,000 ✓`,
    whyWrong: [
      { key: "A", reason: "When boot is received, gain is recognized to the extent of the boot. $30,000 cash received → $30,000 recognized." },
      { key: "C", reason: "$150,000 is the deferred gain. Recognized gain is limited to boot received." },
      { key: "D", reason: "New basis is $200,000 ($200k + $30k recognized − $30k boot = $200k), not $230,000." },
    ],
  },

  {
    id: "reg-21",
    topic: "Property — Primary Residence Exclusion §121",
    difficulty: "Moderate",
    stem: `Ann and Tom (MFJ) sell their primary home for $850,000. They bought it 6 years ago for $450,000 and have lived there the entire time.

What is their taxable gain after the §121 exclusion?`,
    choices: [
      { key: "A", text: "$400,000 — §121 does not apply" },
      { key: "B", text: "$150,000 — $250,000 exclusion applied" },
      { key: "C", text: "$0 — fully excluded" },
      { key: "D", text: "$150,000 — both spouses must each satisfy separately" },
    ],
    correct: "C",
    explanation: `§121 Primary Residence Exclusion:\n• MFJ: Exclude up to $500,000 of gain\n• Requirement: owned AND used as primary residence for 2 of the 5 years before sale ✓ (6 years qualifies)\n\nGain: $850,000 − $450,000 = $400,000\nMFJ exclusion limit: $500,000\n$400,000 < $500,000 → entire gain excluded\n\nTaxable gain: $0`,
    whyWrong: [
      { key: "A", reason: "§121 clearly applies — they owned and lived in the home for 6 years, well over the 2-of-5-year requirement." },
      { key: "B", reason: "$250,000 is the single-filer exclusion. MFJ filers get $500,000, which exceeds the $400,000 gain." },
      { key: "D", reason: "For MFJ, only one spouse needs to satisfy the ownership test and only one the use test (though both must use it). The $500,000 exclusion is available." },
    ],
  },

  {
    id: "reg-22",
    topic: "Property — Installment Sales",
    difficulty: "Hard",
    stem: `Helen sells land (basis $100,000) for $400,000. She receives $80,000 at closing and $320,000 over the next 4 years. The land is not dealer property.

What is Helen's gross profit percentage and Year 1 recognized gain?`,
    choices: [
      { key: "A", text: "GP% 75%; Year 1 gain $60,000" },
      { key: "B", text: "GP% 75%; Year 1 gain $80,000" },
      { key: "C", text: "GP% 25%; Year 1 gain $20,000" },
      { key: "D", text: "GP% 75%; Year 1 gain $300,000" },
    ],
    correct: "A",
    explanation: `Installment Sale Method (IRC §453):\n\nGross profit = $400,000 − $100,000 = $300,000\nGP% = $300,000 ÷ $400,000 = 75%\n\nYear 1 cash received: $80,000\nYear 1 recognized gain: $80,000 × 75% = $60,000\n\nThe remaining 25% of each payment is return of basis (non-taxable).`,
    whyWrong: [
      { key: "B", reason: "$80,000 treats the entire first payment as gain. Only 75% is gain — 25% is return of basis." },
      { key: "C", reason: "25% is the return-of-basis ratio, not the gross profit percentage. GP% = 75%." },
      { key: "D", reason: "$300,000 is the total gross profit, not the Year 1 gain. Only the Year 1 cash receipt ($80,000) triggers Year 1 recognition." },
    ],
  },

  // ── PARTNERSHIP TAXATION ───────────────────────────────────────────────────

  {
    id: "reg-23",
    topic: "Partnership — Outside Basis",
    difficulty: "Hard",
    stem: `Donna contributes for a 30% partnership interest:
• Cash: $20,000
• Equipment: FMV $50,000, adjusted basis $30,000, subject to $15,000 liability assumed by the partnership

What is Donna's initial outside basis?`,
    choices: [
      { key: "A", text: "$39,500" },
      { key: "B", text: "$35,000" },
      { key: "C", text: "$50,000" },
      { key: "D", text: "$70,000" },
    ],
    correct: "A",
    explanation: `Outside basis (IRC §722):\n\nStart: Cash + Adjusted basis of property:\n$20,000 + $30,000 = $50,000\n\nLiability adjustment:\n− Liability assumed by partnership: −$15,000\n+ Donna's share back (30%): +$4,500\nNet reduction: $10,500\n\nOutside basis: $50,000 − $10,500 = $39,500`,
    whyWrong: [
      { key: "B", reason: "$35,000 omits the share-back. Donna is still 30% liable — $4,500 must be added back to basis." },
      { key: "C", reason: "$50,000 ignores the net liability relief entirely." },
      { key: "D", reason: "$70,000 uses FMV ($50,000) instead of adjusted basis ($30,000). Always use tax basis, not fair value." },
    ],
  },

  {
    id: "reg-24",
    topic: "Partnership — Distributive Share and Self-Employment",
    difficulty: "Moderate",
    stem: `Alice and Bob are equal general partners. The partnership has ordinary income of $80,000 and interest income of $10,000. Alice materially participates.

What does Alice report on her individual return, and what is subject to SE tax?`,
    choices: [
      { key: "A", text: "$45,000 total income; $45,000 subject to SE tax" },
      { key: "B", text: "$45,000 total income; $40,000 SE taxable; $5,000 not subject to SE tax" },
      { key: "C", text: "$40,000 total income; all subject to SE tax" },
      { key: "D", text: "$45,000 total income; none subject to SE tax" },
    ],
    correct: "B",
    explanation: `Alice's 50% share:\n• Ordinary income: $80,000 × 50% = $40,000\n• Interest income: $10,000 × 50% = $5,000\nTotal: $45,000\n\nSE tax treatment:\n• Ordinary business income of a general partner → Subject to SE tax: $40,000 ✓\n• Portfolio income (interest, dividends, capital gains) → NOT subject to SE tax: $5,000 ✗`,
    whyWrong: [
      { key: "A", reason: "Interest income is portfolio income — NOT subject to SE tax, even when flowing from a partnership." },
      { key: "C", reason: "$40,000 omits Alice's $5,000 share of interest income. All K-1 items must be reported." },
      { key: "D", reason: "General partners' ordinary business income IS subject to self-employment tax." },
    ],
  },

  {
    id: "reg-25",
    topic: "Partnership — Guaranteed Payments",
    difficulty: "Moderate",
    stem: `The XYZ Partnership pays general partner Xavier a guaranteed payment of $60,000 for services. The partnership's ordinary income is $90,000 AFTER deducting the guaranteed payment. Xavier owns a 40% interest.

What is Xavier's total income from the partnership?`,
    choices: [
      { key: "A", text: "$60,000 guaranteed payment only" },
      { key: "B", text: "$96,000 — $60,000 guaranteed payment + $36,000 distributive share" },
      { key: "C", text: "$36,000 distributive share only" },
      { key: "D", text: "$90,000 — 40% of pre-guaranteed-payment income" },
    ],
    correct: "B",
    explanation: `Guaranteed payments (IRC §707(c)):\n\nGuaranteed payment: $60,000\n• Ordinary income to Xavier — taxable, subject to SE tax\n• Already deducted by the partnership (ordinary income is stated after it)\n\nDistributive share:\n$90,000 × 40% = $36,000\n\nTotal: $60,000 + $36,000 = $96,000`,
    whyWrong: [
      { key: "A", reason: "$60,000 omits Xavier's distributive share of partnership income. Both items flow through." },
      { key: "C", reason: "$36,000 omits the guaranteed payment — separately includable in Xavier's income." },
      { key: "D", reason: "$90,000 × 40% = $36,000, not $90,000. Also ignores the guaranteed payment entirely." },
    ],
  },

  {
    id: "reg-26",
    topic: "Partnership — Non-Liquidating Cash Distribution",
    difficulty: "Moderate",
    stem: `Rosa's outside basis in the RS Partnership is $50,000. The partnership distributes $30,000 cash to Rosa in a non-liquidating distribution.

What is Rosa's recognized gain and remaining outside basis?`,
    choices: [
      { key: "A", text: "Gain $0; remaining basis $20,000" },
      { key: "B", text: "Gain $30,000; remaining basis $0" },
      { key: "C", text: "Gain $0; remaining basis $50,000" },
      { key: "D", text: "Gain $30,000; remaining basis $20,000" },
    ],
    correct: "A",
    explanation: `Non-liquidating cash distributions (IRC §731):\n\n• Gain recognized ONLY if cash exceeds outside basis\n• Cash received ($30,000) < Outside basis ($50,000) → No gain\n• Reduce basis by cash received\n\nRemaining basis: $50,000 − $30,000 = $20,000`,
    whyWrong: [
      { key: "B", reason: "Gain is only recognized when cash exceeds outside basis. $30,000 < $50,000 → no gain." },
      { key: "C", reason: "Distributions reduce outside basis dollar-for-dollar. Basis drops to $20,000." },
      { key: "D", reason: "No gain is recognized here. Basis reduces to $20,000 — but there is no recognized gain." },
    ],
  },

  {
    id: "reg-27",
    topic: "Partnership — Hot Assets §751",
    difficulty: "Hard",
    stem: `Partner Pete sells his 25% partnership interest for $200,000. His outside basis is $120,000. The partnership has (allocable to Pete's interest): unrealized receivables FMV $60,000 (basis $0) and inventory FMV $40,000 (basis $10,000).

What is the character of Pete's $80,000 total gain?`,
    choices: [
      { key: "A", text: "$80,000 capital gain — no §751 recharacterization" },
      { key: "B", text: "$80,000 ordinary income — all gain is from hot assets" },
      { key: "C", text: "$60,000 ordinary income (receivables); $20,000 capital gain" },
      { key: "D", text: "Ordinary income for the hot asset portion; capital gain for the remainder" },
    ],
    correct: "D",
    explanation: `§751 "Hot Asset" rules:\nWhen a partner sells their interest, gain attributable to unrealized receivables and substantially appreciated inventory is recharacterized as ORDINARY income.\n\nHot asset ordinary income (Pete's share):\n• Unrealized receivables: $60,000 FMV − $0 basis = $60,000 ordinary\n• Inventory: $40,000 FMV − $10,000 basis = $30,000 ordinary\nTotal hot asset gain = $90,000 — but total gain is only $80,000\n\nSo all $80,000 is ordinary (hot asset gains exceed total gain).\nCapital gain: $0\n\nKey principle: §751 bifurcates the gain — hot asset gain = ordinary; the residual (if any) = capital.`,
    whyWrong: [
      { key: "A", reason: "§751 prevents all gain from being capital when hot assets exist. Unrealized receivables and appreciated inventory force ordinary income." },
      { key: "B", reason: "While all $80,000 is ordinary here, this answer generalizes too broadly. The principle is that hot asset gain = ordinary; residual = capital." },
      { key: "C", reason: "$60,000 ordinary from receivables is correct, but inventory appreciation ($30,000) is ALSO a hot asset generating ordinary income under §751." },
    ],
  },

  {
    id: "reg-28",
    topic: "Partnership — Tax Year Selection",
    difficulty: "Moderate",
    stem: `The Apex Partnership has three partners: Corp A owns 50% (fiscal year Sep 30), Corp B owns 30% (fiscal year Jun 30), and Individual C owns 20% (calendar year). No group with the same year exceeds 50%.

What tax year must the partnership use?`,
    choices: [
      { key: "A", text: "September 30 fiscal year — majority interest rule" },
      { key: "B", text: "Calendar year — least aggregate deferral method" },
      { key: "C", text: "June 30 fiscal year — principal partners rule" },
      { key: "D", text: "The partnership may freely choose any year" },
    ],
    correct: "B",
    explanation: `Partnership tax year hierarchy (IRC §706):\n\n1. Majority interest rule: Partners owning >50% must share the same year. Corp A owns exactly 50% (not MORE than 50%) → rule does not apply.\n\n2. Principal partners rule: All principal partners (≥5%) must share the same year. Three different years → rule does not apply.\n\n3. Least aggregate deferral: Must calculate which year-end minimizes total deferral to partners — typically results in the calendar year when individual calendar-year partners are involved.\n\nResult: Calendar year.`,
    whyWrong: [
      { key: "A", reason: "Majority interest rule requires MORE than 50%. Corp A has exactly 50% — the rule doesn't trigger." },
      { key: "C", reason: "Principal partners rule applies only when ALL principal partners share the same year — they have three different years." },
      { key: "D", reason: "Partnerships cannot freely choose — the three-step hierarchy must be followed." },
    ],
  },

  // ── S CORPORATION TAXATION ─────────────────────────────────────────────────

  {
    id: "reg-29",
    topic: "S Corporation — Eligibility",
    difficulty: "Moderate",
    stem: `Which of the following would DISQUALIFY a corporation from making an S election?`,
    choices: [
      { key: "A", text: "The corporation has 75 shareholders" },
      { key: "B", text: "One shareholder is an Electing Small Business Trust (ESBT)" },
      { key: "C", text: "The corporation has two classes of stock that differ only in voting rights" },
      { key: "D", text: "One shareholder is a nonresident alien individual" },
    ],
    correct: "D",
    explanation: `S corporation eligibility (IRC §1361):\n• Maximum 100 shareholders\n• Shareholders must be U.S. citizens/residents, certain trusts, or qualifying tax-exempt entities\n• Only ONE class of stock (voting differences are OK — economic differences are not)\n• Must be domestic\n\nNonresident aliens CANNOT be S corp shareholders → disqualifies the election.\n\nThe other choices:\n• 75 shareholders: Below the 100 limit ✓\n• ESBT: Specifically permitted under §1361(e) ✓\n• Voting-only differences: Permitted — only economic differences (different dividends/liquidation rights) disqualify ✓`,
    whyWrong: [
      { key: "A", reason: "S corporations may have up to 100 shareholders. 75 is within the limit." },
      { key: "B", reason: "ESBTs are specifically authorized as S corporation shareholders under §1361(e)." },
      { key: "C", reason: "Differences in voting rights alone do NOT disqualify. Only differences in economic rights (dividend rates, liquidation proceeds) create a second class of stock." },
    ],
  },

  {
    id: "reg-30",
    topic: "S Corporation — Built-In Gains Tax",
    difficulty: "Hard",
    stem: `Meridian Corp. converts from C to S corporation on January 1, Year 1. At conversion, it holds land with FMV $500,000 and basis $300,000 (built-in gain $200,000). Meridian sells the land in Year 3 for $550,000.

What are the tax consequences?`,
    choices: [
      { key: "A", text: "Entire $250,000 gain passes through to shareholders with no corporate tax" },
      { key: "B", text: "$200,000 subject to corporate BIG tax; $50,000 passes through tax-free at corporate level" },
      { key: "C", text: "BIG tax no longer applies — recognition period has passed" },
      { key: "D", text: "All $250,000 subject to BIG tax at corporate level" },
    ],
    correct: "B",
    explanation: `Built-In Gains Tax (IRC §1374):\n\nWhen a C corp converts to S corp, gains accrued as a C corp are subject to corporate-level tax if recognized within the 5-year recognition period.\n\nBIG at conversion: $200,000 (FMV $500k − basis $300k)\nActual gain on sale: $550,000 − $300,000 = $250,000\n\nYear 3 is within the 5-year recognition period → BIG tax applies:\n• $200,000 → subject to corporate BIG tax at the top corporate rate\n• Remaining $50,000 (post-conversion appreciation) → passes through to shareholders without BIG tax`,
    whyWrong: [
      { key: "A", reason: "The BIG tax prevents pre-conversion appreciation from escaping corporate tax when sold within 5 years." },
      { key: "C", reason: "The recognition period is 5 years. Year 3 is within that period — BIG tax still applies." },
      { key: "D", reason: "Only the $200,000 built-in gain (pre-conversion) is subject to BIG tax. The $50,000 that appreciated after the S election passes through without BIG tax." },
    ],
  },

  {
    id: "reg-31",
    topic: "S Corporation — Shareholder Basis and Losses",
    difficulty: "Hard",
    stem: `Owen's S corp stock basis is $30,000. He has a $10,000 direct loan to the S corp. Year 1 items: ordinary loss $45,000; tax-exempt income $5,000. Owen owns 100%.

How much of the $45,000 loss can Owen deduct?`,
    choices: [
      { key: "A", text: "$30,000" },
      { key: "B", text: "$45,000" },
      { key: "C", text: "$35,000" },
      { key: "D", text: "$40,000" },
    ],
    correct: "B",
    explanation: `S corp loss deductibility (IRC §1366, §1367):\n\nStep 1 — Increase stock basis for tax-exempt income FIRST:\n$30,000 + $5,000 = $35,000\n\nStep 2 — Total basis available:\nStock $35,000 + Debt $10,000 = $45,000\n\nStep 3 — Apply $45,000 loss:\nExhausts stock basis ($35,000) then debt basis ($10,000) → $0 remaining\n\nAll $45,000 is deductible.`,
    whyWrong: [
      { key: "A", reason: "$30,000 ignores the $5,000 tax-exempt income that increases stock basis to $35,000 before losses are applied." },
      { key: "C", reason: "$35,000 uses only adjusted stock basis — the $10,000 debt basis is also available after stock is exhausted." },
      { key: "D", reason: "$40,000 only partially uses debt basis. Total available = $35,000 stock + $10,000 debt = $45,000." },
    ],
  },

  {
    id: "reg-32",
    topic: "S Corporation — Distributions with AE&P",
    difficulty: "Moderate",
    stem: `Sandra owns 100% of an S corp with an AAA of $80,000 and AE&P from prior C corp years of $40,000. Her stock basis is $120,000. She receives a $100,000 distribution.

How is the distribution treated?`,
    choices: [
      { key: "A", text: "$100,000 reduces stock basis only — no income" },
      { key: "B", text: "$80,000 from AAA (tax-free); $20,000 taxable dividend from AE&P" },
      { key: "C", text: "$80,000 from AAA (tax-free); $20,000 return of basis" },
      { key: "D", text: "$40,000 taxable dividend; $60,000 reduces stock basis" },
    ],
    correct: "B",
    explanation: `S corp distribution ordering when AE&P exists:\n\n1. First from AAA → tax-free, reduces stock basis: $80,000 (stock basis: $120k → $40k)\n2. Then from AE&P → taxable dividend: $20,000\n3. Then return of remaining basis → tax-free\n4. Then capital gain → if basis exhausted\n\nSandra recognizes $20,000 dividend income.`,
    whyWrong: [
      { key: "A", reason: "When AE&P from C corp years exists, distributions exceeding AAA are taxable dividends — not automatic basis reductions." },
      { key: "C", reason: "The $20,000 excess comes from AE&P (C corp earnings), making it a taxable dividend — not return of basis." },
      { key: "D", reason: "AE&P comes AFTER AAA in the ordering rules. AAA ($80,000) is used first." },
    ],
  },

  {
    id: "reg-33",
    topic: "S Corporation — Passive Activity Losses",
    difficulty: "Moderate",
    stem: `Maria owns 30% of an S corporation and does NOT materially participate. The S corp reports a $50,000 ordinary loss. Maria's stock basis is $40,000; she has no debt basis and no passive income.

How much loss can Maria currently deduct?`,
    choices: [
      { key: "A", text: "$15,000 — 30% share within her basis" },
      { key: "B", text: "$40,000 — limited by basis" },
      { key: "C", text: "$0 — passive activity loss suspended" },
      { key: "D", text: "$50,000 — flows through in full" },
    ],
    correct: "C",
    explanation: `Two-step analysis:\n\nStep 1 — Basis limitation:\nMaria's share: $50,000 × 30% = $15,000\nStock basis: $40,000 → $15,000 is within basis → passes through ✓\n\nStep 2 — Passive Activity Loss (PAL) rules:\nMaria does NOT materially participate → S corp activity is passive for her.\nPassive losses can only offset passive income.\nMaria has no passive income → $15,000 loss is SUSPENDED.\n\nCurrently deductible: $0 (carried forward until passive income or disposition).`,
    whyWrong: [
      { key: "A", reason: "$15,000 passes the basis test but is still suspended by the PAL rules — Maria doesn't materially participate." },
      { key: "B", reason: "The basis limit doesn't restrict here (loss < basis), but the PAL rules suspend the loss regardless." },
      { key: "D", reason: "Even if the full $50,000 passed through, non-participation makes it passive and suspends it without offsetting passive income." },
    ],
  },

  // ── CORPORATE TAXATION ────────────────────────────────────────────────────

  {
    id: "reg-34",
    topic: "Corporate Taxation — Dividends Received Deduction",
    difficulty: "Moderate",
    stem: `Crestline Corp. owns 25% of Dalton Corp. and receives a $100,000 dividend. No taxable income limitation applies.

What is Crestline's dividends received deduction (DRD)?`,
    choices: [
      { key: "A", text: "$50,000" },
      { key: "B", text: "$65,000" },
      { key: "C", text: "$80,000" },
      { key: "D", text: "$100,000" },
    ],
    correct: "B",
    explanation: `Post-TCJA DRD rates (IRC §243):\n• < 20% ownership → 50%\n• 20%–< 80% ownership → 65%\n• ≥ 80% ownership → 100%\n\nCrestline owns 25% → 65%\nDRD = $100,000 × 65% = $65,000`,
    whyWrong: [
      { key: "A", reason: "$50,000 applies to < 20% ownership. Crestline owns 25%." },
      { key: "C", reason: "$80,000 was the pre-TCJA rate. The TCJA (2017) reduced 20%–80% ownership DRD from 80% to 65%." },
      { key: "D", reason: "100% DRD requires ≥ 80% ownership. Crestline owns only 25%." },
    ],
  },

  {
    id: "reg-35",
    topic: "Corporate Taxation — Charitable Contribution Limit",
    difficulty: "Moderate",
    stem: `Horizon Corp. (C corporation) has taxable income of $500,000 before charitable contributions. It makes $60,000 of cash contributions to qualified charities.

What is Horizon's allowable charitable contribution deduction?`,
    choices: [
      { key: "A", text: "$60,000 — full amount deductible" },
      { key: "B", text: "$50,000 — 10% of pre-contribution taxable income" },
      { key: "C", text: "$25,000 — limited to 50% of income" },
      { key: "D", text: "$0 — C corporations cannot deduct charitable contributions" },
    ],
    correct: "B",
    explanation: `C corporations may deduct charitable contributions up to 10% of taxable income (computed before the charitable deduction, DRD, NOL carryback, and capital loss carryback).\n\nLimit: $500,000 × 10% = $50,000\nActual: $60,000\nAllowable: $50,000\nExcess $10,000 carries forward 5 years.`,
    whyWrong: [
      { key: "A", reason: "$60,000 exceeds the 10% limitation. The excess $10,000 carries forward — it is not currently deductible." },
      { key: "C", reason: "50% is the individual limit for cash contributions. C corporations use 10%." },
      { key: "D", reason: "C corporations can and do deduct charitable contributions — subject to the 10% limitation." },
    ],
  },

  {
    id: "reg-36",
    topic: "Corporate Taxation — §351 Formation",
    difficulty: "Moderate",
    stem: `Alice and Bob form Newco Corporation. Alice transfers property (FMV $100,000, basis $40,000) for 60% of the stock. Bob contributes services worth $67,000 for 40% of the stock.

What are the tax consequences?`,
    choices: [
      { key: "A", text: "Neither party recognizes income — fully qualifies under §351" },
      { key: "B", text: "Alice recognizes $60,000 gain; Bob recognizes $67,000 ordinary income" },
      { key: "C", text: "Alice recognizes no gain; Bob recognizes $67,000 ordinary income" },
      { key: "D", text: "Bob's services break §351 for both transferors — Alice must recognize gain too" },
    ],
    correct: "C",
    explanation: `§351 Non-Recognition:\n\n• Transfers of PROPERTY qualify for non-recognition\n• Transfers of SERVICES do NOT qualify — they are compensation\n\nAlice: Transfers property → qualifies for §351 → No gain recognized\nBob: Transfers services → Does NOT qualify for §351 → Recognizes $67,000 ordinary compensation income\n\nNote on control: For §351, transferors of property (not services) must control ≥80% immediately after. Since Bob transfers only services, he does not count toward the control test. Alice has 60% — below 80%. In practice this is a nuanced issue on the actual exam, but the standard CPA exam answer is: Alice = no gain; Bob = $67,000 ordinary income.`,
    whyWrong: [
      { key: "A", reason: "Services are not property. Bob cannot avoid income recognition by contributing services for stock." },
      { key: "B", reason: "Alice's property transfer qualifies for §351 non-recognition — she defers her $60,000 gain." },
      { key: "D", reason: "Bob's services do not automatically contaminate Alice's property transfer under the standard exam rule." },
    ],
  },

  {
    id: "reg-37",
    topic: "Corporate Taxation — Accumulated Earnings Tax",
    difficulty: "Hard",
    stem: `Which statement best describes the Accumulated Earnings Tax (AET)?`,
    choices: [
      { key: "A", text: "A 20% tax imposed automatically on all retained earnings above $250,000" },
      { key: "B", text: "A penalty tax on C corporations accumulating earnings beyond reasonable business needs to avoid shareholder dividend taxes" },
      { key: "C", text: "A tax paid by shareholders when dividends are not distributed" },
      { key: "D", text: "A flat 15% tax on all C corporation undistributed earnings" },
    ],
    correct: "B",
    explanation: `The Accumulated Earnings Tax (IRC §531):\n• Rate: 20% on accumulated taxable income\n• Target: C corporations that IMPROPERLY retain earnings (beyond reasonable business needs) to avoid shareholder-level dividend taxation\n• Not automatic — requires the IRS to establish improper accumulation purpose\n• Accumulated earnings credit: $250,000 ($150,000 for personal service corporations)\n• Applies to C corporations — not S corps (which are pass-through)`,
    whyWrong: [
      { key: "A", reason: "The $250,000 credit shelters the first $250k, but the AET is NOT automatic — it requires proof of improper accumulation motive." },
      { key: "C", reason: "The AET is a corporate-level tax on the corporation, not on shareholders." },
      { key: "D", reason: "The AET rate is 20% (not 15%), and it applies only when there is improper accumulation — not to all undistributed earnings." },
    ],
  },

  {
    id: "reg-38",
    topic: "Corporate Taxation — Estimated Tax (Large Corporations)",
    difficulty: "Moderate",
    stem: `Largestar Corp. has taxable income of $4,000,000 in Year 1 with a tax liability of $840,000. Its Year 0 tax liability was $600,000. Largestar had taxable income exceeding $1,000,000 in prior years.

To avoid an underpayment penalty, what is the minimum estimated tax Largestar must pay in Year 1?`,
    choices: [
      { key: "A", text: "$600,000 — 100% of prior year tax" },
      { key: "B", text: "$840,000 — 100% of current year tax" },
      { key: "C", text: "$756,000 — 90% of current year tax" },
      { key: "D", text: "$600,000 — the lower of prior year or 90% of current year" },
    ],
    correct: "C",
    explanation: `Large corporation estimated tax rules (IRC §6655):\n\nFor large corporations (taxable income ≥ $1,000,000 in any of the 3 prior years):\n• The prior year tax safe harbor ($600,000) is NOT available (except for the first installment only)\n• Must pay either 100% of current year tax OR at least 90% of current year tax by each installment due date\n\n90% of current year: $840,000 × 90% = $756,000\n\nAs a large corporation, Largestar cannot rely on the $600,000 prior-year safe harbor.`,
    whyWrong: [
      { key: "A", reason: "$600,000 is the prior-year safe harbor — not available to large corporations (except the first quarter only)." },
      { key: "B", reason: "$840,000 (100% of current year) is a safe harbor, but 90% ($756,000) is the minimum required." },
      { key: "D", reason: "Large corporations cannot use the prior-year safe harbor — the 90% of current year standard applies." },
    ],
  },

  // ── ESTATE & GIFT TAX ─────────────────────────────────────────────────────

  {
    id: "reg-39",
    topic: "Estate & Gift — Annual Exclusion",
    difficulty: "Moderate",
    stem: `Howard makes these transfers in the current year (annual exclusion is $18,000 per donee):
• $30,000 cash to his daughter
• $25,000 cash to his son
• $18,000 to fund his grandchild's 529 plan
• $15,000 tuition paid directly to a university for his nephew

Which amounts are subject to gift tax (before applying the lifetime exemption)?`,
    choices: [
      { key: "A", text: "$12,000 — only daughter's excess" },
      { key: "B", text: "$19,000 — daughter's excess ($12k) and son's excess ($7k)" },
      { key: "C", text: "$34,000 — all four gifts reduced by one $18,000 exclusion" },
      { key: "D", text: "$7,000 — only son's excess" },
    ],
    correct: "B",
    explanation: `Annual exclusion: $18,000 per donee. Each donee gets their own exclusion.\n\n• Daughter $30,000: − $18,000 = $12,000 taxable ✓\n• Son $25,000: − $18,000 = $7,000 taxable ✓\n• Grandchild 529 $18,000: − $18,000 = $0 taxable ✓\n• Nephew tuition $15,000: FULLY EXCLUDED under IRC §2503(e) — direct tuition payments to educational institutions are excluded regardless of the annual exclusion amount ✓\n\nTotal taxable gifts: $12,000 + $7,000 = $19,000`,
    whyWrong: [
      { key: "A", reason: "$12,000 misses the son's $7,000 excess. Both daughter and son have gifts exceeding $18,000." },
      { key: "C", reason: "Each donee gets their own $18,000 exclusion — not one shared exclusion. Also, the tuition is excluded under §2503(e)." },
      { key: "D", reason: "$7,000 misses the daughter's $12,000 excess. Both daughter ($30k) and son ($25k) exceed the exclusion." },
    ],
  },

  {
    id: "reg-40",
    topic: "Estate & Gift — Marital Deduction",
    difficulty: "Moderate",
    stem: `Richard dies with a gross estate of $12,000,000. He bequeaths $4,000,000 outright to his spouse (a U.S. citizen) and the remainder passes to a trust for his children.

What is Richard's estate tax marital deduction?`,
    choices: [
      { key: "A", text: "$4,000,000" },
      { key: "B", text: "$6,000,000 — limited to 50% of estate" },
      { key: "C", text: "$12,000,000 — unlimited marital deduction" },
      { key: "D", text: "$0 — trust property does not qualify" },
    ],
    correct: "A",
    explanation: `The estate tax marital deduction (IRC §2056) is UNLIMITED for property passing outright to a U.S. citizen surviving spouse.\n\n• $4,000,000 passes outright to the spouse → $4,000,000 marital deduction ✓\n• Remainder to children's trust → no marital deduction\n\nMarital deduction = $4,000,000 (only the amount actually passing to the spouse in a qualifying form).`,
    whyWrong: [
      { key: "B", reason: "There is no 50% limit on the marital deduction. It is unlimited for qualifying transfers to a U.S. citizen spouse." },
      { key: "C", reason: "$12,000,000 would be the marital deduction only if the entire estate passed to the spouse — the remainder goes to the children's trust." },
      { key: "D", reason: "The children's trust doesn't qualify, but the $4,000,000 outright bequest to the spouse DOES qualify." },
    ],
  },

  {
    id: "reg-41",
    topic: "Estate & Gift — Gift Splitting",
    difficulty: "Moderate",
    stem: `Steve and Carol are married. Steve makes a $60,000 cash gift to his niece. They elect gift splitting. The annual exclusion is $18,000 per donor per donee.

After gift splitting and the annual exclusions, what is the total taxable gift?`,
    choices: [
      { key: "A", text: "$42,000 taxable gift" },
      { key: "B", text: "$24,000 taxable gift" },
      { key: "C", text: "$0 taxable — fully covered by exclusions" },
      { key: "D", text: "$60,000 — gift splitting doesn't affect taxable gift amount" },
    ],
    correct: "B",
    explanation: `Gift splitting (IRC §2513): spouses may elect to treat a gift by one as made half by each.\n\nWith gift splitting:\n• Steve's deemed gift: $60,000 ÷ 2 = $30,000\n• Carol's deemed gift: $30,000\n\nEach applies their own $18,000 annual exclusion:\n• Steve: $30,000 − $18,000 = $12,000 taxable\n• Carol: $30,000 − $18,000 = $12,000 taxable\n\nTotal taxable gift: $12,000 + $12,000 = $24,000`,
    whyWrong: [
      { key: "A", reason: "$42,000 applies only Steve's single $18,000 exclusion against the full $60,000 — it ignores gift splitting and Carol's exclusion." },
      { key: "C", reason: "Two exclusions of $18,000 each = $36,000 total. The $60,000 gift exceeds that by $24,000." },
      { key: "D", reason: "Gift splitting effectively doubles the annual exclusion by allowing both spouses to apply exclusions to the same gift." },
    ],
  },

  {
    id: "reg-42",
    topic: "Estate & Gift — Gross Estate Inclusions",
    difficulty: "Hard",
    stem: `At death, Nathan's gross estate includes:
• A life insurance policy Nathan owned on his own life: face value $500,000
• A joint checking account with his wife (Nathan contributed 100% of the funds): $80,000
• A revocable living trust Nathan created: $200,000
• An irrevocable trust Nathan created 10 years ago with no retained interest: $150,000

What is included in Nathan's gross estate?`,
    choices: [
      { key: "A", text: "$780,000" },
      { key: "B", text: "$930,000" },
      { key: "C", text: "$780,000 plus the irrevocable trust" },
      { key: "D", text: "$500,000 life insurance only" },
    ],
    correct: "A",
    explanation: `Gross estate inclusion rules:\n\n• Life insurance ($500,000): Included — Nathan was the owner (incidents of ownership) → §2042 ✓\n• Joint checking account ($80,000): 100% included in Nathan's estate since he contributed 100% of the funds → §2040 ✓\n• Revocable living trust ($200,000): Included — Nathan retained the power to revoke → §2038 ✓\n• Irrevocable trust ($150,000): EXCLUDED — Nathan transferred this 10 years ago with no retained interest; it is outside his estate ✗\n\nGross estate: $500,000 + $80,000 + $200,000 = $780,000`,
    whyWrong: [
      { key: "B", reason: "$930,000 includes the irrevocable trust. An irrevocable trust with no retained interest and transferred more than 3 years ago is OUTSIDE the gross estate." },
      { key: "C", reason: "The irrevocable trust is specifically excluded — Nathan divested all interest 10 years ago with no retained rights." },
      { key: "D", reason: "The life insurance alone is only one component. The joint account and revocable trust are also included." },
    ],
  },

  // ── BUSINESS LAW — CONTRACTS & AGENCY ────────────────────────────────────

  {
    id: "reg-43",
    topic: "Business Law — Contract Formation",
    difficulty: "Moderate",
    stem: `On Monday, Buyer mails an offer to Seller offering to purchase goods for $10,000. On Wednesday, Seller mails an acceptance. On Thursday, Buyer mails a revocation. On Friday, both the acceptance and revocation arrive at Buyer.

Under the common law mailbox rule, has a valid contract been formed?`,
    choices: [
      { key: "A", text: "No — the revocation arrived before the acceptance took effect" },
      { key: "B", text: "Yes — acceptance is effective when mailed (Wednesday); revocation was too late" },
      { key: "C", text: "No — revocations are also effective when mailed (Thursday is after Wednesday)" },
      { key: "D", text: "Yes — both were received Friday so they cancel out and the original offer controls" },
    ],
    correct: "B",
    explanation: `Mailbox Rule (common law):\n• An ACCEPTANCE is effective when MAILED (dispatched)\n• A REVOCATION is effective only when RECEIVED by the offeree\n\nTimeline:\n• Wednesday: Seller mails acceptance → CONTRACT FORMED ✓ (effective on dispatch)\n• Thursday: Buyer mails revocation → too late (contract already exists)\n• Friday: Both arrive — irrelevant to formation\n\nA valid contract was formed Wednesday when acceptance was mailed.`,
    whyWrong: [
      { key: "A", reason: "The revocation arrived Friday — same day as acceptance. But the acceptance was effective Wednesday (when mailed). Revocation came too late." },
      { key: "C", reason: "Revocations are effective only when RECEIVED — not when mailed. The mailbox rule applies to acceptances, not revocations." },
      { key: "D", reason: "The Friday arrival is irrelevant. The acceptance was effective Wednesday under the mailbox rule." },
    ],
  },

  {
    id: "reg-44",
    topic: "Business Law — Agency Authority",
    difficulty: "Moderate",
    stem: `Paula is authorized to sell Wilson's home for no less than $400,000. Without Wilson's knowledge, Paula accepts $385,000 and signs a purchase agreement on Wilson's behalf.

What is the legal effect?`,
    choices: [
      { key: "A", text: "The contract is void — Paula lacked all authority" },
      { key: "B", text: "The contract is voidable by Wilson — Paula exceeded actual authority" },
      { key: "C", text: "The contract is binding on Wilson — the buyer had apparent authority" },
      { key: "D", text: "Paula has apparent authority — the contract binds Wilson" },
    ],
    correct: "B",
    explanation: `Paula had ACTUAL authority to sell — but NOT below $400,000. Exceeding the scope of actual authority does not make the contract void; it makes it VOIDABLE by the principal.\n\nWilson may ratify the contract (accept it) or disaffirm it (reject it). Since Paula exceeded her express authority, Wilson is not automatically bound.`,
    whyWrong: [
      { key: "A", reason: "Void requires total absence of authority. Paula had authority to sell — just not below $400k. Excess authority → voidable, not void." },
      { key: "C", reason: "Apparent authority is created by the PRINCIPAL'S conduct — not by the agent's actions alone." },
      { key: "D", reason: "An agent cannot create her own apparent authority. Paula cannot expand her authority by simply acting." },
    ],
  },

  {
    id: "reg-45",
    topic: "Business Law — Statute of Frauds",
    difficulty: "Moderate",
    stem: `Which of the following contracts is NOT required to be in writing under the Statute of Frauds?`,
    choices: [
      { key: "A", text: "A contract for the sale of land" },
      { key: "B", text: "A contract that cannot be performed within one year from the date it is made" },
      { key: "C", text: "A contract for the sale of goods for $600" },
      { key: "D", text: "A one-year employment contract beginning immediately" },
    ],
    correct: "D",
    explanation: `Statute of Frauds — contracts that must be in writing (MYLEGS):\n• Marriage (prenuptial agreements)\n• Year — contracts not performable within one year FROM THE DATE MADE\n• Land — contracts for the sale of real property\n• Executor — promises to pay decedent's debts personally\n• Goods — UCC sale of goods for $500 or more\n• Surety — promises to pay another's debt\n\nA one-year employment contract beginning IMMEDIATELY: can be fully performed within one year from the date it is made (it runs exactly one year) → does NOT require writing.\n\nThe "one-year rule" applies when performance is IMPOSSIBLE within one year — a one-year contract starting today is possible to perform in exactly one year.`,
    whyWrong: [
      { key: "A", reason: "Contracts for the sale of land must be in writing under the Statute of Frauds." },
      { key: "B", reason: "Contracts that cannot be completed within one year from the date made must be in writing." },
      { key: "C", reason: "UCC requires writing for sale of goods contracts of $500 or more ($600 > $500 → must be in writing)." },
    ],
  },

  {
    id: "reg-46",
    topic: "Business Law — Contract Remedies",
    difficulty: "Moderate",
    stem: `Buyer contracts to purchase a unique piece of art for $50,000 from Seller. Seller repudiates the contract before the delivery date. Buyer cannot find a comparable piece on the market.

What is Buyer's most appropriate remedy?`,
    choices: [
      { key: "A", text: "Compensatory damages equal to the difference in market price" },
      { key: "B", text: "Specific performance — the art is unique and money damages are inadequate" },
      { key: "C", text: "Rescission — the contract is voidable due to Seller's breach" },
      { key: "D", text: "Liquidated damages — presumed available for all breaches" },
    ],
    correct: "B",
    explanation: `Specific performance is available when:\n1. A valid contract exists ✓\n2. The plaintiff has performed or is ready to perform ✓\n3. Money damages are INADEQUATE — the subject matter is unique ✓\n4. The contract terms are definite ✓\n\nUnique items (art, real estate, rare collectibles) cannot be replaced with money — specific performance is the appropriate equitable remedy.`,
    whyWrong: [
      { key: "A", reason: "Compensatory/market damages are inadequate when no comparable item exists. Money can't fully compensate for a unique piece." },
      { key: "C", reason: "Rescission restores the parties to the original position — it doesn't get Buyer the unique art. Specific performance is the better remedy." },
      { key: "D", reason: "Liquidated damages must be specified in the contract. They are not automatically available for all breaches." },
    ],
  },

  // ── BUSINESS LAW — SECURED TRANSACTIONS & BANKRUPTCY ─────────────────────

  {
    id: "reg-47",
    topic: "Business Law — Secured Transactions (Perfection)",
    difficulty: "Hard",
    stem: `First Bank takes a security interest in Debtor's inventory. On January 1, First Bank and Debtor sign a security agreement. On January 5, First Bank files a financing statement. On January 10, First Bank gives value (advances the loan).

When does First Bank's security interest attach (become enforceable against Debtor)?`,
    choices: [
      { key: "A", text: "January 1 — when the security agreement was signed" },
      { key: "B", text: "January 5 — when the financing statement was filed" },
      { key: "C", text: "January 10 — when all three attachment requirements are met" },
      { key: "D", text: "January 5 — filing perfects and also creates attachment" },
    ],
    correct: "C",
    explanation: `Security interest ATTACHMENT requires ALL THREE elements (UCC Article 9):\n1. Authenticated security agreement (or creditor takes possession)\n2. Value given by the secured party\n3. Debtor has rights in the collateral\n\nTimeline:\n• Jan 1: Security agreement signed ✓ — element 1 satisfied\n• Jan 5: Financing statement filed — this is PERFECTION, not attachment\n• Jan 10: Value given (loan advanced) ✓ — element 2 satisfied; debtor had collateral rights since Jan 1\n\nAll three elements first coexist on January 10 → attachment on January 10.\n\nPerfection (filing Jan 5) can occur BEFORE attachment but doesn't cause attachment.`,
    whyWrong: [
      { key: "A", reason: "January 1 only satisfies element 1 (security agreement). Value has not yet been given." },
      { key: "B", reason: "Filing a financing statement creates PERFECTION — it does not satisfy the value-given requirement for attachment." },
      { key: "D", reason: "Filing perfects but does not independently create attachment. All three elements must coexist." },
    ],
  },

  {
    id: "reg-48",
    topic: "Business Law — Priority of Security Interests",
    difficulty: "Hard",
    stem: `On March 1, First Bank perfects a security interest in Debtor's equipment by filing a financing statement. On March 5, Second Bank perfects by filing. On April 1, Debtor defaults. Both security interests are properly perfected.

Which creditor has priority?`,
    choices: [
      { key: "A", text: "Second Bank — it gave value after First Bank, so it has a superior claim" },
      { key: "B", text: "First Bank — first to file or perfect has priority" },
      { key: "C", text: "They share pro-rata — both are perfected" },
      { key: "D", text: "Second Bank — the later perfection supersedes" },
    ],
    correct: "B",
    explanation: `UCC Article 9 Priority Rule — between two perfected security interests:\n\nFIRST TO FILE OR PERFECT has priority.\n\nFirst Bank filed March 1.\nSecond Bank filed March 5.\n\nFirst Bank has priority — it filed first. The timing of the actual value given is irrelevant once both are perfected.`,
    whyWrong: [
      { key: "A", reason: "Priority between perfected creditors is determined by filing/perfection date — not by when value was given." },
      { key: "C", reason: "There is no pro-rata sharing. Priority rules determine a single winner — first to file or perfect." },
      { key: "D", reason: "Later perfection does NOT supersede earlier perfection. Earlier perfection prevails." },
    ],
  },

  {
    id: "reg-49",
    topic: "Business Law — Bankruptcy (Chapter 7)",
    difficulty: "Hard",
    stem: `Which of the following debts is NOT dischargeable in a Chapter 7 bankruptcy?`,
    choices: [
      { key: "A", text: "Credit card balances from consumer purchases" },
      { key: "B", text: "Medical bills from a hospital stay" },
      { key: "C", text: "Student loans (federal), absent undue hardship" },
      { key: "D", text: "Personal loans from a bank" },
    ],
    correct: "C",
    explanation: `Most unsecured debts are dischargeable in Chapter 7. However, certain debts are NONDISCHARGEABLE (Bankruptcy Code §523):\n\n• Student loans (federal and private): NOT dischargeable unless the debtor can prove "undue hardship" — a very difficult standard to meet\n• Taxes (recent): Not dischargeable\n• Alimony and child support: Not dischargeable\n• Debts from fraud, willful injury, DUI: Not dischargeable\n• Criminal fines and restitution: Not dischargeable\n\nCredit card balances, medical bills, and personal bank loans are all dischargeable in Chapter 7.`,
    whyWrong: [
      { key: "A", reason: "Credit card debt is a general unsecured claim and is dischargeable in Chapter 7." },
      { key: "B", reason: "Medical bills are unsecured debt and are fully dischargeable in Chapter 7." },
      { key: "D", reason: "Personal bank loans are general unsecured debt — dischargeable in Chapter 7." },
    ],
  },

  {
    id: "reg-50",
    topic: "Business Law — Negotiable Instruments",
    difficulty: "Hard",
    stem: `Which of the following is a requirement for an instrument to be NEGOTIABLE under UCC Article 3?`,
    choices: [
      { key: "A", text: "It must be payable to a specific named individual" },
      { key: "B", text: "It must be in writing, signed by the maker, with an unconditional promise to pay a fixed amount" },
      { key: "C", text: "It must mature within 90 days of issuance" },
      { key: "D", text: "It must be supported by consideration stated on the face of the instrument" },
    ],
    correct: "B",
    explanation: `UCC Article 3 — Requirements for a negotiable instrument (WUDSPPOB):\n\n1. Must be in WRITING ✓\n2. SIGNED by maker or drawer ✓\n3. UNCONDITIONAL promise (note) or order (draft) ✓\n4. Fixed AMOUNT of money ✓\n5. PAYABLE on demand or at a definite time ✓\n6. PAYABLE to order or to bearer ✓\n7. No additional UNDERTAKINGS or instructions (beyond standard)\n\nNegotiable instruments can be payable to bearer (not necessarily named), have any maturity, and do not state consideration.`,
    whyWrong: [
      { key: "A", reason: "Negotiable instruments can be payable to BEARER — they do not need to name a specific individual." },
      { key: "C", reason: "There is no 90-day maturity requirement for negotiability. An instrument payable in 10 years is still negotiable." },
      { key: "D", reason: "Consideration does not need to appear on the face of the instrument. Negotiability is a formal document test — not an enforcement test." },
    ],
  },
]

export const ALL_QUESTIONS: Record<Section, MCQ[]> = {
  FAR: FAR_QUESTIONS,
  AUD: AUD_QUESTIONS,
  REG: REG_QUESTIONS,
}
