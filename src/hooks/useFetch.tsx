import { useNavigate } from "react-router-dom";

function useFetch() {
  const navigate = useNavigate();

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method: string) {
    return (url: string | URL, body?: string) => {
      return fetch("https://frontend-take-home-service.fetch.com/" + url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }).then((response: any) => {
          if (!response.ok) {
            if (response.status === 401) {
              navigate("/login", { replace: true });
              return;
            }
            return Promise.reject(response);
          }
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return Promise.resolve(response.json());
          } else { 
            return response.text().then((text: string) => text);
          }
      });
    }
  }
}

export default useFetch;
