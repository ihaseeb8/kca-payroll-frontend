// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


// ---------------------------------- KCA ----------------------------------------------------

export type Designation = {
  id: number
  designationName: string
  shortName: string
  description: string
  status: "active" | "inactive"
}

export type EmployeeChild = {
  id?: number
  childName: string
  childGender: "Male" | "Female"
  dateOfBirth: string
  childCnic: string
}

export type Employee = {
  id: number
  fkDesignationId: number
  name: string
  gender: "Male" | "Female"
  fatherName: string
  cnic: string
  dateOfBirth: string
  isMarried: 'Yes' | 'No'
  haveChildren: 'Yes' | 'No'
  profileImage: string
  currentAddress: string
  permanentAddress: string
  mobileNumber: string
  landlineNumber: string
  employeeChildrenDetails: EmployeeChild[]
  spouseName: string
  spouseGender: "Male" | "Female"
  spouseCnic: string
  spouseDateOfBirth: string
  emergencyContactName: string
  relationOfEmergencyContact: string
  emergencyContactNumber: string
  emailAddress: string
  bank: BankDetails
  designations: Designation
  status: "active" | "inactive"
}

export type RigLocation = {
  id: number
  locationName: string
  locationType: "Rig" | "Office"
  locationStatus: "active" | "inactive"
}

export type BankDetails = {
  id: number
  bankName: string
  accountNumber: string
  fkEmployeeId: number
  bankStatus: "active" | "inactive"
  bankUser: AccountHolder
}

export type AccountHolder = {
  id: number
  name: string
  cnic: string
}

export type Bonus = {
  id: number
  name: string
  amount: number
  date: Date
  fkEmployeeId: number
}

export type Expenses = {
  id: number
  name: string
  amount: number
  date: Date
  fkEmployeeId: number
}