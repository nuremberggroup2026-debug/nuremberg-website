import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { getApplicationsByCareerId } from "@/app/server/applications/services";

function formatHumanDateTime(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Amman",
    }).format(d);
  } catch {

    return d.toLocaleString();
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
   const careerId = params.get("careerId");
const res = (await getApplicationsByCareerId(careerId??""))
   

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Applications");

    sheet.columns = [
      { header: "Application ID", key: "applicationId", width: 40 },
      { header: "First Name", key: "firstName", width: 30 },
      { header: "Last Name", key: "lastName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Position Name", key: "positionName", width: 35 },
      { header: "Submitted At", key: "appliedAt", width: 25 },
      { header: "CV", key: "cv", width: 75 },
    ];

    for (const app of res.data!) {
      sheet.addRow({
        applicationId: app.id ?? "",
        firstName: app?.first_name ?? "",
        lastName: app?.last_name ?? "",
        email: app?.email ?? "",
        phone: app.phone_number ?? "",
        appliedAt: formatHumanDateTime(app.applied_at),
        positionName: app.careers?.position_en ?? "",
        cv: app?.cv ?? "",

      });
    }

    sheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    const bufferNode = Buffer.from(buffer as ArrayBuffer);

    
    const fileName = `applications-${res.data![0].careers.position_en}.xlsx`;

    return new Response(bufferNode, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err) {
    console.error("Export to Excel failed:", {
    });

    const body = {
      error: "ExportToExcelFailed",
    };
    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
