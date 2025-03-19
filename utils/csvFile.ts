export function downloadCSV(data: any[], balance: number) {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
  
    // Define CSV Headers
    const headers = ["Date", "Income", "Expense"];
  
    // Convert data to CSV format
    const csvRows = data.map(({ date, income, expense }) => 
      `${date},${income},${expense}`
    );
  
    // Add balance at the end of CSV
    csvRows.push(`Total Balance,${balance},`);
  
    // Join rows and add headers
    const csvContent = [headers.join(","), ...csvRows].join("\n");
  
    // Create a Blob (CSV File)
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
  
    // Create a download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "financial_report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  