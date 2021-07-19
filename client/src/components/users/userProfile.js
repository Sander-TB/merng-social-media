import PostForm from "../posts/PostForm";
import { useContext } from "react";
import Container from "@material-ui/core/Container";

import { AuthContext } from "../../context/auth";

export default function UserProfile() {
	const { user } = useContext(AuthContext);

	return <Container maxWidth='xs'>{user && <PostForm />}</Container>;
}
