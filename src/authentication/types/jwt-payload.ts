import { CompanyRole } from "src/company_employees/enums/company-role.enum";

export type JwtPayload = {
  userId: string;
  role?: CompanyRole | null; // Add the role field
  companyId?: string | null;
}
