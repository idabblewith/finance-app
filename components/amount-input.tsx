import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
	value: string;
	onChange: (value: string | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: string;
};

const MAX_VALUE = 2147483;
const MIN_VALUE = -2147483; // (PostgreSQL min -2147483648 / 1000)
const MIN_ERROR_BOUNDARY = -21474830;
const MAX_ERROR_BOUNDARY = 21474830;

export const AmountInput = ({
	value,
	onChange,
	placeholder,
	disabled,
	error: externalError,
}: Props) => {
	const parsedValue = parseFloat(value);
	const isIncome = parsedValue > 0;
	const isExpense = parsedValue < 0;

	const isOutOfRange = parsedValue > MAX_VALUE || parsedValue < MIN_VALUE;
	const error = isOutOfRange
		? `Amount must be between $${MIN_VALUE.toLocaleString()} and $${MAX_VALUE.toLocaleString()}`
		: externalError;

	const onReverseValue = () => {
		if (!value) return;

		const newValue = parseFloat(value) * -1;
		onChange(newValue.toString());
	};

	const handleValueChange = (value: string | undefined) => {
		if (!value) {
			onChange(undefined);
			return;
		}

		const numericValue = parseFloat(value.replace(/[$,]/g, ""));

		if (isNaN(numericValue)) {
			onChange(undefined);
			return;
		}

		// Only update if within range
		if (
			numericValue <= MAX_ERROR_BOUNDARY &&
			numericValue >= MIN_ERROR_BOUNDARY
		) {
			onChange(numericValue.toString());
		}
	};

	return (
		<div className="relative">
			<TooltipProvider>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<button
							type="button"
							onClick={onReverseValue}
							className={cn(
								"bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
								isIncome &&
									"bg-emerald-500 hover:bg-emerald-600",
								isExpense && "bg-rose-500 hover:bg-rose-600"
							)}
							// disabled={isOutOfRange}
						>
							{!parsedValue && (
								<Info className="size-3 text-white" />
							)}
							{isIncome && (
								<PlusCircle className="size-3 text-white" />
							)}
							{isExpense && (
								<MinusCircle className="size-3 text-white" />
							)}
						</button>
					</TooltipTrigger>
					<TooltipContent>
						Use [+] for income and [-] for expenses
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<CurrencyInput
				prefix="$"
				className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				placeholder={placeholder}
				value={value}
				decimalsLimit={2}
				decimalScale={2}
				onValueChange={handleValueChange}
				disabled={disabled}
			/>
			<div className="flex flex-col gap-1 mt-2 text-xs">
				{error ? (
					<p className="text-rose-500">{error}</p>
				) : (
					<p className="text-muted-foreground">
						{isIncome && "This will count as income"}
						{isExpense && "This will count as an expense"}
					</p>
				)}
			</div>
		</div>
	);
};
