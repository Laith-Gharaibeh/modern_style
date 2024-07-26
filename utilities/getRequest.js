// export const baseUrl = "http://localhost:3000/api";

// export const getRequest = async (url, moreHeaders = {}) => {
//   try {
//     console.log("[getRequest.js] url = ", url);

//     const response = await fetch(url, {
//       method: "GET", // try to use OST instead of GET, handle and add appropriate message for this type of errors in (catch block)
//       credentials: "include",
//       headers: {
//         "Content-type": "application/json",
//         ...moreHeaders,
//       },
//     });

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log("[getRequest.js] catch error = ", error);

//     return error;
//   }
// };

// ===================================================================

export const baseUrl = "http://localhost:3000/api";

export const getRequest = async (url, moreHeaders = {}) => {
  try {
    console.log("[getRequest.js] url = ", url);

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...moreHeaders,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("[getRequest.js] catch error = ", error);
    return { error: error.message };
  }
};
