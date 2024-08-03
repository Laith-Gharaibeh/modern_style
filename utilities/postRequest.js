export const baseUrl = "http://localhost:3000/api";

export const postRequest = async (
  url,
  body,
  moreHeaders = {},
  credentials = "same-origin"
) => {
  try {
    const response = await fetch(url, {
      method: "POST", // try to use OST instead of POST, handle and add appropriate message for this type of errors in (catch block)
      headers: {
        // "Content-type": "application/json",
        ...moreHeaders,
      },
      body,
      credentials,
    });
    // console.log("[utilities/postRequest.js] response = ", response);

    const result = await response.json();

    // if (result.message === "sessionExpiredLoginAgain") {
    // }
    // console.log("[utilities/postRequest.js] result = ", result);

    return result;
  } catch (catchError) {
    // this catchError will happen when we failed to send the request to the API
    // this catchError on the front-end
    // return something like this "Failed to send your request!"

    console.log("[utilities/postRequest.js] catch catchError = ", catchError);

    return catchError;
  }
};
