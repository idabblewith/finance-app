import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
	value?: Date;
	onChange?: SelectSingleEventHandler;
	disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
	// function that runs after onChange to close the calendar
	const [open, setOpen] = React.useState(false);

	const handleSelect: SelectSingleEventHandler = (
		day,
		selected,
		activeModifiers,
		e
	) => {
		onChange?.(day, selected, activeModifiers, e);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!value && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="size-4 mr-2" />
					{value ? format(value, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Calendar
					mode="single"
					selected={value}
					onSelect={handleSelect}
					disabled={disabled}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
