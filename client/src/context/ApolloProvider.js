import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	ApolloProvider,
} from "@apollo/client";
import App from "../App";

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_BASE_URL,
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);