import { Employee } from "@/app/lib/definitions";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { formattedDOB, avatarFallbackstring } from "@/app/lib/utils";

export default function EmployeeInformation({ employee }: { employee: Employee }) {

    console.log(employee);
    const endpoint = process.env.API_URL
    console.log(`${endpoint}${employee.profileImage}`);

    const dob = new Date(employee.dateOfBirth).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
    const maritalStatus = employee.isMarried === 'Yes' ? 'Married' : 'Single'
    const noOfChildren = employee?.employeeChildrenDetails?.length || 0

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-100 py-6 px-4 md:px-6 dark:bg-gray-800">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Avatar className="border-zinc-800 border-2 w-16 h-16">
                            <AvatarImage src={`${endpoint}${employee.profileImage}`} />
                            <AvatarFallback className="text-zinc-800 font-bold">{avatarFallbackstring(employee.name)}</AvatarFallback>
                        </Avatar>

                        <div>
                            <h1 className="text-xl font-bold">{employee.name}</h1>
                            <h3>ID: <span className="font-bold text-zinc-800">{employee.id}</span></h3>
                            <div className="text-zinc-900 dark:text-gray-400 text-sm">{employee.gender} , {employee.designations.designationName}</div>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 py-8 px-4 md:px-6">
                <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="cnic" className="font-bold">CNIC</Label>
                                    <p>{employee.cnic}</p>
                                </div>
                                <div>
                                    <Label htmlFor="father-name" className="font-bold">{"Father's Name"}</Label>
                                    <p>{employee.fatherName}</p>
                                </div>
                                <div>
                                    <Label htmlFor="date-of-birth" className="font-bold">DOB</Label>
                                    <p>{formattedDOB(employee.dateOfBirth)}</p>
                                </div>
                                <div>
                                    <Label htmlFor="marital-status" className="font-bold">Marital Status</Label>
                                    <p>{maritalStatus}</p>
                                </div>
                                <div>
                                    <Label htmlFor="parenthood-status" className="font-bold">Children</Label>
                                    <p>{noOfChildren}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Contact Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="mobile" className="font-bold">Mobile Number</Label>
                                    <p>{employee.mobileNumber}</p>
                                </div>
                                <div>
                                    <Label htmlFor="email" className="font-bold">Email</Label>
                                    <p>{employee.emailAddress}</p>
                                </div>

                                {employee?.landlineNumber &&
                                    <div>
                                        <Label htmlFor="landline" className="font-bold">Landline Number</Label>
                                        <p>{employee.landlineNumber}</p>
                                    </div>
                                }

                            </div>
                            <div className="grid-cols-4">
                                <Label htmlFor="address" className="font-bold">Current Address</Label>
                                <p>{employee.currentAddress}</p>
                            </div>
                            <div className="grid-cols-4">
                                <Label htmlFor="address" className="font-bold">Permanent Address</Label>
                                <p>{employee.permanentAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Emergency Contact</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="emergency-name" className="font-bold">Name</Label>
                                    <p>{employee.emergencyContactName}</p>
                                </div>
                                <div>
                                    <Label htmlFor="emergency-relationship" className="font-bold">Relationship</Label>
                                    <p>{employee.relationOfEmergencyContact}</p>
                                </div>
                                <div>
                                    <Label htmlFor="emergency-phone" className="font-bold">Phone Number</Label>
                                    <p>{employee.emergencyContactNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Family Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {employee?.isMarried === 'Yes' &&
                                    <>
                                        <div>
                                            <Label htmlFor="spouse-name" className="font-bold">Spouse Name</Label>
                                            <p>{employee.spouseName}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="spouse-gender" className="font-bold">Spouse Gender</Label>
                                            <p>{employee.spouseGender}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="spouse-dateOfBirth" className="font-bold">Spouse Date Of Birth</Label>
                                            <p>{formattedDOB(employee.spouseDateOfBirth)}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="spouse-cnic" className="font-bold">Spouse CNIC</Label>
                                            <p>{employee.spouseCnic}</p>
                                        </div>
                                    </>
                                }

                                {noOfChildren > 0 &&
                                    employee.employeeChildrenDetails.map((child, index) => {
                                        return (
                                            <>
                                                <div>
                                                    <Label htmlFor="child-name-1" className="font-bold">Child {index + 1} Name</Label>
                                                    <p>{child.childName}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="child-gender-1" className="font-bold">Child {index + 1} Gender</Label>
                                                    <p>{child.childGender}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="child-dob-1" className="font-bold">Child {index + 1} Date of Birth</Label>
                                                    <p>{formattedDOB(child.dateOfBirth)}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="child-cnic-1" className="font-bold">Child {index + 1} B-FORM/CNIC</Label>
                                                    <p>{child.childCnic}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Bank Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {employee.bank ? (
                                    <>
                                        <div>
                                            <Label htmlFor="bank-name" className="font-bold">Bank Name</Label>
                                            <p>{employee.bank.bankName}</p>
                                        </div>
                                        <div>
                                            <Label htmlFor="bank-accountNumber" className="font-bold">IBAN</Label>
                                            <p>{employee.bank.accountNumber}</p>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}