import { jwtDecode } from "jwt-decode";

export default () => {
    const useAuthToken = () => useState("auth_token");
    const useAuthUser = () => useState("auth_user");
    const useAuthLoading = () => useState("auth_loading", () => true);

    const setToken = (newToken) => {
        const authToken = useAuthToken();
        authToken.value = newToken;
    };

    const setUser = (newUser) => {
        const authUser = useAuthUser();
        authUser.value = newUser;
    };

    const setIsAuthLoading = (value) => {
        const authLoading = useAuthLoading();
        authLoading.value = value;
    };

    const login = ({ username, password }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await useFetchApi("/api/auth/login", {
                    method: "POST",
                    body: {
                        username,
                        password,
                    },
                });
                setToken(data.access_token);
                setUser(data.user);
            } catch (error) {
                reject(error);
            }
        });
    };

    const refreshToken = () => {
        return new Promise(async (resolve, reject) => {
            // FORGOT ANOTHER WAIT BROOOOOO!!! VERY IMPORTANTTTT PLSSSSS DONT BE SUCH A NOOB!!!!!!!!!!!!!!!!!!!!!!!!!
            try {
                const data = await $fetch("/api/auth/refresh");

                setToken(data.access_token);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getUser = () => {
        return new Promise(async (resolve, reject) => {
            // token bug: first attempt solution useFetchApi
            // 2nd putting await
            try {
                const data = await useFetchApi("/api/auth/user");

                setUser(data.user);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    const reRefreshAccessToken = () => {
        const authToken = useAuthToken();

        if (!authToken.value) {
            return;
        }
        const jwt = jwtDecode(authToken.value);

        const newRefreshTime = jwt.exp - 60000;

        setTimeout(async () => {
            await refreshToken();
            reRefreshAccessToken();
        }, newRefreshTime);
    };

    // this is for initializing of authentication, accessing token to login && fething user data once logged in,
    const initAuth = () => {
        return new Promise(async (resolve, reject) => {
            setIsAuthLoading(true);
            try {
                await refreshToken();
                await getUser();
                resolve(true);

                reRefreshAccessToken();
            } catch (error) {
                reject(error);
            } finally {
                setIsAuthLoading(false);
            }
        });
    };
    return {
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
    };
};
