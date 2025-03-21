"use client";

import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Download, Eye, ChevronDown } from "lucide-react";

// Status badge component
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

// Define sample dummy data for cases
const dummyCases = [
  {
    id: "B456",
    title: "Sales Strategy Overview",
    submitter: "Nguyễn Thị Mai",
    subCategory: "Competitor information",
    assignee: "N/A",
    createdOn: "2025-02-11T08:45:00",
    status: "New"
  },
  {
    id: "C789",
    title: "Market Approach Overview",
    submitter: "Trần Văn Hưng",
    subCategory: "Competitor information",
    assignee: "Trần Văn Hưng",
    createdOn: "2025-02-10T14:20:00",
    status: "In Progress"
  },
  {
    id: "D012",
    title: "Sales Tactics Overview",
    submitter: "Lê Thị Bích",
    subCategory: "Competitor Promotion",
    assignee: "Phạm Minh Tuấn",
    createdOn: "2025-02-09T16:30:00",
    status: "In Review"
  },
  {
    id: "E345",
    title: "Field Report Overview",
    submitter: "Phạm Minh Tuấn",
    subCategory: "Competitor information",
    assignee: "Phạm Minh Tuấn",
    createdOn: "2025-02-08T11:00:00",
    status: "Completed"
  },
  {
    id: "F678",
    title: "Sales Journey Overview",
    submitter: "Đặng Thị Lan",
    subCategory: "Competitor information",
    assignee: "Đặng Thị Lan",
    createdOn: "2025-02-07T13:15:00",
    status: "Completed"
  },
  {
    id: "G901",
    title: "Sales Performance Overview",
    submitter: "Ngô Văn Hải",
    subCategory: "Competitor Promotion",
    assignee: "Ngô Văn Hải",
    createdOn: "2025-02-06T09:00:00",
    status: "No Action"
  },
  {
    id: "H234",
    title: "Market Analysis Overview",
    submitter: "Vũ Thị Hương",
    subCategory: "Competitor information",
    assignee: "Vũ Thị Hương",
    createdOn: "2025-02-05T15:45:00",
    status: "Closed"
  },
  {
    id: "I567",
    title: "Sales Review Overview",
    submitter: "Ngô Văn Hải",
    subCategory: "Competitor Promotion",
    assignee: "Ngô Văn Hải",
    createdOn: "2025-02-04T10:30:00",
    status: "Closed"
  },
  {
    id: "J890",
    title: "Sales Insights Overview",
    submitter: "Vũ Thị Hương",
    subCategory: "Competitor Promotion",
    assignee: "Vũ Thị Hương",
    createdOn: "2025-02-03T12:00:00",
    status: "Closed"
  }
];

export default function CasesPage() {
  const [, setActiveTab] = useState("all");
  const [dateRange] = useState("14/10/2023 - 31/10/2023");
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "HH:mm - dd/MM/yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cases list</h2>
          <p className="text-muted-foreground">
            List of all the cases submitted
          </p>
        </div>
        <Button className="bg-gradient-to-b from-[#B4F5DC] to-[#7CECC1] text-black shadow-md border border-white">
          <Download className="mr-2 h-4 w-4" />
          Export to XLS
        </Button>
      </div>
      
      <Card className="p-6 shadow-md">
        <div className="flex flex-col gap-5">
          {/* Filter tabs */}
          <div className="flex gap-4">
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all" className="flex gap-2">
                  All
                </TabsTrigger>
                <TabsTrigger value="opportunity" className="flex gap-2">
                  <div className="h-3 w-3 rounded-md bg-green-600"></div>
                  Opportunity
                </TabsTrigger>
                <TabsTrigger value="issue" className="flex gap-2">
                  <div className="h-3 w-3 rounded-md bg-gray-500"></div>
                  Issue
                </TabsTrigger>
                <TabsTrigger value="insight" className="flex gap-2">
                  <div className="h-3 w-3 rounded-md bg-gray-500"></div>
                  Insight
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Date range picker (simplified) */}
            <div className="flex items-center border border-gray-200 rounded-md px-3 py-2">
              <span className="text-sm">{dateRange}</span>
            </div>
          </div>
          
          {/* Table */}
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-white">
                  <tr className="border-b transition-colors">
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        ID
                        <div className="relative cursor-pointer p-1 border border-gray-300 rounded text-xs bg-white">
                          Filter
                        </div>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        Title
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2">
                        Submitter
                        <div className="relative cursor-pointer p-1 border border-gray-300 rounded text-xs bg-white">
                          Filter
                        </div>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2 justify-between">
                        <div>Sub-category</div>
                        <div className="relative cursor-pointer p-1 border border-gray-300 rounded text-xs bg-white flex items-center gap-1">
                          Filter
                          <ChevronDown className="h-3 w-3" />
                        </div>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      Assignee
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2 justify-between">
                        <div>Created On</div>
                        <div className="relative cursor-pointer p-1 border border-gray-300 rounded text-xs bg-white">
                          Filter a date
                        </div>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                      <div className="flex items-center gap-2 justify-between">
                        <div>Status</div>
                        <div className="relative cursor-pointer p-1 border border-gray-300 rounded text-xs bg-white flex items-center gap-1">
                          Filter
                          <ChevronDown className="h-3 w-3" />
                        </div>
                      </div>
                    </th>
                    <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {dummyCases.map((caseItem, index) => (
                    <tr 
                      key={caseItem.id} 
                      className={`border-b transition-colors hover:bg-muted/50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="p-4 align-middle font-medium">{caseItem.id}</td>
                      <td className="p-4 align-middle">{caseItem.title}</td>
                      <td className="p-4 align-middle">{caseItem.submitter}</td>
                      <td className="p-4 align-middle">{caseItem.subCategory}</td>
                      <td className="p-4 align-middle">{caseItem.assignee}</td>
                      <td className="p-4 align-middle">{formatDate(caseItem.createdOn)}</td>
                      <td className="p-4 align-middle">
                        <StatusBadge status={caseItem.status} />
                      </td>
                      <td className="p-4 align-middle text-center">
                        <Button variant="outline" size="sm" className="border-green-600 text-green-600 flex gap-1 items-center" asChild>
                          <Link href={`/dashboard/cases/${caseItem.id}`}>
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 