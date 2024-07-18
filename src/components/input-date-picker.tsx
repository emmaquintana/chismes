"use client";

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { format } from 'date-fns';

function InputDatePicker({ name, required = false }: { name: string, required?: boolean }) {

    const [date, setDate] = useState<Date>();

    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Elige una fecha</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        title='Fecha de nacimiento'
                        fromDate={new Date('Jan 01 2000')}
                        toDate={new Date(Date.now())}
                        today={new Date('Jan 01 2000')}
                        className='h-[340px]'                        
                    />
                </PopoverContent>
            </Popover>
            <input type="hidden" name={name} required={required} value={date?.toISOString()?.toString()} />
        </>
    )
}

export default InputDatePicker