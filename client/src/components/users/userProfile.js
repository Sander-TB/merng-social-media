import PostForm from "../posts/PostForm";
import { useContext } from "react";

import { AuthContext } from "../../context/auth";

export default function UserProfile() {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div>{user && <PostForm />}</div>
		</>
	);
}
