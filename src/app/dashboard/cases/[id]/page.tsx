"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download } from "lucide-react";

// Status badge component copied from the cases list page
function StatusBadge({ status }: { status: string }) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    "New": { bg: "bg-slate-400", text: "text-white" },
    "In Progress": { bg: "bg-orange-400", text: "text-white" },
    "In Review": { bg: "bg-yellow-400", text: "text-white" },
    "Completed": { bg: "bg-green-500", text: "text-white" },
    "No Action": { bg: "bg-gray-300", text: "text-white" },
    "Closed": { bg: "bg-red-500", text: "text-white" },
  };

  const style = statusColors[status] || { bg: "bg-gray-200", text: "text-gray-700" };

  return (
    <div className={`flex items-center gap-2 rounded-full px-3 py-1 ${style.bg} ${style.text} text-sm font-medium`}>
      <div className="h-2 w-2 rounded-full bg-current"></div>
      <span>{status}</span>
    </div>
  );
}

// Type for case data
type CaseData = {
  id: string;
  title: string;
  submitter: string;
  subCategory: string;
  assignee: string;
  createdOn: string;
  status: string;
  description?: string;
  notes?: string[];
  attachments?: { name: string; size: string; type: string }[];
  category?: string;
};

// Mock data function that would normally fetch from API
function getMockCaseById(id: string): CaseData {
  return {
    id,
    title: "Sales Strategy Overview",
    submitter: "Nguyễn Thị Mai",
    subCategory: "Competitor information",
    assignee: "N/A",
    createdOn: "2025-02-11T08:45:00",
    status: "New",
    description: "This is a detailed report on our competitor's latest sales strategy. The information was gathered from public sources and market analysis.",
    category: "Opportunity",
    notes: [
      "Initial report submitted by field team",
      "Additional information needed about pricing structure",
      "Recommended to share with sales department"
    ],
    attachments: [
      { name: "competitor_analysis.pdf", size: "2.3 MB", type: "PDF" },
      { name: "market_data.xlsx", size: "1.1 MB", type: "Excel" }
    ]
  };
}

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const caseData = getMockCaseById(params.id);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm - dd/MM/yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{caseData.title}</h2>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground">ID: {caseData.id}</p>
            {caseData.category && (
              <div className="flex items-center gap-2">
                <span>•</span>
                <div className={`h-3 w-3 rounded-md ${caseData.category === "Opportunity" ? "bg-green-600" : "bg-gray-500"}`}></div>
                <span className="text-muted-foreground">{caseData.category}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button className="bg-gradient-to-b from-[#B4F5DC] to-[#7CECC1] text-black shadow-md border border-white">
          <Download className="mr-2 h-4 w-4" />
          Export to XLS
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4">Case Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Submitter</p>
                  <p>{caseData.submitter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assignee</p>
                  <p>{caseData.assignee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sub-category</p>
                  <p>{caseData.subCategory}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created On</p>
                  <p>{formatDate(caseData.createdOn)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <StatusBadge status={caseData.status} />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{caseData.description}</p>
              </div>
            </div>
          </Card>
          
          {caseData.notes && caseData.notes.length > 0 && (
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Notes</h3>
              <ul className="space-y-2">
                {caseData.notes.map((note, index) => (
                  <li key={index} className="text-sm border-b pb-2 last:border-0 last:pb-0">
                    {note}
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
        
        {caseData.attachments && caseData.attachments.length > 0 && (
          <div>
            <Card className="p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Attachments</h3>
              <ul className="space-y-3">
                {caseData.attachments.map((attachment, index) => (
                  <li key={index} className="text-sm border rounded-md p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size} • {attachment.type}</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">Download</Button>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 