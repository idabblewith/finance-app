"use client";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

export default function Home() {
	const accountsQuery = useGetAccounts();

	return (
		<div>
			<h1>Dashboard</h1>
			{accountsQuery.isLoading ? (
				<p>Loading...</p>
			) : accountsQuery.isError ? (
				<p>Error: {accountsQuery.error.message}</p>
			) : (
				<ul>
					{accountsQuery.data?.map((account) => (
						<li key={account.id}>{account.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
