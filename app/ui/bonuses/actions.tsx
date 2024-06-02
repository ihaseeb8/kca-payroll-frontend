'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateBonus, addBonus, deleteBonus } from "@/app/lib/actions/bonuses"
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useFormState } from "react-dom"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { ClipboardPen, Trash } from "lucide-react";

export function EditBonus({
    id,
    name,
    amount,
    date,
    employeeId
} : {
    id: number;
    name: string;
    amount: number;
    date: Date;
    employeeId: number
}){
    const createdAt = new Date(date)
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(updateBonus, initialState);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        
        if (state.message === "Bonus updated successfully!") {
            setIsDialogOpen(false); // Close the dialog
            toast("Bonus has been updated successfully!.")
            router.refresh();
        }
    }, [state]);

    useEffect(() => {
        if (!isDialogOpen) {
            // Reset state when the dialog is closed
            state.errors = initialState.errors
            state.message = initialState.message
        }
    }, [isDialogOpen]);
    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <ClipboardPen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Bonus</DialogTitle>
                </DialogHeader>
                
                <form action={dispatch}>
                    <input hidden id='id' name='id' defaultValue={id} />
                    <input hidden id='fkEmployeeId' name='fkEmployeeId' defaultValue={employeeId} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                defaultValue={name}
                            />
                            <div id="name-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.name}>
                                {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                className="col-span-3"
                                defaultValue={amount}
                            />
                            <div id="amount-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.amount}>
                                {state.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                defaultValue={createdAt.toISOString().substring(0, 10)}
                                className="col-span-3"
                            />
                            <div id="date-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.date}>
                                {state.errors?.date &&
                                state.errors.date.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            {state?.message && (
                                <p className={"mt-4 text-md text-red-500 col-span-4 text-center"} >
                                {state.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        {/* <DialogClose> */}
                            <Button type="submit">Save Changes</Button>
                        {/* </DialogClose> */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        
    )
}

export function AddBonus({
    employeeId,
    
} : {
    employeeId: number;

}){
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState(addBonus, initialState);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        
        if (state.message === "Bonus added successfully!") {
            setIsDialogOpen(false); // Close the dialog
            toast("Bonus has been added successfully!.")
            router.refresh();
        }
    }, [state]);

    useEffect(() => {
        if (!isDialogOpen) {
            // Reset state when the dialog is closed
            state.errors = initialState.errors
            state.message = initialState.message
        }
    }, [isDialogOpen]);


    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">

                    <span className="hidden md:block">Add</span>{' '}
                    <PlusIcon className="h-5 md:ml-4" />

                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Bonus</DialogTitle>
                </DialogHeader>
                
                <form action={dispatch}>
                    <input hidden id='fkEmployeeId' name='fkEmployeeId' defaultValue={employeeId} />
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                            />
                            <div id="name-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.name}>
                                {state.errors?.name &&
                                state.errors.name.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                className="col-span-3"
                            />
                            <div id="amount-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.amount}>
                                {state.errors?.amount &&
                                state.errors.amount.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date">
                                Date
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                className="col-span-3"
                            />
                            <div id="date-error" aria-live="polite" aria-atomic="true" className="col-span-3" hidden={!state.errors?.date}>
                                {state.errors?.date &&
                                state.errors.date.map((error: string) => (
                                    <p className="text-sm text-red-500 text-center" key={error}>
                                    {error}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            {state?.message && (
                                <p className={"mt-4 text-md text-red-500 col-span-4 text-center"} >
                                {state.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        {/* <DialogClose> */}
                            <Button type="submit">Add Bonus</Button>
                        {/* </DialogClose> */}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export function DeleteBonus({
    id
}: {
    id: number
}){
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleDelete = async () =>{
        setLoading(true)
        const state = await deleteBonus(id)
        toast(state.message)
        router.refresh();
        setLoading(false)
    }

    return(
        <Button variant={'ghost'} onClick={handleDelete} disabled={loading}>
            <Trash className="text-destructive"/>
        </Button>
    )
}