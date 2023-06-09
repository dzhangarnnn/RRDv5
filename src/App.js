import React from "react";
import { Link, Redirect, Route, Switch, useParams } from "react-router-dom";

function HomePage() {
	return (
		<>
			<h1>Main Page</h1>
			<Link to="/users">Users List Page</Link>
		</>
	);
}

function Users() {
	const { userId, profileEdit } = useParams();
	return (
		<>
			{userId ? (
				profileEdit ? (
					profileEdit === "profile" ? (
						<UserPage />
					) : profileEdit === "edit" ? (
						<EditUserPage userId={userId} />
					) : (
						<Redirect to={`/users/${userId}/profile`} />
					)
				) : (
					<Redirect to={`/users/${userId}/profile`} />
				)
			) : (
				<UsersListPage userId={userId} />
			)}
		</>
	);
}

function UsersListPage() {
	const pagesIds = [0, 1, 2, 3, 4, 5];
	return (
		<>
			<Link to="/">Main Page</Link>
			<ul>
				{pagesIds.map((id) => (
					<li key={id}>
						<Link to={`/users/${id}/profile`}>User Page {id}</Link>
					</li>
				))}
			</ul>
		</>
	);
}

function EditUserPage({ userId }) {
	return (
		<>
			<div>
				<Link to={`/users/${userId}`}>User Page {userId}</Link>
			</div>
			<div>
				<Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
			</div>
			<div>
				<Link to="/users">Users List Page</Link>
			</div>
		</>
	);
}

function UserPage() {
	const { userId } = useParams();
	return (
		<>
			<div>
				<Link to={`/users/${userId}/edit`}> Edit User Page</Link>
			</div>
			<div>
				<Link to="/users">Users List Page</Link>
			</div>

			<p>User id: {userId}</p>
		</>
	);
}

function App() {
	return (
		<div>
			<Switch>
				<Route path="/users/:userId?/:profileEdit?" component={Users} />
				<Route path="/" exact component={HomePage} />
				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default App;
