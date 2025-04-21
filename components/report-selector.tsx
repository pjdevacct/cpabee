"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export type ReportType = "AUD" | "FAR" | "REG" | "TCP" | "ISC" | "BAR"

interface ReportSelectorProps {
  onSelect: (report: ReportType) => void
  selectedReport: ReportType | null
  disabled?: boolean
}

export default function ReportSelector({ onSelect, selectedReport, disabled = false }: ReportSelectorProps) {
  const reports = [
    { id: "AUD", name: "Auditing and Attestation", description: "Core section required for all candidates" },
    { id: "FAR", name: "Financial Accounting and Reporting", description: "Core section required for all candidates" },
    { id: "REG", name: "Taxation and Regulation", description: "Core section required for all candidates" },
    { id: "TCP", name: "Tax Compliance and Planning", description: "Discipline section (choose one)" },
    { id: "ISC", name: "Information Systems and Control", description: "Discipline section (choose one)" },
    { id: "BAR", name: "Business Analysis and Reporting", description: "Discipline section (choose one)" },
  ]

  return (
    <RadioGroup
      value={selectedReport || ""}
      onValueChange={(value) => onSelect(value as ReportType)}
      className="space-y-3"
      disabled={disabled}
    >
      {reports.map((report) => (
        <div
          key={report.id}
          className={`flex items-center space-x-2 border rounded-lg p-3 ${
            selectedReport === report.id ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
          } ${disabled ? "opacity-60" : "hover:border-yellow-300 cursor-pointer"}`}
          onClick={() => !disabled && onSelect(report.id as ReportType)}
        >
          <RadioGroupItem value={report.id} id={report.id} className="text-yellow-500" />
          <div className="flex-1">
            <Label htmlFor={report.id} className="text-base font-medium cursor-pointer">
              {report.id} - {report.name}
            </Label>
            <p className="text-sm text-gray-500">{report.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  )
}
